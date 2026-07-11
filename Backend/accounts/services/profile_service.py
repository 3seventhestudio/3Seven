from django.db import transaction


class ProfileService:

    @staticmethod
    @transaction.atomic
    def update_profile(user, validated_data):
        phone_changed = False

        if "phone_number" in validated_data:
            if user.phone_number != validated_data["phone_number"]:
                phone_changed = True

        for field, value in validated_data.items():
            setattr(user, field, value)

        if phone_changed:
            user.email_verified = False

        user.save()

        return user