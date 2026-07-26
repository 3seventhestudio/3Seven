from rest_framework import serializers

from accounts.serializers.address import AddressSerializer
from orders.models import Order, OrderItem, PaymentMethod
from reviews.models import Review


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

    coupon_code = serializers.CharField(
        required=False,
        allow_blank=True,
        default=None,
    )


class OrderItemSerializer(serializers.ModelSerializer):
    product_slug = serializers.SerializerMethodField()
    product_image = serializers.SerializerMethodField()
    can_review = serializers.SerializerMethodField()
    is_reviewed = serializers.SerializerMethodField()
    review_id = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = (
            "id",
            "product_name",
            "product_slug",
            "product_image",
            "sku",
            "size",
            "color",
            "quantity",
            "unit_price",
            "total_price",
            "can_review",
            "is_reviewed",
            "review_id",
        )

    def get_product_slug(self, obj):
        return obj.product_variant.product.slug

    def get_product_image(self, obj):
        image = obj.product_variant.product.images.filter(
            is_deleted=False
        ).order_by("display_order").first()

        return image.image.url if image else ""

    def get_can_review(self, obj):
        return obj.order.status in [
            "delivered",
            "completed",
        ]

    def get_is_reviewed(self, obj):
        return Review.objects.filter(
            order_item=obj,
            is_deleted=False,
        ).exists()

    def get_review_id(self, obj):
        review = Review.objects.filter(
            order_item=obj,
            is_deleted=False,
        ).first()

        return str(review.id) if review else None


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
            "courier_name",
            "tracking_number",
            "tracking_url",
            "shipping_label",
            "shipment_id",
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
            "phone": obj.user.phone_number,
        }

    def get_shipping_address(self, obj):
        address = obj.shipping_address

        return {
            "name": address.full_name,
            "phone": address.phone_number,
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
                "product_slug": item.product_variant.product.slug,
                "product_image": (
                    item.product_variant.product.images.order_by(
                        "display_order"
                    ).first().image.url
                    if item.product_variant.product.images.exists()
                    else ""
                ),
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