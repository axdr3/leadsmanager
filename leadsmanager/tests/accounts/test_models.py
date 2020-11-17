import pytest

from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.mark.django_db
def test_register_user():
    # Given
    payload = {"email": "test@example.com", "username": "Tão", "password": "test"}

    # When
    user = User.objects.create_user(
        payload["username"], payload["password"], payload["email"]
    )

    # Then
    assert User.objects.all().count() == 1
    assert User.objects.filter(username=payload["username"]).get() == user
