import pytest
from rest_framework.test import APIClient

# from  import RefreshToken
from django.contrib.auth import get_user_model

User = get_user_model()


# @pytest.fixture
# def api_client():
#     payload = {"email": "test@example.com", "username": "Tão", "password": "test"}

#     user = User.objects.create_user(
#         username=payload["username"],
#         password=payload["password"],
#         email=payload["email"],
#     )
#     client = APIClient()
#     refresh = RefreshToken.for_user(user)
#     client.credentials(HTTP_AUTHORIZATION=f"Token {refresh.access_token}")

#     return client


@pytest.fixture
@pytest.mark.django_db
def regusers():
    # Given
    payload = {"email": "test@example.com", "username": "Tão", "password": "test"}

    # When
    user = User.objects.create_user(
        username=payload["username"],
        password=payload["password"],
        email=payload["email"],
    )
    return user


@pytest.mark.django_db
def test_register_user(client):
    payload = {"username": "tst", "password": "Test12345", "email": "test@example.com"}

    response = client.post(
        "/api/auth/register/", data=payload, content_type="application/json"
    )

    assert response.status_code == 201 or 200
    assert "tst" in response.data["user"].values()
    assert "test@example.com" in response.data["user"].values()
    assert User.objects.filter(username="tst").exists()


@pytest.mark.django_db
def test_login_user(client, regusers):

    api_client = APIClient()
    response = client.post(
        "/api/auth/login/",
        data={"username": "Tão", "password": "test"},
        content_type="application/json",
    )
    access_token = response.json().get("token")
    print(access_token)
    api_client.credentials(HTTP_AUTHORIZATION=f"Token {access_token}")
    response = api_client.get("/api/auth/user/", content_type="application/json")
    assert response.status_code == 200
    assert "Tão" in response.data["username"]
