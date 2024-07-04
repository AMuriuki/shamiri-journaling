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
