from datetime import datetime

def calculate_score(internship):
    """
    Calculates a score for an internship listing.
    Higher score means more preferred.
    
    Criteria:
    - Stipend Amount: 1 point per ₹1,000 (e.g. ₹15,000 stipend = 15 points).
    - Stipend Type: Unpaid internships get a penalty (-5 points).
    - Work Mode: 'remote' gets +10 points, 'hybrid' gets +7 points, 'in-office' gets +2 points.
    - Deadline: If deadline is <= 3 days away (or passed), penalize heavily (-100 points).
                If deadline is > 3 days away, reward +5 points.
    """
    score = 0.0
    
    # 1. Stipend Score
    stipend_amt = internship.get('stipend_amount') or 0
    stipend_type = internship.get('stipend_type', 'unspecified')
    
    if stipend_type == 'paid' and stipend_amt > 0:
        score += (stipend_amt / 1000.0)
    elif stipend_type == 'unpaid':
        score -= 5.0
        
    # 2. Work Mode Score
    work_mode = internship.get('work_mode', 'in-office')
    if work_mode == 'remote':
        score += 10.0
    elif work_mode == 'hybrid':
        score += 7.0
    else:
        score += 2.0
        
    # 3. Deadline Score
    deadline_str = internship.get('deadline')
    if deadline_str:
        try:
            deadline_date = datetime.strptime(deadline_str, "%Y-%m-%d").date()
            today = datetime.now().date()
            days_remaining = (deadline_date - today).days
            
            if days_remaining <= 3:
                # Close deadline penalty
                score -= 100.0
            else:
                # Healthy deadline bonus
                score += 5.0
        except Exception:
            # If parsing fails or deadline format is generic text, ignore penalty
            pass
            
    return round(score, 2)
