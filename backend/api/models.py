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


class User(Model):
    __tablename__ = "users"

    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    username: so.Mapped[str] = so.mapped_column(sa.String(64), index=True, unique=True)
    email: so.Mapped[str] = so.mapped_column(sa.String(120), index=True, unique=True)
    password_hash: so.Mapped[Optional[str]] = so.mapped_column(sa.String(256))
    tokens: so.WriteOnlyMapped["Token"] = so.relationship(back_populates="user")

    @property
    def has_password(self):
        return self.password_hash is not None

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
