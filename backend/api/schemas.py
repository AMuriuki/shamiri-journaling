from api import ma, db
from api.models import User
from marshmallow import validate, validates, ValidationError


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User

    id = ma.auto_field(dump_only=True)
    username = ma.auto_field(required=True, validate=validate.Length(min=3, max=64))
    email = ma.auto_field(
        required=True, validate=[validate.Length(max=120), validate.Email()]
    )
    password = ma.String(required=True, load_only=True, validate=validate.Length(min=3))
    has_password = ma.Boolean(dump_only=True)

    @validates('username')
    def validate_username(self, value):
        if not value[0].isalpha():
            raise ValidationError('Username must start with a letter')
        if db.session.scalar(User.select().filter_by(username=value)):
            raise ValidationError('This username is taken, use a different one.')
    
    @validates('email')
    def validate_email(self, value):
        if db.session.scalar(User.select().filter_by(email=value)):
            raise ValidationError('A user with this email already exists. Please use a different one.')
