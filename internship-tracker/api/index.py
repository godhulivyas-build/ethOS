import os
import sys

# Ensure backend directory is in the python path to load db and app
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.join(os.path.dirname(CURRENT_DIR), 'backend'))

# Import Flask app
from app import app
