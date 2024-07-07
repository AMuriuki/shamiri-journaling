from flask import Flask
from config import Config
from apifairy import APIFairy
from alchemical.flask import Alchemical
from flask_marshmallow import Marshmallow
from flask_cors import CORS


db = Alchemical()
ma = Marshmallow()
apifairy = APIFairy()
cors = CORS()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    ma.init_app(app)
    if app.config["USE_CORS"]:
        cors.init_app(app)
    apifairy.init_app(app)

    # api-endpoint blueprints
    from api.users import users

    app.register_blueprint(users, url_prefix="/api")

    return app
