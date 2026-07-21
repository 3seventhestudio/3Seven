from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers


class ChangePasswordSerializer(serializers.Serializer):

    current_password = serializers.CharField(write_only=True)

    new_password = serializers.CharField(
        write_only=True,
        validators=[validate_password],
    )

    confirm_password = serializers.CharField(write_only=True)

    def validate(self, attrs):

        if attrs["new_password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                {
                    "confirm_password":
                        "Passwords do not match."
                }
            )

        return attrs