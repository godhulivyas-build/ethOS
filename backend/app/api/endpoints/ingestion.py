from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models import Integration, KnowledgeSource
from app.services.gmail import GmailService
from app.pipelines.memory import VectorMemory
import os
import json
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage

router = APIRouter()

def process_newsletter_background(user_id: str, email_data: dict, db: Session):
    """
    Background worker: Extracts insights using LLM and vectorizes into Pinecone.
    """
    llm = ChatOpenAI(model="gpt-4o", temperature=0.2, api_key=os.getenv("OPENAI_API_KEY"))
    
    # 1. Summarization & Insight Extraction
    sys_prompt = "You are the ETHOS Knowledge Refinery Agent. Extract 3-5 core mental models, startup ideas, or high-leverage insights from the provided newsletter. Return JSON with key 'insights' (list of strings)."
    messages = [
        SystemMessage(content=sys_prompt),
        HumanMessage(content=email_data["content"][:4000]) # Truncate for token limits
    ]
    
    try:
        response = llm(messages)
        # Extremely basic JSON parsing for demonstration
        import re
        json_match = re.search(r'\{.*\}', response.content, re.DOTALL)
        insights = json.loads(json_match.group(0)) if json_match else {"insights": ["Failed to parse"]}
    except Exception as e:
        insights = {"insights": [f"Extraction error: {str(e)}"]}

    # 2. Vectorize the raw text
    memory = VectorMemory()
    memory_id = memory.store_memory(
        user_id=user_id,
        text=email_data["content"],
        metadata={"source": "gmail_newsletter", "subject": email_data["subject"]}
    )
    
    # 3. Store in Postgres
    knowledge = KnowledgeSource(
        user_id=user_id,
        source_type="newsletter",
        title=email_data["subject"],
        raw_content=email_data["content"],
        extracted_insights=insights,
        processed_status="vectorized"
    )
    db.add(knowledge)
    db.commit()


@router.post("/sync/gmail")
async def sync_gmail_newsletters(user_id: str, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """
    Triggers the Gmail API to fetch new newsletters, and queues them for extraction.
    """
    integration = db.query(Integration).filter_by(user_id=user_id, provider="gmail").first()
    
    if not integration or not integration.access_token:
        raise HTTPException(status_code=400, detail="Gmail integration not found or unauthorized.")
        
    # Initialize Gmail Service
    # Note: Requires GOOGLE_CLIENT_ID and SECRET in env
    gmail = GmailService(
        access_token=integration.access_token,
        refresh_token=integration.refresh_token,
        client_id=os.getenv("GOOGLE_CLIENT_ID"),
        client_secret=os.getenv("GOOGLE_CLIENT_SECRET")
    )
    
    try:
        emails = gmail.fetch_newsletters(max_results=5)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch from Gmail: {str(e)}")
        
    for email in emails:
        background_tasks.add_task(process_newsletter_background, user_id, email, db)
        
    return {
        "status": "processing",
        "message": f"Queued {len(emails)} newsletters for ingestion.",
        "queued_emails": [e["subject"] for e in emails]
    }

@router.get("/vault")
def get_vault_assets(user_id: str, db: Session = Depends(get_db)):
    """
    Fetches processed knowledge sources for the UI.
    """
    assets = db.query(KnowledgeSource).filter_by(user_id=user_id).order_by(KnowledgeSource.created_at.desc()).limit(20).all()
    return [{
        "id": str(a.id),
        "title": a.title,
        "type": a.source_type,
        "insights_count": len(a.extracted_insights.get("insights", [])),
        "status": a.processed_status
    } for a in assets]
