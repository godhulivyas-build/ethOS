import re
import requests
from bs4 import BeautifulSoup
from datetime import datetime
import time

# User-Agent header to prevent getting blocked
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

def parse_internshala_date(date_str):
    """Parses Internshala deadline dates (e.g. 3 Jul' 26) to YYYY-MM-DD format."""
    if not date_str:
        return None
    # Remove apostrophe
    clean_str = date_str.replace("'", "").strip()
    
    # Try parsing different formats
    for fmt in ("%d %b %y", "%d %b %Y", "%d %B %Y", "%d %B %y"):
        try:
            dt = datetime.strptime(clean_str, fmt)
            return dt.strftime("%Y-%m-%d")
        except ValueError:
            continue
    return clean_str  # Fallback to original string if parsing fails

def parse_stipend(stipend_str):
    """Parses stipend string to extract stipend_amount (integer) and stipend_type."""
    if not stipend_str:
        return None, 'unspecified'
    
    stipend_lower = stipend_str.lower()
    if 'unpaid' in stipend_lower:
        return 0, 'unpaid'
    
    # Extract numbers (possibly with commas)
    numbers = re.findall(r'[\d,]+', stipend_str)
    if not numbers:
        return None, 'unspecified'
    
    ints = []
    for num in numbers:
        try:
            val = int(num.replace(',', ''))
            ints.append(val)
        except ValueError:
            continue
            
    if not ints:
        return None, 'unspecified'
    
    # Calculate average if it's a range
    avg_stipend = int(sum(ints) / len(ints))
    if avg_stipend > 0:
        return avg_stipend, 'paid'
    else:
        return 0, 'unpaid'

def parse_work_mode(location_str):
    """Extracts work mode from location text based on database constraints."""
    if not location_str:
        return 'in-office'
    loc_lower = location_str.lower()
    if 'work from home' in loc_lower or 'remote' in loc_lower:
        return 'remote'
    elif 'hybrid' in loc_lower:
        return 'hybrid'
    else:
        return 'in-office'

def fetch_deadline(detail_url):
    """Fetches the deadline from the internship's detail page."""
    try:
        # Respect rate limits
        time.sleep(0.5)
        response = requests.get(detail_url, headers=HEADERS, timeout=10)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            hourglass = soup.find('i', class_='ic-16-hourglass')
            if hourglass:
                parent = hourglass.find_parent(class_='item_heading')
                if parent:
                    body = parent.find_next_sibling(class_='item_body')
                    if body:
                        return parse_internshala_date(body.text.strip())
                # Fallback check
                body = hourglass.find_next(class_='item_body')
                if body:
                    return parse_internshala_date(body.text.strip())
    except Exception as e:
        print(f"Error fetching deadline from {detail_url}: {e}")
    return None

def scrape_internshala(limit=30, fetch_deadlines=False):
    """Scrapes internship listings from Internshala search page."""
    url = "https://internshala.com/internships/"
    try:
        response = requests.get(url, headers=HEADERS, timeout=15)
        if response.status_code != 200:
            print(f"Failed to fetch Internshala. Status: {response.status_code}")
            return []
            
        soup = BeautifulSoup(response.text, 'html.parser')
        cards = soup.find_all(class_='individual_internship')
        
        internships = []
        for card in cards[:limit]:
            # Job ID
            raw_id = card.get('internshipid')
            if not raw_id:
                raw_id_attr = card.get('id', '')
                raw_id = raw_id_attr.replace('individual_internship_', '')
            if not raw_id:
                continue
                
            job_id = f"internshala_{raw_id}"
            
            # Title / Role
            title_el = card.find(class_='job-title-href')
            role = title_el.text.strip() if title_el else "Unknown Role"
            
            # Relative detail link
            href = title_el.get('href') if title_el else None
            apply_link = f"https://internshala.com{href}" if href else url
            
            # Company
            company_el = card.find(class_='company-name')
            company = company_el.text.strip() if company_el else "Unknown Company"
            
            # Location
            loc_el = card.find(class_='locations')
            location = loc_el.text.strip() if loc_el else "In-Office"
            
            # Work Mode
            work_mode = parse_work_mode(location)
            
            # Stipend
            stipend_el = card.find(class_='stipend')
            stipend_str = stipend_el.text.strip() if stipend_el else ""
            stipend_amount, stipend_type = parse_stipend(stipend_str)
            
            # Duration
            duration = None
            calendar_icon = card.find('i', class_='ic-16-calendar')
            if calendar_icon:
                span = calendar_icon.find_next('span')
                if span:
                    duration = span.text.strip()
                    
            # Skills
            skills = [skill.text.strip() for skill in card.find_all(class_='job_skill')]
            
            # Deadline
            deadline = None
            if fetch_deadlines and href:
                deadline = fetch_deadline(apply_link)
                
            # Posting date label (for informational logs)
            labels = []
            labels_container = card.find(class_='detail-row-2')
            if labels_container:
                labels = [span.text.strip() for span in labels_container.find_all('span')]
            
            internship = {
                "job_id": job_id,
                "company": company,
                "role": role,
                "stipend_amount": stipend_amount,
                "stipend_type": stipend_type,
                "work_mode": work_mode,
                "location": location,
                "duration": duration,
                "skills": skills,
                "deadline": deadline,
                "apply_link": apply_link,
                "source_platform": "Internshala",
                "scraped_at": datetime.now().isoformat(),
                "is_active": 1,
                "posted_label": labels[0] if labels else "Unknown"
            }
            internships.append(internship)
            
        return internships
        
    except Exception as e:
        print(f"Error scraping Internshala: {e}")
        return []

if __name__ == "__main__":
    print("Testing Internshala scraper...")
    listings = scrape_internshala(limit=5, fetch_deadlines=True)
    print(f"Scraped {len(listings)} listings:")
    for idx, item in enumerate(listings):
        print(f"\nListing {idx+1}:")
        for k, v in item.items():
            print(f"  {k}: {v}")
