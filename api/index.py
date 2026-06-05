import os
import sys
import traceback

# Unconditionally define app at the top level for Vercel's static analysis
app = None

# Get absolute path to the backend directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKEND_DIR = os.path.join(BASE_DIR, 'backend')

# Add backend directory to python path
sys.path.insert(0, BACKEND_DIR)

try:
    # Import the FastAPI app
    from app.main import app
except Exception as e:
    tb = traceback.format_exc()
    print("CRITICAL: Failed to import FastAPI application:")
    print(tb)
    
    # Fallback WSGI app to output the traceback directly in the response and prevent Vercel build crash
    def app(environ, start_response):
        status = '500 Internal Server Error'
        headers = [
            ('Content-Type', 'application/json'),
            ('Access-Control-Allow-Origin', '*'),
            ('Access-Control-Allow-Headers', 'Content-Type,Authorization'),
            ('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
        ]
        start_response(status, headers)
        import json
        error_response = {
            "error": "Failed to import FastAPI application at startup on Vercel",
            "exception": str(e),
            "traceback": tb.split('\n')
        }
        return [json.dumps(error_response).encode('utf-8')]

