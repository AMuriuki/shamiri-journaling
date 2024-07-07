from flask import Blueprint, current_app
from apifairy import authenticate, response, other_responses
from api.auth import basic_auth
from api.schemas import TokenSchema
from api.app import db
from api.models import User, Token

tokens = Blueprint("tokens", __name__)
token_schema = TokenSchema()


def token_response(token):
    return {
        "access_token": token.access_token_jwt,
        "refresh_token": token.refresh_token,
    }


@tokens.route("/tokens", methods=["POST"])
@authenticate(basic_auth)
@response(token_schema)
@other_responses({401: "Invalid username or password"})
def login():
    """Create new access and refresh tokens"""

    user = basic_auth.current_user()
    token = user.generate_auth_token()
    db.session.add(token)
    Token.clean()
    db.session.commit()
    return token_response(token)
