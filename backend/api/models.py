from datetime import datetime, timedelta
import secrets
from typing import Optional
from flask import current_app
import sqlalchemy as sa
from api import db
from sqlalchemy import orm as so
from alchemical import Model
from werkzeug.security import generate_password_hash, check_password_hash
import jwt

from api.dates import naive_utcnow


class Token(Model):
    __tablename__ = "tokens"

    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    access_token: so.Mapped[str] = so.mapped_column(sa.String(64), index=True)
    access_expiration: so.Mapped[datetime]
    refresh_token: so.Mapped[str] = so.mapped_column(sa.String(64), index=True)
    refresh_expiration: so.Mapped[datetime]
    user_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey("users.id"), index=True)
    user: so.Mapped["User"] = so.relationship(back_populates="tokens")

    @property
    def access_token_jwt(self):
        return jwt.encode(
            {"token": self.access_token},
            current_app.config["SECRET_KEY"],
            algorithm="HS256",
        )

    def generate(self):
        self.access_token = secrets.token_urlsafe()
        self.access_expiration = naive_utcnow() + timedelta(
            minutes=current_app.config["ACCESS_TOKEN_MINUTES"]
        )
        self.refresh_token = secrets.token_urlsafe()
        self.refresh_expiration = naive_utcnow() + timedelta(
            days=current_app.config["REFRESH_TOKEN_DAYS"]
        )

    @staticmethod
    def clean():
        """Remove any tokens that have been expired for more than a day"""
        yesterday = naive_utcnow() - timedelta(days=1)
        db.session.execute(Token.delete().where(Token.refresh_expiration < yesterday))

    @staticmethod
    def from_jwt(access_token_jwt):
        access_token = None
        try:
            access_token = jwt.decode(
                access_token_jwt, current_app.config["SECRET_KEY"], algorithms=["HS256"]
            )["token"]
            return db.session.scalar(
                Token.select().filter_by(access_token=access_token)
            )
        except jwt.PyJWTError:
            pass

    def expire(self, delay=None):
        if delay is None:  # pragma: no branch
            # 5 second delay to allow simultaneous requests
            delay = 5 if not current_app.testing else 0
        self.access_expiration = naive_utcnow() + timedelta(seconds=delay)
        self.refresh_expiration = naive_utcnow() + timedelta(seconds=delay)


class User(Model):
    __tablename__ = "users"

    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    username: so.Mapped[str] = so.mapped_column(sa.String(64), index=True, unique=True)
    email: so.Mapped[str] = so.mapped_column(sa.String(120), index=True, unique=True)
    password_hash: so.Mapped[Optional[str]] = so.mapped_column(sa.String(256))
    tokens: so.WriteOnlyMapped["Token"] = so.relationship(back_populates="user")
    entries: so.WriteOnlyMapped["Entry"] = so.relationship(back_populates="author")

    @property
    def password(self):
        raise AttributeError("passwordis not a readable attribute")

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def generate_auth_token(self):
        token = Token(user=self)
        token.generate()
        return token

    def verify_password(self, password):
        if self.password_hash:
            return check_password_hash(self.password_hash, password)

    @staticmethod
    def verify_access_token(access_token_jwt, refresh_token=None):
        token = Token.from_jwt(access_token_jwt)
        if token:
            if token.access_expiration > naive_utcnow():
                return token.user


class Category(Model):
    __tablename__ = "categories"

    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    title: so.Mapped[str] = so.mapped_column(sa.String(120))
    entries: so.WriteOnlyMapped["Entry"] = so.relationship(back_populates="category")


class Entry(Model):
    __tablename__ = "entries"

    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    content: so.Mapped[str] = so.mapped_column(sa.Text())
    title: so.Mapped[str] = so.mapped_column(sa.String(120))
    timestamp: so.Mapped[datetime] = so.mapped_column(index=True, default=naive_utcnow)
    user_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(User.id), index=True)
    category_id: so.Mapped[int] = so.mapped_column(
        sa.ForeignKey(Category.id), index=True
    )

    author: so.Mapped["User"] = so.relationship(back_populates="entries")
    category: so.Mapped["Category"] = so.relationship(back_populates="entries")
