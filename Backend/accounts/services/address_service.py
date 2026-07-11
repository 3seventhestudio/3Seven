from django.db import transaction

from accounts.models import Address


class AddressService:

    @staticmethod
    @transaction.atomic
    def create_address(user, validated_data):

        is_default = validated_data.get("is_default", False)

        if is_default:
            Address.objects.filter(user=user, is_default=True).update(is_default=False)

        elif not Address.objects.filter(user=user).exists():
            validated_data["is_default"] = True

        return Address.objects.create(user=user, **validated_data)

    @staticmethod
    @transaction.atomic
    def update_address(address, validated_data):

        is_default = validated_data.get("is_default", address.is_default)

        if is_default:
            Address.objects.filter(user=address.user, is_default=True).exclude(pk=address.pk).update(is_default=False)

        for field, value in validated_data.items():
            setattr(address, field, value)

        address.save()

        return address

    @staticmethod
    @transaction.atomic
    def delete_address(address):

        user = address.user
        was_default = address.is_default

        address.delete()

        if was_default:
            next_address = Address.objects.filter(user=user).order_by("-created_at").first()

            if next_address:
                next_address.is_default = True
                next_address.save(update_fields=["is_default"])

    @staticmethod
    @transaction.atomic
    def set_default(address):

        Address.objects.filter(user=address.user, is_default=True).exclude(pk=address.pk).update(is_default=False)

        address.is_default = True
        address.save(update_fields=["is_default"])

        return address