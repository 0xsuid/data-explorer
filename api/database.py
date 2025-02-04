import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

database_url = os.getenv("DATABASE_URL", "sqlite:///./db.sqlite3")
if os.getenv("DATABASE_URL_UNPOOLED"):
    # NeonDB
    database_url = os.getenv("DATABASE_URL_UNPOOLED")
elif os.getenv("POSTGRES_URL_NON_POOLING"):
    # Supabase
    database_url = os.getenv("POSTGRES_URL_NON_POOLING")

args = {"sslmode": "require"}

if "sqlite" in database_url:
    args = {"check_same_thread": False}

if "postgres://" in database_url:
    database_url = database_url.replace("postgres://", "postgresql://")

engine = create_engine(
    database_url, connect_args=args, future=True
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, future=True)

Base = declarative_base()