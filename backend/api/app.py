from flask import Flask
from alchemical.flask import Alchemical
from config import Config

db = Alchemical()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)

    return app
