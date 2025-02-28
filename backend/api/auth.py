from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from api.app import db
from api.models import User
from werkzeug.exceptions import Unauthorized, Forbidden

basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()


@basic_auth.verify_password
def verify_password(username, password):
    print("Received credentials:", username, password)
    if username and password:
        user = db.session.scalar(User.select().filter_by(email=username))
        if user and user.verify_password(password):
            return user


@basic_auth.error_handler
def basic_auth_error(status=401):
    error = (Forbidden if status == 403 else Unauthorized)()
    return (
        {
            "code": error.code,
            "message": error.name,
            "description": error.description,
        },
        error.code,
        {"WWW-Authenticate": "Form"},
    )


@token_auth.verify_token
def verify_token(access_token):
    if access_token:
        return User.verify_access_token(access_token)


@token_auth.error_handler
def token_auth_error(status=401):
    error = (Forbidden if status == 403 else Unauthorized)()
    return {
        "code": error.code,
        "message": error.name,
        "description": error.description,
    }, error.code
