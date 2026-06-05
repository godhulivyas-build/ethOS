import requests
from bs4 import BeautifulSoup
import urllib.parse
from typing import Tuple

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5"
}

# Extended closed keywords to catch closed Google Forms, closed Internshala, and closed LinkedIn pages
CLOSED_KEYWORDS = [
    "no longer accepting applications",
    "no longer accepting responses",
    "not accepting responses",
    "form is closed",
    "job is closed",
    "position is closed",
    "no longer active",
    "this position has been filled",
    "job not found",
    "this job is expired",
    "opportunity has expired",
    "page not found",
    "404 not found",
    "job listing has expired",
    "listing has been removed",
    "this internship is closed",
    "submissions are closed",
    "closed this form",
    "no longer available"
]

def verify_link(url: str, timeout: int = 10) -> Tuple[bool, str]:
    """
    Verifies if an application link is active and open.
    Returns (is_active, status_description).
    """
    if not url or not url.startswith('http'):
        return False, "Invalid URL format"
        
    try:
        # Perform GET request with redirects enabled
        response = requests.get(url, headers=HEADERS, timeout=timeout, allow_redirects=True)
        
        # Check HTTP status
        final_url = response.url
        
        # Check HTTP status
        if response.status_code >= 400:
            if response.status_code == 401 and ("docs.google.com/forms" in final_url or "forms.gle" in final_url):
                return True, "Active and valid link (requires login)"
            return False, f"HTTP Error Status {response.status_code}"
        
        # Follow Google Form redirect interstitial links if present
        if "lnkd.in" in url or "linkedin.com/feed/update" in url:
            # If the resolved final url is still a redirect page, parse it
            soup = BeautifulSoup(response.text, 'html.parser')
            for a in soup.find_all('a'):
                href = a.get('href')
                if href and ("docs.google.com" in href or "forms.gle" in href or "greenhouse.io" in href or "lever.co" in href):
                    # Resolve to the actual destination
                    return verify_link(href, timeout=timeout)
                    
        # Check if redirected to generic page
        if final_url != url:
            parsed_original = urllib.parse.urlparse(url)
            parsed_final = urllib.parse.urlparse(final_url)
            
            if any(p in parsed_final.path.lower() for p in ['/login', '/register', '/jobs-search', '/careers-home']) or parsed_final.path == '/':
                if parsed_original.path != parsed_final.path:
                    return False, f"Redirected to generic page: {final_url}"
                    
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract page text
        page_text = soup.get_text(" ").lower()
        
        # Google Form specific check
        if "docs.google.com/forms" in final_url or "forms.gle" in final_url:
            if any(kw in page_text for kw in ["no longer accepting responses", "not accepting responses", "closed this form"]):
                return False, "Google Form: No longer accepting responses"
                
        # Remove standard elements that might contain headers/noise
        for element in soup(["script", "style", "head", "title"]):
            element.decompose()
            
        page_text = soup.get_text(" ").lower()
        
        # Check for any closed keywords
        for kw in CLOSED_KEYWORDS:
            if kw in page_text:
                return False, f"Closed/Expired keyword found: '{kw}'"
                
        # LinkedIn closed badges
        if "linkedin.com/jobs" in final_url:
            closed_badge = soup.find(class_='jobs-search-page-details__closed-badge')
            if closed_badge:
                return False, "LinkedIn: Job is closed (badge found)"
                
        return True, "Active and valid link"
        
    except requests.exceptions.Timeout:
        return False, "Connection timeout"
    except requests.exceptions.RequestException as e:
        return False, f"Request failed: {str(e)}"
    except Exception as e:
        return False, f"Verification error: {str(e)}"

if __name__ == '__main__':
    # Test cases
    print("Testing active form:")
    print(verify_link("https://docs.google.com/forms/d/e/1FAIpQLSfdx4kP8qMWkbOq1lTjF2nBpddHVog7WIoaZvXmZsJyBvmhvQ/viewform"))
    
    print("\nTesting known closed page (Google):")
    print(verify_link("https://docs.google.com/forms/d/e/1FAIpQLSfD3K1r40n0wXvjJ9aZ4FmX1J0WvJ2N-v4nO6Z3_012345678/viewform"))
