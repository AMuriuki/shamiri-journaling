from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from api.app import db
from api.models import User

basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()


@basic_auth.verify_password
def verify_password(username, password):
    print("Received credentials:", username, password)
    if username and password:
        user = db.session.scalar(User.select().filter_by(email=username))
        if user and user.verify_password(password):
            return user
