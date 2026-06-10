import os
import sys
import json
from datetime import datetime

# Setup paths to import from internship-tracker
SCRATCH_DIR = os.path.dirname(os.path.abspath(__file__))
WORKSPACE_DIR = os.path.dirname(SCRATCH_DIR)
TRACKER_DIR = os.path.join(WORKSPACE_DIR, 'internship-tracker')

sys.path.append(TRACKER_DIR)

from backend.db import get_db_connection, insert_internship

def insert_custom_jobs():
    jobs = [
        {
            "job_id": "thoughtworks_se_2026",
            "company": "Thoughtworks",
            "role": "Software Engineer",
            "stipend_amount": 150000, # Upto 18 LPA full time
            "stipend_type": "paid",
            "work_mode": "in-office",
            "location": "Bengaluru / Hyderabad / Pune / Gurugram",
            "duration": "Full-time Graduate",
            "skills": ["C", "C++", "Java", "Python", "Coding"],
            "deadline": "2026-06-16", # Referral window opens June 15
            "apply_link": "https://www.thoughtworks.com/en-in/careers",
            "source_platform": "Referral",
            "scraped_at": datetime.now().isoformat(),
            "is_active": True
        },
        {
            "job_id": "eightfold_se_intern_2026",
            "company": "Eightfold AI",
            "role": "Software Engineering Intern",
            "stipend_amount": 80000,
            "stipend_type": "paid",
            "work_mode": "hybrid",
            "location": "Bangalore / PAN India",
            "duration": "6 Months",
            "skills": ["Python", "SQL", "TensorFlow", "React", "Docker", "AWS", "DSA", "Problem Solving"],
            "deadline": "2026-06-30",
            "apply_link": "https://eightfold.ai/careers/", # Candidates can search for Job ID: 68761445130
            "source_platform": "Referral",
            "scraped_at": datetime.now().isoformat(),
            "is_active": True
        },
        {
            "job_id": "animall_pm_intern_2026",
            "company": "Animall",
            "role": "Product Management Intern",
            "stipend_amount": 27500,
            "stipend_type": "paid",
            "work_mode": "in-office",
            "location": "Gurugram",
            "duration": "6 Months",
            "skills": ["Product Management", "Problem Solving", "Communication", "Analytics"],
            "deadline": "2026-06-30",
            "apply_link": "mailto:neha.rawat@animall.in?subject=Application%20for%20Product%20Management%20Intern",
            "source_platform": "Referral",
            "scraped_at": datetime.now().isoformat(),
            "is_active": True
        },
        {
            "job_id": "pletratech_salesforce_2026",
            "company": "PletraTech",
            "role": "Associate Salesforce Developer",
            "stipend_amount": 37500,
            "stipend_type": "paid",
            "work_mode": "in-office",
            "location": "PAN India / Pune",
            "duration": "Full-time",
            "skills": ["Salesforce", "Apex", "LWC", "Configuration", "Mobile App Development", "Web Development"],
            "deadline": "2026-06-30",
            "apply_link": "https://www.pletratech.com/careers/",
            "source_platform": "Referral",
            "scraped_at": datetime.now().isoformat(),
            "is_active": True
        },
        {
            "job_id": "digitalyz_fullstack_2025",
            "company": "Digitalyz",
            "role": "Software Developer (Full Stack)",
            "stipend_amount": 160000, # Upto 20 LPA
            "stipend_type": "paid",
            "work_mode": "remote",
            "location": "Remote",
            "duration": "Full-time",
            "skills": ["Next.js", "Node.js", "Express", "Fastify", "Python", "Mathematics", "Algorithms"],
            "deadline": "2026-06-30",
            "apply_link": "https://digitalyz.in",
            "source_platform": "Referral",
            "scraped_at": datetime.now().isoformat(),
            "is_active": True
        },
        {
            "job_id": "global_payments_data_intern_2026",
            "company": "Global Payments Inc.",
            "role": "Software Intern (Data Engineering)",
            "stipend_amount": 30000,
            "stipend_type": "paid",
            "work_mode": "in-office",
            "location": "Pune",
            "duration": "6 Months",
            "skills": ["SQL", "Python", "Database", "Data Warehousing", "Git", "AWS", "Airflow", "Spark", "Kafka"],
            "deadline": "2026-06-30",
            "apply_link": "https://jobs.globalpayments.com/",
            "source_platform": "Referral",
            "scraped_at": datetime.now().isoformat(),
            "is_active": True
        },
        {
            "job_id": "grexa_ai_qa_intern_2026",
            "company": "Grexa AI",
            "role": "QA Intern",
            "stipend_amount": 25000,
            "stipend_type": "paid",
            "work_mode": "in-office",
            "location": "Navi Mumbai",
            "duration": "6 Months",
            "skills": ["Manual Testing", "SDLC", "STLC", "API Testing", "Postman", "Bug Tracking", "JIRA", "Trello", "Selenium", "SQL", "Python", "Java", "JavaScript"],
            "deadline": "2026-06-30",
            "apply_link": "https://grexa.ai/careers",
            "source_platform": "Referral",
            "scraped_at": datetime.now().isoformat(),
            "is_active": True
        }
    ]

    conn = get_db_connection()
    inserted_count = 0
    for job in jobs:
        print(f"Inserting {job['role']} at {job['company']}...")
        success = insert_internship(conn, job)
        if success:
            inserted_count += 1
            print("Successfully inserted.")
        else:
            print("Failed (possibly already exists).")
    conn.close()
    print(f"Total inserted: {inserted_count} out of {len(jobs)} jobs.")

if __name__ == '__main__':
    insert_custom_jobs()
