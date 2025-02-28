import unittest
from config import Config
from api.app import create_app, db
from api.models import User


class TestConfig(Config):
    SERVER_NAME = "localhost:5000"
    TESTING = True
    ALCHEMICAL_DATABASE_URL = "sqlite://"


class BaseTestCase(unittest.TestCase):
    config = TestConfig

    def setUp(self):
        self.app = create_app(self.config)
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        user = User(username="test", email="test@example.com", password="foo")
        db.session.add(user)
        db.session.commit()
        self.client = self.app.test_client()

    def tearDown(self):
        db.session.close()
        db.drop_all()
        self.app_context.pop()
