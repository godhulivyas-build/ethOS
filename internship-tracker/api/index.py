import os
import sys
import traceback

# Ensure backend directory is at the front of the python path to prevent naming collisions
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(CURRENT_DIR), 'backend'))

try:
    # Import Flask app
    from app import app
except Exception as e:
    tb = traceback.format_exc()
    
    # Fallback WSGI app to output the traceback directly in the response
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
            "error": "Failed to import Flask application at startup",
            "exception": str(e),
            "traceback": tb.split('\n')
        }
        return [json.dumps(error_response).encode('utf-8')]

