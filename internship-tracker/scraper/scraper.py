import os
import sys

# Ensure proper paths to import from other components
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PARENT_DIR = os.path.dirname(CURRENT_DIR)
sys.path.append(PARENT_DIR)
sys.path.append(os.path.join(CURRENT_DIR, 'sources'))

from backend.db import get_db_connection, insert_internship
from sources.internshala import scrape_internshala, fetch_deadline
from sources.linkedin import scrape_linkedin
from sources.unstop import scrape_unstop
from sources.wellfound import scrape_wellfound
from dedup import is_duplicate
from scorer import calculate_score

def run_aggregator():
    """
    Main aggregator process:
    1. Scrapes raw listings from all source platforms (LinkedIn, Unstop, Wellfound, Internshala).
    2. Filters out listings that already exist in SQLite.
    3. Scores the fresh listings using ranking algorithm.
    4. Picks the top 15 listings.
    5. Resolves details on-demand (such as scraping Internshala detail deadlines).
    6. Stores the top 15 listings into the database.
    """
    print("=" * 60)
    print("Starting Daily Internship Aggregator Run")
    print("=" * 60)
    
    # 1. Fetch listings from all platforms
    print("[1/6] Scraping Internshala (listing page only)...")
    internshala_jobs = scrape_internshala(limit=30, fetch_deadlines=False)
    print(f"      Scraped {len(internshala_jobs)} listings from Internshala.")
    
    print("[2/6] Scraping LinkedIn Jobs...")
    linkedin_jobs = scrape_linkedin(limit=15)
    print(f"      Scraped {len(linkedin_jobs)} listings from LinkedIn.")
    
    # Disable Unstop and Wellfound mock/404 scrapers as requested to ensure all links are functional
    unstop_jobs = []
    wellfound_jobs = []
    
    all_candidates = internshala_jobs + linkedin_jobs
    print(f"      Total candidates gathered: {len(all_candidates)}")
    
    # Filter candidates by target roles (Tech, Founders Office, Product)
    target_keywords = ["software", "developer", "engineer", "dev", "frontend", "backend", "full stack", "fullstack", "ai", "ml", "machine learning", "data", "analyst", "product", "pm", "founder", "web"]
    filtered_by_role = []
    for job in all_candidates:
        role_lower = job['role'].lower()
        if any(kw in role_lower for kw in target_keywords):
            filtered_by_role.append(job)
        else:
            print(f"      Skipping non-target listing: {job['role']} at {job['company']}")
            
    print(f"      Filtered by target roles: {len(filtered_by_role)} of {len(all_candidates)} candidates retained.")
    all_candidates = filtered_by_role
    
    # 2. Filter out duplicates
    fresh_candidates = []
    for job in all_candidates:
        if is_duplicate(job['job_id']):
            continue
        fresh_candidates.append(job)
        
    print(f"[5/6] Deduplication check: {len(fresh_candidates)} fresh listings remaining.")
    
    if not fresh_candidates:
        print("No new unique listings to process today. System is up-to-date.")
        print("=" * 60)
        return
        
    # 3. Score fresh listings
    scored_candidates = []
    for job in fresh_candidates:
        score = calculate_score(job)
        job['score'] = score
        scored_candidates.append(job)
        
    # 4. Sort and select top 15 active jobs
    scored_candidates.sort(key=lambda x: x['score'], reverse=True)
    
    selected_jobs = []
    print("[6/6] Selecting top active listings for database inclusion...")
    from verification import verify_link
    
    for job in scored_candidates:
        if len(selected_jobs) >= 15:
            break
            
        print(f"      Verifying: {job['role']} at {job['company']} ({job['apply_link']})...")
        is_active, reason = verify_link(job['apply_link'])
        if is_active:
            selected_jobs.append(job)
            print("      -> Active! Added.")
        else:
            print(f"      -> CLOSED/INVALID ({reason}). Skipping.")
            
    print(f"      Selected top {len(selected_jobs)} active listings.")
    
    # 5. Connect to database and insert top listings, fetching deadlines on-demand
    conn = get_db_connection()
    inserted_count = 0
    
    for idx, job in enumerate(selected_jobs, 1):
        print(f"  #{idx:02d} [{job['source_platform']}] {job['role']} @ {job['company']} (Score: {job['score']})")
        
        # On-demand deadline scrape for Internshala
        if job['source_platform'] == 'Internshala' and not job.get('deadline'):
            print(f"       -> Fetching deadline from detail page...")
            job['deadline'] = fetch_deadline(job['apply_link'])
            print(f"       -> Deadline found: {job['deadline']}")
            
        # Clean temporary helper keys before database storage
        clean_job = job.copy()
        clean_job.pop('score', None)
        clean_job.pop('posted_label', None)
        
        # Save to SQLite
        success = insert_internship(conn, clean_job)
        if success:
            inserted_count += 1
            
    conn.close()
    print("=" * 60)
    print(f"Aggregator run complete. Successfully inserted {inserted_count} new listings.")
    print("=" * 60)
    
    # Run a verify run of the live database
    verify_live_database()

def verify_live_database():
    """
    Checks all currently active internships in the database.
    If their application links are closed, marks them as inactive (is_active = 0).
    """
    print("=" * 60)
    print("Verifying Live Database Internships")
    print("=" * 60)
    
    from verification import verify_link
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Fetch all active internships
    cursor.execute("SELECT id, company, role, apply_link FROM internships WHERE is_active = 1")
    active_jobs = cursor.fetchall()
    print(f"Found {len(active_jobs)} active internships in database to verify.")
    
    deactivated_count = 0
    for job in active_jobs:
        job_id, company, role, apply_link = job
        print(f"  Verifying live listing: {role} @ {company}...")
        is_active, reason = verify_link(apply_link)
        if not is_active:
            print(f"  -> CLOSED ({reason}). Deactivating in database.")
            cursor.execute("UPDATE internships SET is_active = 0 WHERE id = ?", (job_id,))
            deactivated_count += 1
        else:
            print("  -> Active.")
            
    if deactivated_count > 0:
        conn.commit()
        print(f"Deactivated {deactivated_count} closed internships.")
    else:
        print("All live internships are still active.")
    conn.close()
    print("=" * 60)

if __name__ == '__main__':
    run_aggregator()
