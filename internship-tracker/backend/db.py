import os
import sqlite3
import json
from datetime import datetime

# Calculate absolute path to database.sqlite at the root of internship-tracker folder
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, 'database.sqlite')

def get_db_connection():
    """Establishes and returns a connection to the SQLite database with dictionary-like row factory."""
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initializes the database by creating the internships table if it does not exist."""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS internships (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            job_id TEXT UNIQUE NOT NULL,
            company TEXT NOT NULL,
            role TEXT NOT NULL,
            stipend_amount INTEGER,
            stipend_type TEXT CHECK(stipend_type IN ('paid', 'unpaid', 'unspecified')) NOT NULL DEFAULT 'unspecified',
            work_mode TEXT CHECK(work_mode IN ('remote', 'hybrid', 'in-office')) NOT NULL DEFAULT 'in-office',
            location TEXT,
            duration TEXT,
            skills TEXT, -- Stored as a JSON array string
            deadline TEXT,
            apply_link TEXT NOT NULL,
            source_platform TEXT NOT NULL,
            scraped_at TEXT NOT NULL,
            is_active INTEGER NOT NULL DEFAULT 1
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS feedback (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT NOT NULL,
            rating INTEGER CHECK(rating >= 1 AND rating <= 5),
            comment TEXT,
            created_at TEXT NOT NULL
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS clicks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_type TEXT NOT NULL,
            details TEXT,
            clicked_at TEXT NOT NULL
        )
    ''')
    
    # Create indices to speed up common queries (filtering & sorting)
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_job_id ON internships(job_id)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_work_mode ON internships(work_mode)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_stipend_type ON internships(stipend_type)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_clicks_event ON clicks(event_type)')
    
    conn.commit()
    conn.close()
    print(f"Database initialized successfully at: {DB_PATH}")

def insert_internship(conn, internship_data):
    """
    Inserts a single internship dictionary into the database.
    Handles serialization of the 'skills' field to JSON.
    Returns True if successful, False if it was a duplicate or failed.
    """
    cursor = conn.cursor()
    
    # Extract and serialize skills list to JSON string
    skills = internship_data.get('skills', [])
    if isinstance(skills, list):
        skills_str = json.dumps(skills)
    else:
        skills_str = json.dumps([])

    try:
        cursor.execute('''
            INSERT INTO internships (
                job_id, company, role, stipend_amount, stipend_type, 
                work_mode, location, duration, skills, deadline, 
                apply_link, source_platform, scraped_at, is_active
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            internship_data['job_id'],
            internship_data['company'],
            internship_data['role'],
            internship_data.get('stipend_amount'),
            internship_data.get('stipend_type', 'unspecified'),
            internship_data.get('work_mode', 'in-office'),
            internship_data.get('location'),
            internship_data.get('duration'),
            skills_str,
            internship_data.get('deadline'),
            internship_data['apply_link'],
            internship_data['source_platform'],
            internship_data.get('scraped_at', datetime.now().isoformat()),
            1 if internship_data.get('is_active', True) else 0
        ))
        conn.commit()
        return True
    except sqlite3.IntegrityError as e:
        # IntegrityError is raised on unique constraint violation (e.g. duplicate job_id)
        print(f"Skipping duplicate job_id: {internship_data['job_id']}")
        return False
    except Exception as e:
        print(f"Error inserting internship: {e}")
        return False

def get_all_internships(filters=None, sort_by=None):
    """
    Retrieves internships applying specified filters and sorting.
    filters: dict with optional keys 'stipend_type', 'work_mode', 'skills'
    sort_by: string, one of 'latest', 'highest_stipend', 'deadline_soon'
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    
    query = "SELECT * FROM internships WHERE is_active = 1"
    params = []
    
    if filters:
        if 'stipend_type' in filters and filters['stipend_type']:
            query += " AND stipend_type = ?"
            params.append(filters['stipend_type'])
            
        if 'work_mode' in filters and filters['work_mode']:
            query += " AND work_mode = ?"
            params.append(filters['work_mode'])
            
        if 'skills' in filters and filters['skills']:
            # Search skills array using LIKE
            query += " AND skills LIKE ?"
            params.append(f"%{filters['skills']}%")
            
    # Apply sorting
    if sort_by == 'highest_stipend':
        query += " ORDER BY stipend_amount DESC, scraped_at DESC"
    elif sort_by == 'deadline_soon':
        # Put NULL deadlines or empty deadlines at the end
        query += " ORDER BY CASE WHEN deadline IS NULL OR deadline = '' THEN 1 ELSE 0 END, deadline ASC, scraped_at DESC"
    else:  # Default 'latest'
        query += " ORDER BY scraped_at DESC"
        
    cursor.execute(query, params)
    rows = cursor.fetchall()
    
    internships = []
    for row in rows:
        item = dict(row)
        # Deserialize skills
        try:
            item['skills'] = json.loads(item['skills']) if item['skills'] else []
        except Exception:
            item['skills'] = []
        internships.append(item)
        
    conn.close()
    return internships

def insert_feedback(feedback_data):
    """
    Inserts a user feedback dictionary into the database.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('''
            INSERT INTO feedback (name, email, rating, comment, created_at)
            VALUES (?, ?, ?, ?, ?)
        ''', (
            feedback_data.get('name'),
            feedback_data.get('email'),
            feedback_data.get('rating'),
            feedback_data.get('comment'),
            datetime.now().isoformat()
        ))
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(f"Error inserting feedback: {e}")
        conn.close()
        return False

def insert_click(event_type, details=None):
    """
    Inserts a click tracking record into the database.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('''
            INSERT INTO clicks (event_type, details, clicked_at)
            VALUES (?, ?, ?)
        ''', (
            event_type,
            details,
            datetime.now().isoformat()
        ))
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(f"Error inserting click: {e}")
        conn.close()
        return False

def get_analytics_summary():
    """
    Returns counts of feedbacks and clicks.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('SELECT COUNT(*) FROM clicks')
        clicks_count = cursor.fetchone()[0]
        
        cursor.execute('SELECT COUNT(*) FROM feedback')
        feedback_count = cursor.fetchone()[0]
        
        # Get count of clicks by type for detail
        cursor.execute('SELECT event_type, COUNT(*) as cnt FROM clicks GROUP BY event_type')
        breakdown = {row['event_type']: row['cnt'] for row in cursor.fetchall()}
        
        conn.close()
        return {
            "total_clicks": clicks_count,
            "total_feedback": feedback_count,
            "breakdown": breakdown
        }
    except Exception as e:
        print(f"Error getting analytics summary: {e}")
        conn.close()
        return {"total_clicks": 0, "total_feedback": 0, "breakdown": {}}

if __name__ == '__main__':
    # When run directly, initialize database for testing
    init_db()
