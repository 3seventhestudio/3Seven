from accounts.models import Address


class AddressSelector:

    @staticmethod
    def get_addresses(user):
        return Address.objects.filter(user=user).order_by("-is_default", "-created_at")

    @staticmethod
    def get_address(user, address_id):
        return Address.objects.get(user=user, pk=address_id)