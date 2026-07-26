import uuid
from django.db import models
from common.models import BaseModel
from orders.models import Order


class PaymentTransaction(BaseModel):
    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        SUCCESS = "success", "Success"
        FAILED = "failed", "Failed"

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="payment_transactions",
    )

    payment_gateway = models.CharField(
        max_length=50,
        default="razorpay",
    )

    razorpay_order_id = models.CharField(
        max_length=100,
        blank=True,
    )

    razorpay_payment_id = models.CharField(
        max_length=100,
        blank=True,
    )

    razorpay_signature = models.CharField(
        max_length=255,
        blank=True,
    )

    amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
    )

    currency = models.CharField(
        max_length=10,
        default="INR",
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
    )

    error_code = models.CharField(
        max_length=100,
        blank=True,
    )

    error_description = models.TextField(
        blank=True,
    )

    class Meta:
        db_table = "payment_transactions"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.payment_gateway} - {self.order.order_number} ({self.status})"
