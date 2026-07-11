from rest_framework import serializers

from accounts.models import Address


class AddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = [
            "id",
            "full_name",
            "phone_number",
            "address_line_1",
            "address_line_2",
            "landmark",
            "city",
            "state",
            "country",
            "postal_code",
            "address_type",
            "is_default",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]


class CreateUpdateAddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = [
            "full_name",
            "phone_number",
            "address_line_1",
            "address_line_2",
            "landmark",
            "city",
            "state",
            "country",
            "postal_code",
            "address_type",
            "is_default",
        ]

    def validate_phone_number(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("Phone number must contain only digits.")

        if len(value) < 10 or len(value) > 15:
            raise serializers.ValidationError("Phone number must be between 10 and 15 digits.")

        return value

    def validate_postal_code(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("Postal code must contain only digits.")

        return value