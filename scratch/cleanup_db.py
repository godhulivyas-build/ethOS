import sqlite3
import os
from datetime import datetime

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ETHOS_DB_PATH = os.path.join(ROOT_DIR, 'ethos.db')
TRACKER_DB_PATH = os.path.join(ROOT_DIR, 'internship-tracker', 'database.sqlite')

current_date_str = datetime.now().strftime("%Y-%m-%d")
print(f"Current Date for expiration checks: {current_date_str}")

# 1. Clean tracker DB
if os.path.exists(TRACKER_DB_PATH):
    print(f"Cleaning Tracker DB at: {TRACKER_DB_PATH}")
    conn = sqlite3.connect(TRACKER_DB_PATH)
    cursor = conn.cursor()
    
    # Delete inactive
    cursor.execute("DELETE FROM internships WHERE is_active = 0")
    print(f"  Deleted inactive listings: {cursor.rowcount}")
    
    # Delete expired
    cursor.execute("DELETE FROM internships WHERE deadline IS NOT NULL AND deadline != '' AND deadline < ?", (current_date_str,))
    print(f"  Deleted expired listings (deadline < {current_date_str}): {cursor.rowcount}")
    
    conn.commit()
    conn.close()
else:
    print("Tracker DB not found.")

# 2. Clean EthOS DB
if os.path.exists(ETHOS_DB_PATH):
    print(f"Cleaning EthOS DB at: {ETHOS_DB_PATH}")
    conn = sqlite3.connect(ETHOS_DB_PATH)
    cursor = conn.cursor()
    
    # Delete inactive
    cursor.execute("DELETE FROM internship_jobs WHERE is_active = 0")
    print(f"  Deleted inactive listings: {cursor.rowcount}")
    
    # Note: EthOS DB does not have a structured deadline field, but it has posted_date.
    # If we want to clean up jobs older than 30 days, we can do it here.
    # Since all jobs are fresh (from June 5/6), we won't delete active fresh ones.
    
    conn.commit()
    conn.close()
else:
    print("EthOS DB not found.")
