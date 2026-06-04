import os
import requests
from flask import Flask, jsonify, request, send_from_directory
from db import get_all_internships, insert_feedback, insert_click, get_analytics_summary

# Initialize Flask app
# The static folder points to the frontend directory relative to backend
app = Flask(__name__, static_folder='../frontend', static_url_path='')

from db import init_db
init_db()

@app.route('/')
def index():
    """Serves the frontend dashboard main page."""
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/internships', methods=['GET'])
def get_internships():
    """
    Exposes filterable and sortable internships list.
    Query Params:
    - stipend_type: 'paid', 'unpaid', 'unspecified'
    - work_mode: 'remote', 'hybrid', 'in-office'
    - skills: filter by skill name (substring match)
    - sort_by: 'latest', 'highest_stipend', 'deadline_soon'
    """
    stipend_type = request.args.get('stipend_type')
    work_mode = request.args.get('work_mode')
    skills = request.args.get('skills')
    sort_by = request.args.get('sort_by')
    
    filters = {}
    if stipend_type and stipend_type != 'all':
        filters['stipend_type'] = stipend_type
    if work_mode and work_mode != 'all':
        filters['work_mode'] = work_mode
    if skills:
        filters['skills'] = skills
        
    try:
        data = get_all_internships(filters=filters, sort_by=sort_by)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/apollo-contacts', methods=['GET'])
def apollo_contacts():
    """
    Enriches company listing with HR/recruiter/founder contact emails from Apollo.io.
    Falls back to direct search URLs if no API key is set or no results are returned.
    """
    company = request.args.get('company')
    if not company:
        return jsonify({"error": "Company name is required"}), 400

    api_key = os.getenv("APOLLO_API_KEY")
    
    # URL encode company name for safe search links
    import urllib.parse
    encoded_company = urllib.parse.quote(company)
    
    fallback_apollo = f"https://www.apollo.io/people?find_organization_name={encoded_company}"
    fallback_linkedin = f"https://www.linkedin.com/search/results/people/?keywords=HR%20or%20recruiter%20{encoded_company}"
    
    result = {
        "contacts": [],
        "fallback_apollo": fallback_apollo,
        "fallback_linkedin": fallback_linkedin
    }
    
    if not api_key:
        return jsonify(result)
        
    try:
        apollo_url = "https://api.apollo.io/v1/mixed_people/api_search"
        headers = {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        }
        payload = {
            "api_key": api_key,
            "q_organization_name": company,
            "person_titles": ["Founder", "Co-Founder", "CEO", "Recruiter", "Talent Acquisition", "Head of Talent", "HR"],
            "per_page": 5
        }
        
        response = requests.post(apollo_url, json=payload, headers=headers, timeout=5)
        if response.status_code == 200:
            res_data = response.json()
            people = res_data.get("people", []) or res_data.get("contacts", [])
            
            contacts = []
            for person in people:
                if person.get("email"):  # Only include contacts with emails
                    contacts.append({
                        "name": person.get("name") or f"{person.get('first_name', '')} {person.get('last_name', '')}".strip(),
                        "title": person.get("title", "Recruiter"),
                        "email": person.get("email"),
                        "linkedin": person.get("linkedin_url")
                    })
            result["contacts"] = contacts
    except Exception as e:
        print(f"Error querying Apollo API: {e}")
        
    return jsonify(result)

@app.route('/api/feedback', methods=['POST'])
def submit_feedback():
    """
    Submits user suggestions and rating feedback to improve the platform.
    """
    data = request.get_json() or {}
    email = data.get('email')
    rating = data.get('rating')
    
    if not email or not rating:
        return jsonify({"error": "Email and rating are required"}), 400
        
    success = insert_feedback(data)
    if success:
        return jsonify({"status": "success", "message": "Feedback submitted successfully!"})
    else:
        return jsonify({"error": "Failed to submit feedback"}), 500

@app.route('/api/track-click', methods=['POST'])
def track_click_event():
    """
    Records a click interaction event for tracking statistics (Apply, Find HR, WhatsApp).
    """
    data = request.get_json() or {}
    event_type = data.get('event_type')
    details = data.get('details')
    
    if not event_type:
        return jsonify({"error": "Event type is required"}), 400
        
    success = insert_click(event_type, details)
    if success:
        return jsonify({"status": "success", "message": "Click tracked successfully"})
    else:
        return jsonify({"error": "Failed to log click"}), 500

@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    """
    Exposes platform click metrics and feedback totals for live dashboard status counts.
    """
    summary = get_analytics_summary()
    return jsonify(summary)

if __name__ == '__main__':
    # Run the server on port 5000 in debug mode
    app.run(host='0.0.0.0', port=5000, debug=True)
