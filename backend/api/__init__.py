"""
Welcome to the documentation for the Shamiri Journaling API!

This project is written in Python, with the
[Flask](https://flask.palletsprojects.com/) web framework. This documentation
is generated automatically from the
[project's source code](https://github.com/AMuriuki/shamiri-journaling/tree/main/backend) using
the [APIFairy](https://github.com/miguelgrinberg/apifairy) Flask extension.

## Introduction

Shamiri-API is an easy to use web API for creating journal entries. The API provides a fully
implemented back end that you can integrate against using a client of choice.

Shamiri-API provides all the base features required to implement a
journalling app:

- User authentication - login and logout support
- Journal entry management

## Configuration
To run the API these are the environment variables that you may need to set to configure the API's
behavior. The variables can be defined directly in the environment or in a
`.env` file in the project directory. The following table lists all the
environment variables that are currently used:

| Environment Variable | Default | Description |
| - | - | - |
| `SECRET_KEY` | `top-secret!` | A secret key used when signing tokens. |
| `DATABASE_URL`  | `sqlite:///db.sqlite` | The database URL, as defined by the [SQLAlchemy](https://docs.sqlalchemy.org/en/14/core/engines.html#database-urls) framework. |
| `SQL_ECHO` | not defined | Whether to echo SQL statements to the console for debugging purposes. |
| `USE_CORS` | `yes` | Whether to allow cross-origin requests. If allowed, CORS support can be configured or customized with options provided by the Flask-CORS extension. |
| `DOCS_UI` | `elements` | The UI library to use for the documentation. Allowed values are `swagger_ui`, `redoc`, `rapidoc` and `elements`. |

## Authentication

The authentication flow for this API is based on *access* tokens with provision for *refresh*
tokens capabilities.

To obtain an access and refresh token pair, the client must send a `POST`
request to the `/api/tokens` endpoint, passing the email and password of
the user in a `Authorization` header, according to HTTP Basic Authentication
scheme. The response includes the access and refresh tokens in the body. 

Most endpoints in this API are authenticated with the access token, passed
in the `Authorization` header, using the `Bearer` scheme.

Access tokens are valid for 60 minutes (by default) from the time they are
issued.

All authentication failures are handled with a `401` status code in the
response.
"""

from api.app import create_app, db, ma
from api import models
