import os
import sqlite3
import json
import uuid
from datetime import datetime

# Database paths
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
ETHOS_DB_PATH = os.path.join(ROOT_DIR, 'ethos.db')
TRACKER_DB_PATH = os.path.join(ROOT_DIR, 'internship-tracker', 'database.sqlite')

# The 60 companies data
COMPANIES = [
    {"name": "Aknamed", "linkedin": "https://www.linkedin.com/company/aknamed/", "website": "https://www.aknamed.com/careers", "sector": "Healthcare", "address": "Bengaluru, Karnataka, India"},
    {"name": "BharatAgri", "linkedin": "https://www.linkedin.com/company/bharatagri/", "website": "https://krushidukan.bharatagri.com/", "sector": "AgriTech", "address": "Pune, Maharashtra, India"},
    {"name": "BimaPay", "linkedin": "https://www.linkedin.com/company/bimapay/", "website": "https://bimapay.in/", "sector": "InsurTech", "address": "Bengaluru, Karnataka, India"},
    {"name": "Bimaplan", "linkedin": "https://www.linkedin.com/company/bimaplan/", "website": "https://bimaplan.co/careers/", "sector": "InsurTech", "address": "Bengaluru, Karnataka, India"},
    {"name": "CashBook", "linkedin": "https://www.linkedin.com/company/cashbookapp/", "website": "https://cashbook.in/", "sector": "Fintech", "address": "Bengaluru, Karnataka, India"},
    {"name": "Cashfree Payments", "linkedin": "https://www.linkedin.com/company/cashfree/", "website": "https://www.cashfree.com/careers", "sector": "Fintech", "address": "Bengaluru, Karnataka, India"},
    {"name": "CheqUPI", "linkedin": "https://www.linkedin.com/company/cheq-it/", "website": "https://www.chequpi.com/", "sector": "Fintech", "address": "Bengaluru, Karnataka, India"},
    {"name": "CityMall", "linkedin": "https://www.linkedin.com/company/citymall/", "website": "https://citymall.live/", "sector": "E-commerce", "address": "Gurugram, Haryana, India"},
    {"name": "Clear", "linkedin": "https://www.linkedin.com/company/cleartax/", "website": "https://cleartax.in/s/careers", "sector": "Fintech", "address": "No. 20, 1st Floor, 80 Feet Rd, 4th Block, Koramangala, Bengaluru, Karnataka 560034, India"},
    {"name": "CloudEagle", "linkedin": "https://www.linkedin.com/company/cloudeagle/", "website": "https://cloudeagle.ai/careers/", "sector": "SaaS", "address": "Bengaluru, Karnataka, India"},
    {"name": "CodeAnt AI", "linkedin": "https://www.linkedin.com/company/codeant-ai/", "website": "https://www.codeant.ai/", "sector": "AI/ML", "address": "Bengaluru, Karnataka, India"},
    {"name": "Codeparrot", "linkedin": "https://www.linkedin.com/company/codeparrotai/", "website": "https://codeparrot.ai/", "sector": "Developer Tools", "address": "Bengaluru, Karnataka, India"},
    {"name": "Credgenics", "linkedin": "https://www.linkedin.com/company/credgenics/", "website": "https://www.linkedin.com/jobs/search/?currentJobId", "sector": "Fintech", "address": "Noida, Uttar Pradesh, India"},
    {"name": "Doctor Droid", "linkedin": "https://www.linkedin.com/company/dr-droid", "website": "https://www.ycombinator.com/companies/drdroid/jobs", "sector": "Developer Tools", "address": "Bengaluru, Karnataka, India"},
    {"name": "Drip Capital", "linkedin": "https://www.linkedin.com/company/dripcapital", "website": "https://www.dripcapital.com/careers", "sector": "Fintech", "address": "4th Floor, B Wing, The Capital, Bandra Kurla Complex, Mumbai, Maharashtra 400051, India"},
    {"name": "Eduvanz", "linkedin": "https://www.linkedin.com/company/eduvanz/", "website": "https://eduvanz.com/career", "sector": "Fintech", "address": "Mumbai, Maharashtra, India"},
    {"name": "FamPay", "linkedin": "https://www.linkedin.com/company/fampay/", "website": "https://fampay.in/careers", "sector": "Fintech", "address": "2nd Floor, No. 18, 1st Main Rd, Koramangala 8th Block, Bengaluru, Karnataka 560095, India"},
    {"name": "Fello", "linkedin": "https://www.linkedin.com/company/fello/", "website": "https://fello.in/careers/", "sector": "Fintech", "address": "Bengaluru, Karnataka, India"},
    {"name": "Fifthtry", "linkedin": "https://www.linkedin.com/company/fifthtry/", "website": "https://www.fifthtry.com/", "sector": "Developer Tools", "address": "Bengaluru, Karnataka, India"},
    {"name": "FloWorks", "linkedin": "https://www.linkedin.com/company/floworkssolutions/", "website": "https://www.floworks.ai/", "sector": "AI/ML", "address": "Bengaluru, Karnataka, India"},
    {"name": "GoBillion", "linkedin": "https://www.linkedin.com/company/gobillion/", "website": "https://www.gobillion.co/", "sector": "E-commerce", "address": "Bengaluru, Karnataka, India"},
    {"name": "GroMo", "linkedin": "https://www.linkedin.com/company/gromofintech/", "website": "https://gromo.in/careers", "sector": "Fintech", "address": "Gurugram, Haryana, India"},
    {"name": "Gushwork", "linkedin": "https://www.linkedin.com/company/gushwork/", "website": "https://www.gushwork.ai/careers", "sector": "AI/ML", "address": "Bengaluru, Karnataka, India"},
    {"name": "Innovaccer", "linkedin": "https://www.linkedin.com/company/innovaccer/", "website": "https://innovaccer.com/careers/", "sector": "Healthcare", "address": "Noida, Uttar Pradesh, India"},
    {"name": "Instawork", "linkedin": "https://www.linkedin.com/company/instawork/", "website": "https://www.instawork.com/careers", "sector": "HR Tech", "address": "Bengaluru, Karnataka, India"},
    {"name": "Khatabook", "linkedin": "https://www.linkedin.com/company/khatabook/", "website": "https://khatabook.com/careers/", "sector": "Fintech", "address": "2nd Floor, 1202/26, 24th Main Rd, Parangi Palya, 1st Sector, HSR Layout, Bengaluru, Karnataka 560102, India"},
    {"name": "Kodo", "linkedin": "https://www.linkedin.com/company/kodoho/", "website": "https://www.kodo.com/careers", "sector": "Fintech", "address": "Bengaluru, Karnataka, India"},
    {"name": "Kutuki", "linkedin": "https://www.linkedin.com/company/kutuki/", "website": "https://kisankonnect.in/careers/", "sector": "EdTech", "address": "Bengaluru, Karnataka, India"},
    {"name": "Kutumb", "linkedin": "https://www.linkedin.com/company/kutumbapp/", "website": "https://kutumb.app/", "sector": "Social Networking", "address": "Bengaluru, Karnataka, India"},
    {"name": "Lokal", "linkedin": "https://www.linkedin.com/company/lokal-app/", "website": "https://apply.workable.com/lokal-app/?lng=en", "sector": "Media", "address": "Bengaluru, Karnataka, India"},
    {"name": "Magik Labs", "linkedin": "https://www.linkedin.com/company/magik-labs/", "website": "https://www.athina.ai/", "sector": "Fintech", "address": "Bengaluru, Karnataka, India"},
    {"name": "Mantys", "linkedin": "https://www.linkedin.com/company/mantys-io", "website": "https://mantys.io/", "sector": "SaaS", "address": "Bengaluru, Karnataka, India"},
    {"name": "Masai School", "linkedin": "https://www.linkedin.com/company/masai-school/", "website": "https://masaischool.com/careers/", "sector": "EdTech", "address": "Bengaluru, Karnataka, India"},
    {"name": "Material Depot", "linkedin": "https://www.linkedin.com/company/materialdepot/", "website": "https://materialdepot.in/careers", "sector": "Construction Tech", "address": "Bengaluru, Karnataka, India"},
    {"name": "Mica AI", "linkedin": "https://www.linkedin.com/company/mica-ai/", "website": "https://www.usemica.com/", "sector": "AI/ML", "address": "Bengaluru, Karnataka, India"},
    {"name": "Miko", "linkedin": "https://www.linkedin.com/company/mikorobot/", "website": "https://miko.ai/pages/careers", "sector": "Robotics", "address": "Mumbai, Maharashtra, India"},
    {"name": "Nexstem", "linkedin": "https://www.linkedin.com/company/nexstem/", "website": "https://careers.nexstem.ai/", "sector": "AI/ML", "address": "Bengaluru, Karnataka, India"},
    {"name": "Noora Health", "linkedin": "https://www.linkedin.com/company/noora-health/", "website": "https://www.noorahealth.org/careers", "sector": "Healthcare", "address": "Bengaluru, Karnataka, India"},
    {"name": "OkCredit", "linkedin": "https://www.linkedin.com/company/okcredit/", "website": "https://okcredit.in/careers", "sector": "Fintech", "address": "2nd Floor, 1202/26, 24th Main Rd, Parangi Palya, HSR Layout, Bengaluru, Karnataka 560102, India"},
    {"name": "Open", "linkedin": "https://www.linkedin.com/company/bankwithopen/", "website": "https://open.money/career", "sector": "Fintech", "address": "Bengaluru, Karnataka, India"},
    {"name": "Peping", "linkedin": "https://www.linkedin.com/company/peping/", "website": "https://peping.in/", "sector": "Healthcare", "address": "Bengaluru, Karnataka, India"},
    {"name": "Pibit.ai", "linkedin": "https://www.linkedin.com/company/pibitai/", "website": "https://www.pibit.ai/", "sector": "AI/ML", "address": "Bengaluru, Karnataka, India"},
    {"name": "Portkey", "linkedin": "https://www.linkedin.com/company/portkey-ai/", "website": "https://portkey.ai/", "sector": "AI/ML", "address": "Bengaluru, Karnataka, India"},
    {"name": "UpTrain AI", "linkedin": "https://www.linkedin.com/company/uptrain-ai/", "website": "https://uptrain.ai/", "sector": "AI/ML", "address": "Bengaluru, Karnataka, India"},
    {"name": "Vahan", "linkedin": "https://www.linkedin.com/company/vahan-inc-/mycompany/", "website": "https://vahan.co/career.html", "sector": "HR Tech", "address": "Bengaluru, Karnataka, India"},
    {"name": "Vegapay", "linkedin": "https://www.linkedin.com/company/vegapay/", "website": "https://www.vegapay.tech/careers", "sector": "Fintech", "address": "Bengaluru, Karnataka, India"},
    {"name": "Virohan", "linkedin": "https://www.linkedin.com/company/virohan/", "website": "https://www.virohan.com/", "sector": "EdTech", "address": "Gurugram, Haryana, India"},
    {"name": "Wint Wealth", "linkedin": "https://www.linkedin.com/company/wintwealth/", "website": "https://www.wintwealth.com/", "sector": "Fintech", "address": "Bengaluru, Karnataka, India"},
    {"name": "Wizely", "linkedin": "https://www.linkedin.com/company/wizelyapp/", "website": "https://wizely.in/", "sector": "Fintech", "address": "Bengaluru, Karnataka, India"},
    {"name": "WorkIndia", "linkedin": "https://www.linkedin.com/company/workindia/", "website": "https://workindia.app.param.ai/jobs/", "sector": "HR Tech", "address": "Bengaluru, Karnataka, India"},
    {"name": "Zep AI", "linkedin": "https://www.linkedin.com/company/zep-ai/", "website": "https://www.getzep.com/careers/", "sector": "AI/ML", "address": "Bengaluru, Karnataka, India"},
    {"name": "ZestMoney", "linkedin": "https://www.linkedin.com/company/zestmoney/", "website": "https://www.zestmoney.in/career", "sector": "Fintech", "address": "Bengaluru, Karnataka, India"},
    {"name": "Zorp", "linkedin": "https://www.linkedin.com/company/zorp/", "website": "https://zorp-one.notion.site/Careers-Zorp-dcb587d0", "sector": "SaaS", "address": "Bengaluru, Karnataka, India"},
    {"name": "ZunRoof", "linkedin": "https://www.linkedin.com/company/zunroof/", "website": "https://www.zunroof.com/careers", "sector": "CleanTech", "address": "Gurugram, Haryana, India"},
    {"name": "Razorpay", "linkedin": "https://www.linkedin.com/company/razorpay/", "website": "https://razorpay.com/jobs/", "sector": "Fintech", "address": "Bengaluru, Karnataka, India"},
    {"name": "Groww", "linkedin": "https://www.linkedin.com/company/groww-in/", "website": "https://groww.in/careers", "sector": "Fintech", "address": "Bengaluru, Karnataka, India"},
    {"name": "Observe.AI", "linkedin": "https://www.linkedin.com/company/observeai/", "website": "https://www.observe.ai/careers", "sector": "AI/ML", "address": "Bengaluru, Karnataka, India"},
    {"name": "SalaryBox", "linkedin": "https://www.linkedin.com/company/salarybox/", "website": "https://www.salarybox.in/careers", "sector": "SaaS", "address": "Gurugram, Haryana, India"},
    {"name": "Decentro", "linkedin": "https://www.linkedin.com/company/decentro/", "website": "https://decentro.tech/careers/", "sector": "Fintech", "address": "Bengaluru, Karnataka, India"},
    {"name": "Leena AI", "linkedin": "https://www.linkedin.com/company/leena-ai/", "website": "https://leena.ai/careers/", "sector": "AI/ML", "address": "Gurugram, Haryana, India"}
]

# Quick fix for any LinkedIn URLs missing https:// prefix
for item in COMPANIES:
    if item["linkedin"] and not item["linkedin"].startswith("http"):
        item["linkedin"] = "https://" + item["linkedin"]

def map_sector_to_assets(sector, company_name):
    sector_lower = sector.lower()
    
    if "ai" in sector_lower or "ml" in sector_lower:
        role = "AI/ML Engineer Intern"
        category = "AI"
        skills = ["Python", "PyTorch", "TensorFlow", "Generative AI", "LLMs", "RAG"]
        resume_keywords = ["Neural Network Architectures", "Large Language Models (LLM)", "RAG Pipeline Development", "Machine Learning Lifecycle (MLOps)"]
        suggested_projects = [f"Develop a semantic retrieval API using FAISS and LlamaIndex for {company_name}'s domain data."]
        ats_keywords = ["AI Engineer", "Machine Learning Intern", "RAG Developer", "Python AI Specialist"]
    elif "fintech" in sector_lower or "insurtech" in sector_lower:
        role = "Fintech Product Intern"
        category = "Product"
        skills = ["SQL", "Amplitude", "Figma", "Excel Modeling", "Jira", "PRD Writing"]
        resume_keywords = ["Product Management Lifecycle", "User Analytics & Cohorts", "Agile Product Operations", "Wireframing & Spec Design"]
        suggested_projects = [f"Draft a comprehensive PRD detailing a friction-free customer onboarding checkout flow for {company_name}."]
        ats_keywords = ["Associate PM", "Product Analyst", "Fintech Operations", "Agile Product Manager"]
    elif "saas" in sector_lower or "developer tools" in sector_lower or "robotics" in sector_lower or "cleantech" in sector_lower or "construction tech" in sector_lower:
        role = "Software Engineer Intern"
        category = "Operations"
        skills = ["React", "Node.js", "TypeScript", "PostgreSQL", "Git", "Docker"]
        resume_keywords = ["Full Stack Software Development", "RESTful API Integration", "Version Control & CI/CD", "Relational Database Design"]
        suggested_projects = [f"Build and deploy a scalable microservice dashboard monitoring service uptime and request latencies for {company_name}'s API."]
        ats_keywords = ["Software Developer Intern", "Full Stack Engineer", "Backend Developer", "TypeScript Specialist"]
    else:
        role = "BizOps & Growth Intern"
        category = "Management"
        skills = ["Market Research", "SQL", "Google Analytics", "Growth Marketing", "Interpersonal Communication"]
        resume_keywords = ["Business Operations (BizOps)", "Customer Acquisition Cost (CAC)", "Competitive Market Research", "Growth Marketing Funnels"]
        suggested_projects = [f"Formulate a launch strategy and community outreach roadmap targeting early user retention benchmarks for {company_name}."]
        ats_keywords = ["BizOps Associate", "Growth Analyst", "Community Coordinator", "Marketing Intern"]
        
    return role, category, skills, resume_keywords, suggested_projects, ats_keywords

def insert_into_tracker():
    print(f"Connecting to Tracker Database: {TRACKER_DB_PATH}")
    if not os.path.exists(TRACKER_DB_PATH):
        print("Tracker database does not exist!")
        return
    
    conn = sqlite3.connect(TRACKER_DB_PATH)
    cursor = conn.cursor()
    
    inserted = 0
    skipped = 0
    
    for c in COMPANIES:
        job_id = f"direct_{c['name'].lower().replace(' ', '_')}_internship"
        role, category, skills, resume_keywords, suggested_projects, ats_keywords = map_sector_to_assets(c["sector"], c["name"])
        
        # Check if already exists in database
        cursor.execute("SELECT id FROM internships WHERE job_id = ?", (job_id,))
        if cursor.fetchone():
            cursor.execute("UPDATE internships SET is_active = 1 WHERE job_id = ?", (job_id,))
            skipped += 1
            continue
            
        skills_str = json.dumps(skills)
        deadline = "2026-07-31" # Default deadline
        source_platform = "Direct"
        scraped_at = datetime.now().isoformat()
        is_active = 1  # Active by default
        
        # Parse work mode based on location
        work_mode = "hybrid" if "Bengaluru" in c["address"] or "Pune" in c["address"] else "in-office"
        
        try:
            cursor.execute('''
                INSERT INTO internships (
                    job_id, company, role, stipend_amount, stipend_type, 
                    work_mode, location, duration, skills, deadline, 
                    apply_link, source_platform, scraped_at, is_active
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (job_id, c["name"], role, None, "unspecified", 
                  work_mode, c["address"], "6 Months", skills_str, deadline, 
                  c["website"], source_platform, scraped_at, is_active))
            inserted += 1
        except Exception as e:
            print(f"Error inserting {c['name']} into tracker: {e}")
            
    conn.commit()
    conn.close()
    print(f"Tracker DB completed: {inserted} inserted, {skipped} skipped.")

def insert_into_ethos():
    print(f"Connecting to EthOS Database: {ETHOS_DB_PATH}")
    if not os.path.exists(ETHOS_DB_PATH):
        print("EthOS database does not exist!")
        return
        
    conn = sqlite3.connect(ETHOS_DB_PATH)
    cursor = conn.cursor()
    
    inserted = 0
    skipped = 0
    
    for c in COMPANIES:
        # Create a stable UUID based on company name and link
        unique_str = f"direct_{c['name']}_{c['website']}".lower()
        job_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, unique_str))
        
        role, category, skills, resume_keywords, suggested_projects, ats_keywords = map_sector_to_assets(c["sector"], c["name"])
        
        # Check if already exists in database
        cursor.execute("SELECT id FROM internship_jobs WHERE company_name=? AND role_name=? AND apply_link=?", (c["name"], role, c["website"]))
        if cursor.fetchone():
            cursor.execute("UPDATE internship_jobs SET is_active = 1 WHERE company_name=? AND role_name=? AND apply_link=?", (c["name"], role, c["website"]))
            skipped += 1
            continue
            
        work_type = "Hybrid" if "Bengaluru" in c["address"] or "Pune" in c["address"] else "Onsite"
        posted_date = datetime.utcnow().isoformat()
        description = (
            f"🚀 Internship Opportunity at {c['name']}!\n\n"
            f"📢 Hiring for the role of {role}.\n\n"
            f"📍 Location: {c['address']}\n"
            f"🏢 Sector: {c['sector']}\n\n"
            f"If you're interested in {', '.join(skills[:3])} and building impactful products in the {c['sector']} sector, "
            f"this is a great opportunity to kickstart your career. Apply directly via their careers portal."
        )
        
        is_active = 1  # Active by default
        created_at = datetime.utcnow().isoformat()
        
        try:
            cursor.execute('''
                INSERT INTO internship_jobs (
                    id, company_name, role_name, job_type, work_type, location,
                    stipend_salary, apply_link, description, posted_date,
                    company_website, founder_name, founder_email, founder_linkedin,
                    recruiter_name, recruiter_email, recruiter_linkedin,
                    is_fresher_friendly, experience_required, team_size,
                    funding_stage, category, skills, resume_keywords,
                    suggested_projects, ats_keywords, quality_score,
                    scoring_breakdown, is_active, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (job_id, c["name"], role, "Internship", work_type, c["address"],
                  "Unspecified", c["website"], description, posted_date,
                  c["website"], "Founder", "", c["linkedin"],
                  "Recruiter", "", c["linkedin"],
                  1, 0, "50-200 employees", "Growth Stage", category, 
                  json.dumps(skills), json.dumps(resume_keywords),
                  json.dumps(suggested_projects), json.dumps(ats_keywords), 
                  85, json.dumps({"credibility": 15, "paid": 15, "remote": 5, "fresher": 15, "simplicity": 10, "recency": 10}),
                  is_active, created_at))
            inserted += 1
        except Exception as e:
            print(f"Error inserting {c['name']} into ethos: {e}")
            
    conn.commit()
    conn.close()
    print(f"EthOS DB completed: {inserted} inserted, {skipped} skipped.")

if __name__ == '__main__':
    insert_into_tracker()
    insert_into_ethos()
