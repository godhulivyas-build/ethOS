import uuid
from sqlalchemy import Column, String, JSON, DateTime, ForeignKey, Text, Boolean, Integer
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
    scopes = Column(JSON, default=[])
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

class InternshipJob(Base):
    __tablename__ = "internship_jobs"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    company_name = Column(String, nullable=False, index=True)
    role_name = Column(String, nullable=False, index=True)
    job_type = Column(String, default="Internship") # 'Internship' or 'Full-Time'
    work_type = Column(String, default="Remote") # 'Remote', 'Hybrid', 'Onsite'
    location = Column(String)
    stipend_salary = Column(String)
    apply_link = Column(Text)
    description = Column(Text)
    posted_date = Column(DateTime, default=datetime.utcnow)
    company_website = Column(String)
    founder_name = Column(String, nullable=True)
    founder_email = Column(String, nullable=True)
    founder_linkedin = Column(String, nullable=True)
    recruiter_name = Column(String, nullable=True)
    recruiter_email = Column(String, nullable=True)
    recruiter_linkedin = Column(String, nullable=True)
    is_fresher_friendly = Column(Boolean, default=True)
    experience_required = Column(Integer, default=0) # in years
    team_size = Column(String, default="10-50 employees")
    funding_stage = Column(String, default="Seed")
    category = Column(String, index=True) # e.g., 'Product', 'AI', 'Founder\'s Office'

    skills = Column(JSON, default=[]) # list of strings
    resume_keywords = Column(JSON, default=[])
    suggested_projects = Column(JSON, default=[])
    ats_keywords = Column(JSON, default=[])
    quality_score = Column(Integer, default=80)
    scoring_breakdown = Column(JSON, default={})
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class UserJobInteraction(Base):
    __tablename__ = "user_job_interactions"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    job_id = Column(String, ForeignKey("internship_jobs.id"), nullable=False)
    user_id = Column(String, default="default_user", index=True)
    viewed = Column(Boolean, default=False)
    clicked = Column(Boolean, default=False)
    bookmarked = Column(Boolean, default=False)
    application_status = Column(String, default="Not Applied") # 'Not Applied', 'Applied', 'Interview Scheduled', 'Rejected', 'Selected'
    rating = Column(Integer, nullable=True) # 1-5
    feedback = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

