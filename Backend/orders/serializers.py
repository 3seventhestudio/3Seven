from rest_framework import serializers

from accounts.serializers.address import AddressSerializer
from orders.models import Order, OrderItem, PaymentMethod


class CheckoutSerializer(serializers.Serializer):
    """
    Checkout request serializer.

    Frontend sends only:
    - Shipping Address
    - Payment Method
    - Notes (optional)

    All pricing, stock validation and order creation
    happen on the server.
    """

    address_id = serializers.UUIDField()

    payment_method = serializers.ChoiceField(
        choices=PaymentMethod.choices,
    )

    notes = serializers.CharField(
        required=False,
        allow_blank=True,
        default="",
    )


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

    items = OrderItemSerializer(
        many=True,
        read_only=True,
    )

    shipping_address = AddressSerializer(
        read_only=True,
    )

    gst = serializers.DecimalField(
        source="tax_amount",
        max_digits=10,
        decimal_places=2,
        read_only=True,
    )

    discount = serializers.DecimalField(
        source="discount_amount",
        max_digits=10,
        decimal_places=2,
        read_only=True,
    )

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
            "cod_charge",
            "gst",
            "discount",
            "grand_total",

            "tracking_number",
            "tracking_url",

            "created_at",

            "shipping_address",

            "items",
        )