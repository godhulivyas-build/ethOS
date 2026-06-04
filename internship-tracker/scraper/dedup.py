import os
import sys

# Ensure backend directory is in the path to import db
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from backend.db import get_db_connection

def is_duplicate(job_id):
    """
    Checks if a job_id already exists in the database.
    Returns True if it exists, False otherwise.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT 1 FROM internships WHERE job_id = ?", (job_id,))
    exists = cursor.fetchone() is not None
    conn.close()
    return exists
