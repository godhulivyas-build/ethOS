import uuid
from sqlalchemy import Column, String, JSON, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    tone_profile = Column(JSON, default={})
    created_at = Column(DateTime, default=datetime.utcnow)

class Integration(Base):
    __tablename__ = "integrations"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    provider = Column(String) # e.g., 'gmail'
    access_token = Column(Text)
    refresh_token = Column(Text)
    scopes = Column(ARRAY(String))
    status = Column(String, default="active")
    last_synced = Column(DateTime)

class KnowledgeSource(Base):
    __tablename__ = "knowledge_sources"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    source_type = Column(String) # e.g., 'newsletter', 'pdf', 'idea'
    title = Column(String)
    raw_content = Column(Text)
    extracted_insights = Column(JSON, default={})
    processed_status = Column(String, default="pending") # 'pending', 'vectorized'
    created_at = Column(DateTime, default=datetime.utcnow)
