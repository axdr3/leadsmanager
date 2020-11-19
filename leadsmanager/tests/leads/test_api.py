import pytest
import json

# from leads.models import Lead
from rest_framework.test import APIClient

from django.contrib.auth import get_user_model

User = get_user_model()


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


@pytest.fixture
@pytest.mark.django_db
def api_client(client, regusers):

    api_client = APIClient()
    response = client.post(
        "/api/auth/login/",
        data={"username": "Tão", "password": "test"},
        content_type="application/json",
    )
    access_token = response.json().get("access_token")

    api_client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")
    response = api_client.get("/api/auth/user/", content_type="application/json")
    return (api_client, access_token, regusers)


@pytest.mark.django_db
def test_add_lead(api_client):

    client, access_token, user = api_client
    # client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")
    payload = {
        "name": "Johnson",
        "email": "johnson@example.com",
        "message": "Hello World",
    }
    response = client.post(
        "/api/leads/", data=json.dumps({**payload}), content_type="application/json",
    )

    assert response.status_code == 201
    assert user.leads.count() == 1
    assert user.leads.first().email == payload["email"]


@pytest.mark.django_db
def test_delete_lead(api_client):

    client, access_token, user = api_client
    # client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")
    payload = {
        "name": "Johnson",
        "email": "johnson@example.com",
        "message": "Hello World",
    }
    response = client.post(
        "/api/leads/", data=json.dumps({**payload}), content_type="application/json",
    )

    response = client.delete("/api/leads/1/", content_type="application/json")
    assert response.status_code == 204
    assert user.leads.count() == 0
    assert user.leads.first() is None


@pytest.mark.django_db
def test_edit_lead(api_client):

    client, access_token, user = api_client
    # client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")
    payload = {
        "name": "Johnson",
        "email": "johnson@example.com",
        "message": "Hello World",
    }
    response = client.post(
        "/api/leads/", data=json.dumps({**payload}), content_type="application/json",
    )
    payload = {
        "name": "JohnsonX",
        "email": "johnsonX@example.com",
        "message": "Goodbye World",
    }
    response = client.put(
        "/api/leads/1/", data=json.dumps({**payload}), content_type="application/json"
    )
    assert response.status_code == 200
    assert user.leads.count() == 1
    assert user.leads.first().email == payload["email"]
