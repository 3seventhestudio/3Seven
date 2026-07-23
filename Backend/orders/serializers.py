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

class AdminOrderListSerializer(serializers.ModelSerializer):
    customer = serializers.SerializerMethodField()
    total_items = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            "id",
            "order_number",
            "customer",
            "status",
            "payment_status",
            "payment_method",
            "grand_total",
            "total_items",
            "tracking_number",
            "created_at",
        ]

    def get_customer(self, obj):
        full_name = f"{obj.user.first_name} {obj.user.last_name}".strip()
        return full_name if full_name else obj.user.email

    def get_total_items(self, obj):
        return obj.items.count()


class AdminOrderDetailSerializer(serializers.ModelSerializer):
    customer = serializers.SerializerMethodField()
    items = serializers.SerializerMethodField()
    shipping_address = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = "__all__"

    def get_customer(self, obj):
        full_name = f"{obj.user.first_name} {obj.user.last_name}".strip()

        return {
            "name": full_name if full_name else obj.user.email,
            "email": obj.user.email,
            "phone": obj.user.phone,
        }

    def get_shipping_address(self, obj):
        address = obj.shipping_address

        return {
            "name": address.full_name,
            "phone": address.phone,
            "address_line_1": address.address_line_1,
            "address_line_2": address.address_line_2,
            "city": address.city,
            "state": address.state,
            "postal_code": address.postal_code,
            "country": address.country,
        }

    def get_items(self, obj):
        return [
            {
                "id": item.id,
                "product_name": item.product_name,
                "sku": item.sku,
                "size": item.size,
                "color": item.color,
                "quantity": item.quantity,
                "unit_price": item.unit_price,
                "total_price": item.total_price,
            }
            for item in obj.items.all()
        ]


class AdminOrderUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            "status",
            "payment_status",
            "tracking_number",
            "tracking_url",
            "courier_name",
            "courier_service",
            "shipping_provider",
            "shipment_id",
            "shipping_label",
            "notes",
        ]