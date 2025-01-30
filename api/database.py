import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./db.sqlite3")

args = {"sslmode": "require"}

if "sqlite" in SQLALCHEMY_DATABASE_URL:
    args = {"check_same_thread": False}

if "postgres://" in SQLALCHEMY_DATABASE_URL:
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgres://", "postgresql://")

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args=args, future=True
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, future=True)

Base = declarative_base()