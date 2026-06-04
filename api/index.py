import os
import sys

# Get absolute path to the backend directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKEND_DIR = os.path.join(BASE_DIR, 'backend')

# Add backend directory to python path
sys.path.insert(0, BACKEND_DIR)

# Import the FastAPI app
from app.main import app
