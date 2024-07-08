from api import db
from api.models import User
from flask import Blueprint, abort, jsonify
from api.schemas import UserSchema
from apifairy import body, response, authenticate
from api.auth import token_auth
from apifairy.decorators import other_responses

users = Blueprint("users", __name__)
user_schema = UserSchema()


@users.route("/users/<int:id>", methods=["GET"])
@authenticate(token_auth)
@response(user_schema)
@other_responses({404: "User not found"})
def get(id):
    """Retrieve a user by id"""
    return db.session.get(User, id) or abort(404)


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
def me():
    """Retrieve the authenticated user"""
    return token_auth.current_user()

