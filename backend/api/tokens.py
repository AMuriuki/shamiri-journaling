from flask import Blueprint, abort, current_app, request
from apifairy import authenticate, response, other_responses
from api.auth import basic_auth, token_auth
from api.schemas import EmptySchema, TokenSchema
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


@tokens.route("/tokens", methods=["DELETE"])
@authenticate(token_auth)
@response(EmptySchema, status_code=204, description="Token revoked")
@other_responses({401: "Invalid access token"})
def revoke():
    """Revoke an access token"""
    access_token_jwt = request.headers["Authorization"].split()[1]
    token = Token.from_jwt(access_token_jwt)
    if not token: 
        abort(401)
    token.expire()
    db.session.commit()
    return {}
