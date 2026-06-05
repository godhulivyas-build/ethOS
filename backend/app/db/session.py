from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
import os

# For local development without a running Postgres, we will fallback to SQLite
# Resolve the absolute path to ethos.db at the project root directory
current_dir = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.abspath(os.path.join(current_dir, '..', '..', '..'))
db_path = os.path.join(ROOT_DIR, 'ethos.db')
DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{db_path}")

# If using SQLite, configure arguments for multi-threading and read-only mode on Vercel
connect_args = {}
if DATABASE_URL.startswith("sqlite"):
    connect_args["check_same_thread"] = False
    if os.getenv("VERCEL") == "1":
        DATABASE_URL = f"sqlite:///file:{db_path}?mode=ro"
        connect_args["uri"] = True

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
