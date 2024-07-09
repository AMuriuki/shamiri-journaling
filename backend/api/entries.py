from flask import Blueprint, abort
from apifairy import authenticate, body, response, other_responses

from api import db
from api.models import User, Entry, Category
from api.schemas import CategorySchema, EntrySchema
from api.auth import token_auth
from api.decorators import paginated_response
from api.schemas import DateTimePaginationSchema

entries = Blueprint("entries", __name__)
entry_schema = EntrySchema()
entries_schema = EntrySchema(many=True)
categories_schema = CategorySchema(many=True)
update_entry_schema = EntrySchema(partial=True)


@entries.route("/entries", methods=["POST"])
@authenticate(token_auth)
@body(entry_schema)
@response(entry_schema, 201)
def new(args):
    """Create a new post"""
    print("!!!!!", args)
    user = token_auth.current_user()
    entry = Entry(author=user, **args)
    db.session.add(entry)
    db.session.commit()
    return entry


@entries.route("/entry/<int:id>", methods=["GET"])
@authenticate(token_auth)
@response(entry_schema)
@other_responses({404: "Entry not found"})
def get(id):
    """Retrieve an entry by id"""
    return db.session.get(Entry, id) or abort(404)


@entries.route("/user/<int:id>/entries", methods=["GET"])
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


@entries.route("/categories", methods=["GET"])
@authenticate(token_auth)
@paginated_response(
    categories_schema,
    order_by=Category.title,
    order_direction="desc",
    pagination_schema=DateTimePaginationSchema,
)
def all():
    """Retrieve all categories"""
    return Category.select()


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
