import os
from dotenv import load_dotenv

load_dotenv()
basedir = os.path.abspath(os.path.dirname(__file__))


def as_bool(value):
    if value:
        return value.lower() in ["true", "yes", "on", "1"]
    return False


class Config:
    ALCHEMICAL_DATABASE_URL = os.environ.get("DATABASE_URL")
    ALCHEMICAL_ENGINE_OPTIONS = {"echo": as_bool(os.environ.get("SQL_ECHO", "false"))}
    USE_CORS = as_bool(os.environ.get("USE_CORS") or "yes")
    ACCESS_TOKEN_MINUTES = int(os.environ.get("ACCESS_TOKEN_MINUTES") or "60")
    REFRESH_TOKEN_DAYS = int(os.environ.get("REFRESH_TOKEN_DAYS") or "7")
    SECRET_KEY = os.environ.get('SECRET_KEY', 'top-secret!')

    # API Documentation
    APIFAIRY_TITLE = 'Shamiri API'
    APIFAIRY_VERSION = '1.0'
    APIFAIRY_UI = os.environ.get('DOCS_UI', 'elements')
    # APIFAIRY_TAGS = ['tokens', 'users', 'posts']
