import json
import os
from flask import Blueprint
from api.app import db
from api.models import Category

seed = Blueprint("seed", __name__)

script_dir = os.path.dirname(__file__)


@seed.cli.command()
def categories():
    """Seed categories data to DB."""

    file_path = os.path.join(script_dir, "data", "categories.json")

    with open(file_path, "r") as file:
        categories_data = json.load(file)

    categories = json.loads(json.dumps(categories_data))
    for category in categories:
        if db.session.query(Category).filter_by(title=category["title"]).first():
            print(f"Category with title '{category['title']}' already exists")
        else:
            category = Category(title=category["title"])
            db.session.add(category)
            db.session.commit()

            print("categories added.")
