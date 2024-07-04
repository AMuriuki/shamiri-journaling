import os
from dotenv import load_dotenv

load_dotenv()
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    ALCHEMICAL_DATABASE_URL = os.environ.get('DATABASE_URL')