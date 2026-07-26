import uuid

from django.conf import settings
from django.db import models

from common.models import BaseModel
from catalog.models import ProductVariant
from accounts.models import Address


class OrderStatus(models.TextChoices):
    PENDING = "pending", "Pending"
    CONFIRMED = "confirmed", "Confirmed"
    PROCESSING = "processing", "Processing"
    SHIPPED = "shipped", "Shipped"
    DELIVERED = "delivered", "Delivered"
    CANCELLED = "cancelled", "Cancelled"
    RETURNED = "returned", "Returned"
    REFUNDED = "refunded", "Refunded"


class PaymentStatus(models.TextChoices):
    PENDING = "pending", "Pending"
    PAID = "paid", "Paid"
    FAILED = "failed", "Failed"
    REFUNDED = "refunded", "Refunded"


class PaymentMethod(models.TextChoices):
    COD = "cod", "Cash On Delivery"
    UPI = "upi", "UPI"
    CARD = "card", "Card"
    NETBANKING = "netbanking", "Net Banking"
    RAZORPAY = "razorpay", "Razorpay / Online Payment"


class Order(BaseModel):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="orders",
    )

    order_number = models.CharField(
        max_length=30,
        unique=True,
    )

    status = models.CharField(
        max_length=20,
        choices=OrderStatus.choices,
        default=OrderStatus.PENDING,
    )

    payment_status = models.CharField(
        max_length=20,
        choices=PaymentStatus.choices,
        default=PaymentStatus.PENDING,
    )

    payment_method = models.CharField(
        max_length=20,
        choices=PaymentMethod.choices,
    )

    shipping_address = models.ForeignKey(
        Address,
        on_delete=models.PROTECT,
        related_name="shipping_orders",
    )

    subtotal = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0,
    )

    shipping_charge = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
    )

    cod_charge = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
    )

    tax_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
    )

    discount_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
    )

    grand_total = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0,
    )

    notes = models.TextField(
        blank=True,
    )

        # ==========================
    # Courier / Shipping
    # ==========================

    courier_service = models.CharField(
        max_length=100,
        blank=True,
    )

    courier_service_code = models.CharField(
        max_length=100,
        blank=True,
    )

    shipping_provider = models.CharField(
        max_length=100,
        blank=True,
    )

    courier_name = models.CharField(
        max_length=100,
        blank=True,
    )

    shipment_id = models.CharField(
        max_length=100,
        blank=True,
    )

    tracking_number = models.CharField(
        max_length=100,
        blank=True,
    )

    tracking_url = models.URLField(
        blank=True,
    )

    shipping_label = models.URLField(
        blank=True,
    )

    actual_shipping_cost = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
    )

    class Meta:
        ordering = ["-created_at"]
        db_table = "orders"

    def __str__(self):
        return self.order_number


class OrderItem(BaseModel):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items",
    )

    product_variant = models.ForeignKey(
        ProductVariant,
        on_delete=models.PROTECT,
    )

    product_name = models.CharField(
        max_length=255,
    )

    sku = models.CharField(
        max_length=100,
    )

    color = models.CharField(
        max_length=100,
        blank=True,
    )

    size = models.CharField(
        max_length=50,
        blank=True,
    )

    quantity = models.PositiveIntegerField()

    unit_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    total_price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
    )

    class Meta:
        db_table = "order_items"

    def __str__(self):
        return f"{self.product_name} ({self.quantity})"


class OrderStatusHistory(BaseModel):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="status_history",
    )

    status = models.CharField(
        max_length=20,
        choices=OrderStatus.choices,
    )

    comment = models.TextField(
        blank=True,
    )

    class Meta:
        ordering = ["created_at"]
        db_table = "order_status_history"

    def __str__(self):
        return f"{self.order.order_number} - {self.status}"