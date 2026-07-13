from django.db import models

from accounts.models import Address, User
from catalog.models import ProductVariant
from common.models import BaseModel


class Order(BaseModel):

    PAYMENT_PENDING = "PAYMENT_PENDING"
    PAYMENT_SUCCESS = "PAYMENT_SUCCESS"
    PAYMENT_FAILED = "PAYMENT_FAILED"
    PAYMENT_REFUNDED = "PAYMENT_REFUNDED"

    PAYMENT_STATUS = (
        (PAYMENT_PENDING, "Payment Pending"),
        (PAYMENT_SUCCESS, "Payment Success"),
        (PAYMENT_FAILED, "Payment Failed"),
        (PAYMENT_REFUNDED, "Payment Refunded"),
    )

    PENDING = "PENDING"
    CONFIRMED = "CONFIRMED"
    PROCESSING = "PROCESSING"
    SHIPPED = "SHIPPED"
    DELIVERED = "DELIVERED"
    CANCELLED = "CANCELLED"
    RETURNED = "RETURNED"

    STATUS_CHOICES = (
        (PENDING, "Pending"),
        (CONFIRMED, "Confirmed"),
        (PROCESSING, "Processing"),
        (SHIPPED, "Shipped"),
        (DELIVERED, "Delivered"),
        (CANCELLED, "Cancelled"),
        (RETURNED, "Returned"),
    )

    ONLINE = "ONLINE"
    COD = "COD"

    PAYMENT_METHODS = (
        (ONLINE, "Online"),
        (COD, "Cash On Delivery"),
    )

    user = models.ForeignKey(User, on_delete=models.PROTECT, related_name="orders")
    address = models.ForeignKey(Address, on_delete=models.PROTECT)
    order_number = models.CharField(max_length=30, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=PENDING)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS)
    payment_status = models.CharField(max_length=30, choices=PAYMENT_STATUS, default=PAYMENT_PENDING)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_charge = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    notes = models.TextField(blank=True)
    shipping_provider = models.CharField(max_length=100, blank=True)
    courier_name = models.CharField(max_length=100, blank=True)
    courier_service = models.CharField(max_length=100, blank=True)
    courier_service_code = models.CharField(max_length=100, blank=True)
    shipment_id = models.CharField(max_length=100, blank=True)
    tracking_number = models.CharField(max_length=100, blank=True)
    tracking_url = models.URLField(blank=True)
    shipping_label = models.URLField(blank=True)
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    class Meta:
        db_table = "orders"
        ordering = ("-created_at",)

    def __str__(self):
        return self.order_number


class OrderItem(BaseModel):

    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product_variant = models.ForeignKey(ProductVariant, on_delete=models.PROTECT, related_name="order_items")
    product_name = models.CharField(max_length=255)
    sku = models.CharField(max_length=100)
    size = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = "order_items"

    def __str__(self):
        return f"{self.order.order_number} - {self.product_name}"