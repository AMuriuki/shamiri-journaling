from api import db
from api.models import User
from flask import Blueprint, jsonify
from api.schemas import UserSchema
from apifairy import body, response
from sqlalchemy.exc import IntegrityError

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
