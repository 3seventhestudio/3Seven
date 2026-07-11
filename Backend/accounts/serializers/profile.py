from rest_framework import serializers

from accounts.models import User


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "phone_number",
            "email_verified",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "email",
            "email_verified",
            "created_at",
            "updated_at",
        ]


class UpdateProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "phone_number",
        ]

    def validate_phone_number(self, value):
        user = self.instance

        exists = User.objects.filter(phone_number=value).exclude(pk=user.pk).exists()

        if exists:
            raise serializers.ValidationError("Phone number already exists.")

        return value