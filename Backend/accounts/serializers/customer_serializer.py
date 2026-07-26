from rest_framework import serializers

from accounts.models import User


class AdminCustomerListSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    total_orders = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "full_name",
            "email",
            "phone",
            "is_active",
            "date_joined",
            "total_orders",
        ]

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip()

    def get_total_orders(self, obj):
        return obj.orders.count()


class AdminCustomerDetailSerializer(serializers.ModelSerializer):
    total_orders = serializers.SerializerMethodField()

    class Meta:
        model = User
        exclude = [
            "password",
            "groups",
            "user_permissions",
        ]

    def get_total_orders(self, obj):
        return obj.orders.count()


class AdminCustomerUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "phone",
            "is_active",
        ]