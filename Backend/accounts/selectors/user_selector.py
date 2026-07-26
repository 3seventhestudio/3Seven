from accounts.models import User
from django.db.models import Q


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

class AdminCustomerSelector:

    @staticmethod
    def base_queryset():
        return User.objects.all()

    @classmethod
    def get_customers(cls, filters=None):
        queryset = cls.base_queryset()

        if filters:
            search = filters.get("search")
            is_active = filters.get("is_active")

            if search:
                queryset = queryset.filter(
                    Q(first_name__icontains=search)
                    | Q(last_name__icontains=search)
                    | Q(email__icontains=search)
                    | Q(phone__icontains=search)
                )

            if is_active not in [None, ""]:
                queryset = queryset.filter(
                    is_active=str(is_active).lower() == "true"
                )

        return queryset.order_by("-date_joined")

    @classmethod
    def get_customer(cls, customer_id):
        return cls.base_queryset().get(pk=customer_id)