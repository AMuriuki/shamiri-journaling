from api import db
from api.models import User
from flask import Blueprint, jsonify
from api.schemas import UserSchema
from apifairy import body, response, authenticate
from sqlalchemy.exc import IntegrityError
from api.auth import token_auth

users = Blueprint("users", __name__)
user_schema = UserSchema()


@users.route("/new-user", methods=["POST"])
@body(user_schema)
@response(user_schema, 201)
def new_user(args):
    """Register a new user"""
    user = User(**args)
    db.session.add(user)
    db.session.commit()
    return user


@users.route("/user", methods=["GET"])
@authenticate(token_auth)
@response(user_schema)
def user():
    """Retrieve the authenticated user"""
    return token_auth.current_user()
