from django.contrib.auth import authenticate
from django.db import transaction
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.models import User
from accounts.selectors.user_selector import UserSelector


class AuthService:
    """
    Business logic related to authentication.
    """

    @staticmethod
    @transaction.atomic
    def register_user(validated_data):
        """
        Register a new user.
        """

        data = validated_data.copy()

        data.pop("confirm_password")

        password = data.pop("password")

        data["email"] = data["email"].strip().lower()

        user = User.objects.create(**data)

        user.set_password(password)

        user.save(update_fields=["password"])

        return user

    @staticmethod
    def login_user(email: str, password: str):
        email = email.strip().lower()

        user = UserSelector.get_by_email(email)

        if user is None:
            return None

        if not check_password(password, user.password):
            return None

        refresh = RefreshToken.for_user(user)

        return {
            "user": user,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }