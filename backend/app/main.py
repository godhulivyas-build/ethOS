# Force rebuild trigger for Railway deployment pipeline
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.router import api_router
from app.core.config import settings
from app.db.models import Base
from app.db.session import engine

# Auto-create tables for SQLite/Postgres compatibility
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"Skipping database schema creation/update: {e}")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="0.1.0",
    description="ETHOS Identity Operating System API",
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for dev simplicity
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")

@app.on_event("startup")
def on_startup():
    from app.core.scheduler import start_scheduler
    # Start the 2-hour automated background scheduler
    start_scheduler()

@app.on_event("shutdown")
def on_shutdown():
    from app.core.scheduler import stop_scheduler
    stop_scheduler()

@app.get("/")
def root():
    return {"message": "ETHOS Backend is running. Access /docs for API documentation."}


