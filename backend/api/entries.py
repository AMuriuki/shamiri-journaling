from flask import Blueprint, abort
from apifairy import authenticate, body, response, other_responses

from api import db
from api.models import User, Entry, Category
from api.schemas import EntrySchema
from api.auth import token_auth
from api.decorators import paginated_response
from api.schemas import DateTimePaginationSchema

entries = Blueprint("entries", __name__)
entry_schema = EntrySchema()
entries_schema = EntrySchema(many=True)
update_entry_schema = EntrySchema(partial=True)


@entries.route("/entries/<int:id>", methods=["GET"])
@authenticate(token_auth)
@response(entry_schema)
@other_responses({404: "Entry not found"})
def get(id):
    """Retrieve an entry by id"""
    return db.session.get(Entry, id) or abort(404)


@entries.route("/users/<int:id>/entries", methods=["GET"])
@authenticate(token_auth)
@paginated_response(
    entries_schema,
    order_by=Entry.timestamp,
    order_direction="desc",
    pagination_schema=DateTimePaginationSchema,
)
@other_responses({404: "User not found"})
def user_all(id):
    """Retrieve all entries from a user"""
    user = db.session.get(User, id) or abort(404)
    return user.entries.select()


@entries.route("/category/<int:id>/entries", methods=["GET"])
@authenticate(token_auth)
@paginated_response(
    entries_schema,
    order_by=Entry.timestamp,
    order_direction="desc",
    pagination_schema=DateTimePaginationSchema,
)
@other_responses({404: "Category not found"})
def category_all(id):
    """Retrieve all entries for a category"""
    category = db.session.get(Category, id) or abort(404)
    return category.entries.select()
