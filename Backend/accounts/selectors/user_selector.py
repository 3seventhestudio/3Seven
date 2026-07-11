from accounts.models import User


class UserSelector:
    """
    Read-only database queries for User.
    """

    @staticmethod
    def get_by_email(email: str):
        return User.objects.filter(email__iexact=email).first()

    @staticmethod
    def get_by_phone(phone_number: str):
        return User.objects.filter(phone_number=phone_number).first()