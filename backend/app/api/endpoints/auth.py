from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
import httpx
import os
from datetime import datetime
import uuid

from app.db.session import get_db
from app.db.models import Integration, User

router = APIRouter()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "your_google_client_id")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "your_google_client_secret")
REDIRECT_URI = "http://localhost:8000/api/v1/auth/google/callback"

@router.get("/google/login")
async def google_login(user_id: str):
    """
    Initiates the Google OAuth flow.
    In a real app, user_id should be extracted from the session/JWT.
    """
    # LOCAL DEV BYPASS: If no real client ID is set, simulate the login instantly.
    if not GOOGLE_CLIENT_ID or "your_" in GOOGLE_CLIENT_ID:
        return RedirectResponse(url=f"{REDIRECT_URI}?code=mock_local_code_123&state={user_id}")

    scopes = "openid email profile https://www.googleapis.com/auth/gmail.readonly"
    auth_url = (
        f"https://accounts.google.com/o/oauth2/v2/auth?"
        f"client_id={GOOGLE_CLIENT_ID}&"
        f"redirect_uri={REDIRECT_URI}&"
        f"response_type=code&"
        f"scope={scopes}&"
        f"access_type=offline&"
        f"prompt=consent&"
        f"state={user_id}" # Passing user_id in state to link account on callback
    )
    return RedirectResponse(url=auth_url)

@router.get("/google/callback")
async def google_callback(code: str, state: str, request: Request, db: Session = Depends(get_db)):
    """
    Handles the Google OAuth callback, exchanges code for tokens, and stores them.
    """
    user_id = state
    
    if code == "mock_local_code_123":
        access_token = "mock_access_token_abc"
        refresh_token = "mock_refresh_token_xyz"
    else:
        # Exchange code for tokens
        token_url = "https://oauth2.googleapis.com/token"
        data = {
            "client_id": GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_CLIENT_SECRET,
            "code": code,
            "grant_type": "authorization_code",
            "redirect_uri": REDIRECT_URI,
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(token_url, data=data)
            if response.status_code != 200:
                raise HTTPException(status_code=400, detail="Failed to retrieve token")
            
            token_data = response.json()
        
        access_token = token_data.get("access_token")
        refresh_token = token_data.get("refresh_token")
    
    # Store or update the integration in DB
    integration = db.query(Integration).filter_by(user_id=user_id, provider="gmail").first()
    
    if not integration:
        integration = Integration(
            user_id=user_id,
            provider="gmail",
            access_token=access_token,
            refresh_token=refresh_token,
            scopes=["https://www.googleapis.com/auth/gmail.readonly"],
            status="active",
            last_synced=datetime.utcnow()
        )
        db.add(integration)
    else:
        integration.access_token = access_token
        if refresh_token:
            integration.refresh_token = refresh_token
        integration.status = "active"
        integration.last_synced = datetime.utcnow()
        
    db.commit()
    
    # Redirect back to the frontend settings page
    return RedirectResponse(url="http://localhost:3000/dashboard")

@router.get("/status")
def get_integrations_status(user_id: str, db: Session = Depends(get_db)):
    integrations = db.query(Integration).filter_by(user_id=user_id).all()
    return [{"provider": i.provider, "status": i.status, "last_synced": i.last_synced} for i in integrations]
