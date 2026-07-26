from accounts.models import User
from accounts.selectors.user_selector import AdminCustomerSelector


class AdminCustomerService:

    @staticmethod
    def get_customers(filters=None):
        return AdminCustomerSelector.get_customers(filters)

    @staticmethod
    def get_customer(customer_id):
        return AdminCustomerSelector.get_customer(customer_id)

    @staticmethod
    def update_customer(customer, validated_data):
        for field, value in validated_data.items():
            setattr(customer, field, value)

        customer.save()
        return customer