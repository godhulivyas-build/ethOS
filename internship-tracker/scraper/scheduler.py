import os
import sys
import time
from datetime import datetime, timedelta

# Ensure correct path configuration
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(CURRENT_DIR)

from scraper import run_aggregator

def get_seconds_until_target(target_hour=8, target_minute=0):
    """Calculates seconds until the next occurrence of target_hour:target_minute."""
    now = datetime.now()
    target = now.replace(hour=target_hour, minute=target_minute, second=0, microsecond=0)
    if target <= now:
        # If target time has already passed today, schedule for tomorrow
        target += timedelta(days=1)
    
    delta = target - now
    return delta.total_seconds()

def start_scheduler():
    """
    Starts scheduler daemon:
    1. Runs the aggregator immediately to ensure database has fresh data.
    2. Calculates time remaining until 8:00 AM and sleeps.
    3. Runs the aggregator at 8:00 AM daily.
    """
    print("=" * 60)
    print("Internship Aggregator Scheduler Daemon Initialized")
    print("Scheduler target: Daily at 8:00 AM")
    print("=" * 60)
    
    # Run once immediately on start to guarantee database population on deploy
    print("Running initial boot scrape...")
    try:
        run_aggregator()
    except Exception as e:
        print(f"Aggregator initial boot run failed: {e}")
        
    while True:
        seconds_left = get_seconds_until_target(8, 0)
        hours = int(seconds_left // 3600)
        minutes = int((seconds_left % 3600) // 60)
        print(f"Next run scheduled in {hours}h {minutes}m. Sleeping...")
        
        # Sleep in blocks of at most 1 hour to allow safe interruptions
        while seconds_left > 0:
            sleep_time = min(seconds_left, 3600)
            time.sleep(sleep_time)
            seconds_left -= sleep_time
            
        print("Scheduled time reached (8:00 AM). Initiating daily scrape...")
        try:
            run_aggregator()
        except Exception as e:
            print(f"Aggregator scheduled run failed: {e}")

if __name__ == '__main__':
    start_scheduler()
