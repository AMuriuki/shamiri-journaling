from tests.base_test_case import BaseTestCase


class UserTestts(BaseTestCase):
    def test_create_user(self):
        # Test Case: Create a new user with valid data
        rv = self.client.post(
            "/api/new-user",
            json={"username": "user", "email": "user@example.com", "password": "dog"},
        )
        assert rv.status_code == 201  # Assert that user is created

        user_id = rv.json["id"]

        # Test Case: Create a new user with same username as an existing user
        rv = self.client.post(
            "/api/new-user",
            json={"username": "user", "email": "user2@example.com", "password": "dog"},
        )
        assert rv.status_code == 400  # Assert that request failed

        # Test Case: Create a new user with same email as an existing user
        rv = self.client.post(
            "/api/new-user",
            json={"username": "user2", "email": "user@example.com", "password": "dog"},
        )
        assert rv.status_code == 400  # Assert that request failed
