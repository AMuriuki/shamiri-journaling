from api import ma, db
from api.models import User, Entry, Category
from marshmallow import (
    post_dump,
    validate,
    validates,
    ValidationError,
    validates_schema,
)

paginated_schema_cache = {}


class DateTimePaginationSchema(ma.Schema):
    class Meta:
        ordered = True

    limit = ma.Integer()
    offset = ma.Integer()
    after = ma.DateTime(load_only=True)
    count = ma.Integer(dump_only=True)
    total = ma.Integer(dump_only=True)

    @validates_schema
    def validate_schema(self, data, **kwargs):
        if data.get("offset") is not None and data.get("after") is not None:
            raise ValidationError("Cannot specify both offset and after")


class EmptySchema(ma.Schema):
    pass


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
        ordered = True

    id = ma.auto_field(dump_only=True)
    username = ma.auto_field(required=True, validate=validate.Length(min=3, max=64))
    email = ma.auto_field(
        required=True, validate=[validate.Length(max=120), validate.Email()]
    )
    password = ma.String(required=True, load_only=True, validate=validate.Length(min=3))
    entries_url = ma.URLFor("entries.user_all", values={"id": "<id>"}, dump_only=True)

    @validates("username")
    def validate_username(self, value):
        if not value[0].isalpha():
            raise ValidationError("Username must start with a letter")
        if db.session.scalar(User.select().filter_by(username=value)):
            raise ValidationError("This username is taken, use a different one.")

    @validates("email")
    def validate_email(self, value):
        if db.session.scalar(User.select().filter_by(email=value)):
            raise ValidationError(
                "A user with this email already exists. Please use a different one."
            )


class TokenSchema(ma.Schema):
    class Meta:
        ordered = True

    access_token = ma.String(required=True)
    refresh_token = ma.String()


class CategorySchema(ma.SQLAlchemySchema):
    class Meta:
        model = Category
        ordered = True

    id = ma.auto_field(dump_only=True)
    url = ma.String(dump_only=True)
    title = ma.auto_field(required=True, validate=validate.Length(min=1, max=280))
    # entries_url = ma.URLFor("entries.user_all", values={"id": "<id>"}, dump_only=True)


class EntrySchema(ma.SQLAlchemySchema):
    class Meta:
        model = Entry
        include_fk = True
        ordered = True

    id = ma.auto_field(dump_only=True)
    url = ma.String(dump_only=True)
    content = ma.auto_field(required=True, validate=validate.Length(min=1))
    title = ma.auto_field(required=True, validate=validate.Length(min=1, max=280))
    category_id = ma.auto_field()
    timestamp = ma.auto_field()
    category = ma.Nested(CategorySchema, dump_only=True)
    author = ma.Nested(UserSchema, dump_only=True)

    @post_dump
    def fix_datetimes(self, data, **kwargs):
        data["timestamp"] += "Z"
        return data


class StringPaginationSchema(ma.Schema):
    class Meta:
        ordered = True

    limit = ma.Integer()
    offset = ma.Integer()
    after = ma.String(load_only=True)
    count = ma.Integer(dump_only=True)
    total = ma.Integer(dump_only=True)

    @validates_schema
    def validate_schema(self, data, **kwargs):
        if data.get("offset") is not None and data.get("after") is not None:
            raise ValidationError("Cannot specify both offset and after")


def PaginatedCollection(schema, pagination_schema=StringPaginationSchema):
    if schema in paginated_schema_cache:
        return paginated_schema_cache[schema]

    class PaginatedSchema(ma.Schema):
        class Meta:
            ordered = True

        pagination = ma.Nested(pagination_schema)
        data = ma.Nested(schema, many=True)

    PaginatedSchema.__name__ = "Paginated{}".format(schema.__class__.__name__)
    paginated_schema_cache[schema] = PaginatedSchema
    return PaginatedSchema
