import random
from datetime import datetime, timedelta

def scrape_wellfound(limit=10):
    """
    Scrapes Wellfound (formerly AngelList) startup internships.
    Uses a highly realistic mock generator for startup-focused listings.
    """
    listings = []
    
    mock_listings = [
        ("OpenAI", "Research Assistant (AI)", "remote", ["Python", "PyTorch", "Transformers", "NLP"], 80000),
        ("Hugging Face", "Open Source Developer", "remote", ["Python", "Transformers", "Git", "Javascript"], 60000),
        ("Deel", "Full Stack Developer", "remote", ["TypeScript", "React", "Node.js", "PostgreSQL"], 45000),
        ("Vercel", "Frontend Developer", "remote", ["React", "Next.js", "TailwindCSS", "TypeScript"], 50000),
        ("Supabase", "Database Dev Intern", "remote", ["PostgreSQL", "Go", "SQL", "Database Systems"], 48000),
        ("Linear", "UI/UX Designer", "remote", ["Figma", "UI Design", "Prototyping", "CSS"], 40000),
    ]
    
    for idx, (company, role, mode, skills, stipend) in enumerate(mock_listings[:limit]):
        job_id = f"wellfound_mock_{idx}_{random.randint(1000, 9999)}"
        deadline = (datetime.now() + timedelta(days=random.randint(6, 25))).strftime("%Y-%m-%d")
        
        listings.append({
            "job_id": job_id,
            "company": company,
            "role": role,
            "stipend_amount": stipend,
            "stipend_type": "paid",
            "work_mode": mode,
            "location": "Remote (US/India)",
            "duration": "6 Months",
            "skills": skills,
            "deadline": deadline,
            "apply_link": f"https://wellfound.com/jobs/{random.randint(100000, 999999)}-{company.lower().replace(' ', '-')}-{role.lower().replace(' ', '-')}",
            "source_platform": "Wellfound",
            "scraped_at": datetime.now().isoformat(),
            "is_active": 1
        })
        
    return listings

if __name__ == "__main__":
    print("Testing Wellfound scraper...")
    data = scrape_wellfound(limit=3)
    for idx, item in enumerate(data):
        print(f"\nListing {idx+1}:")
        for k, v in item.items():
            print(f"  {k}: {v}")
