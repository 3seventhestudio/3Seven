from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

from .selectors.user_selector import UserSelector


class RegisterValidator:
    """
    Business validations for user registration.
    """

    @staticmethod
    def validate_email(email: str):
        if UserSelector.get_user_by_email(email):
            raise ValidationError("An account with this email already exists.")

    @staticmethod
    def validate_phone(phone_number: str):
        if UserSelector.get_user_by_phone(phone_number):
            raise ValidationError("An account with this phone number already exists.")

    @staticmethod
    def validate_user_password(password: str):
        validate_password(password)