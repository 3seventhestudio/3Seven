from rest_framework import serializers
from orders.models import Order, OrderItem


class CheckoutSerializer(serializers.Serializer):

    address_id = serializers.UUIDField()

    payment_method = serializers.ChoiceField(
        choices=[
            ("ONLINE", "Online"),
            ("COD", "Cash On Delivery"),
        ]
    )

    notes = serializers.CharField(required=False, allow_blank=True)

class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem
        fields = (
            "id",
            "product_name",
            "sku",
            "size",
            "color",
            "quantity",
            "unit_price",
            "total_price",
        )


class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = (
            "id",
            "order_number",
            "status",
            "payment_method",
            "payment_status",
            "subtotal",
            "shipping_charge",
            "total",
            "tracking_number",
            "tracking_url",
            "created_at",
            "items",
        )