from api import ma, db
from api.models import User
from marshmallow import validate, post_dump


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User

    id = ma.auto_field(dump_only=True)
    username = ma.auto_field(required=True, validate=validate.Length(min=3, max=64))
    email = ma.auto_field(
        required=True, validate=[validate.Length(max=120), validate.Email()]
    )
    
