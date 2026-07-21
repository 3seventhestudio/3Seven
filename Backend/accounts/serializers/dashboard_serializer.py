from rest_framework import serializers

from orders.serializers import OrderSerializer


class DashboardProfileSerializer(serializers.Serializer):

    first_name = serializers.CharField()

    last_name = serializers.CharField()

    email = serializers.EmailField()


class DashboardStatsSerializer(serializers.Serializer):

    total_orders = serializers.IntegerField()

    pending_orders = serializers.IntegerField()

    saved_addresses = serializers.IntegerField()


class DashboardSerializer(serializers.Serializer):

    profile = DashboardProfileSerializer()

    stats = DashboardStatsSerializer()

    recent_orders = OrderSerializer(many=True)