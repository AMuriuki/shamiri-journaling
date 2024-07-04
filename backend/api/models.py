from typing import Optional
import sqlalchemy as sa
from api import db
from sqlalchemy import orm as so
from alchemical import Model
from werkzeug.security import generate_password_hash


class User(Model):
    __tablename__ = "users"

    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    username: so.Mapped[str] = so.mapped_column(sa.String(64), index=True, unique=True)
    email: so.Mapped[str] = so.mapped_column(sa.String(120), index=True, unique=True)
    password_hash: so.Mapped[Optional[str]] = so.mapped_column(sa.String(256))

    @property
    def has_password(self):
        return self.password_hash is not None

    @property
    def password(self):
        raise AttributeError("passwordis not a readable attribute")

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)
