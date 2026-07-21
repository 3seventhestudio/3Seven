import uuid

from django.db import models
from django.utils import timezone

from .managers import ActiveManager, AllObjectsManager


class BaseModel(models.Model):
    """
    Abstract base model used by all models.
    """

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    is_active = models.BooleanField(
        default=True
    )

    is_deleted = models.BooleanField(
        default=False
    )

    deleted_at = models.DateTimeField(
        blank=True,
        null=True
    )

    objects = ActiveManager()
    all_objects = AllObjectsManager()

    class Meta:
        abstract = True
        ordering = ["-created_at"]

    def soft_delete(self):
        """
        Soft delete the record.
        """
        self.is_deleted = True
        self.is_active = False
        self.deleted_at = timezone.now()

        self.save(
            update_fields=[
                "is_deleted",
                "is_active",
                "deleted_at",
            ]
        )

    def restore(self):
        """
        Restore a soft deleted record.
        """
        self.is_deleted = False
        self.is_active = True
        self.deleted_at = None

        self.save(
            update_fields=[
                "is_deleted",
                "is_active",
                "deleted_at",
            ]
        )

    def __str__(self):
        return str(self.id)


class StoreSettings(models.Model):
    """
    Singleton model that stores all global business configuration.

    Only one record should ever exist (Primary Key = 1).
    """

    # ==========================
    # Store Information
    # ==========================

    store_name = models.CharField(
        max_length=150,
        default="3Seven Studio"
    )

    currency = models.CharField(
        max_length=10,
        default="INR"
    )

    support_email = models.EmailField(
        blank=True
    )

    support_phone = models.CharField(
        max_length=20,
        blank=True
    )

    maintenance_mode = models.BooleanField(
        default=False
    )

    # ==========================
    # Tax Configuration
    # ==========================

    gst_enabled = models.BooleanField(
        default=False
    )

    gst_percentage = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=0
    )

    # ==========================
    # Shipping Configuration
    # ==========================

    free_shipping = models.BooleanField(
        default=True
    )

    shipping_charge = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    # ==========================
    # Cash On Delivery
    # ==========================

    cod_enabled = models.BooleanField(
        default=True
    )

    cod_charge = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    # ==========================
    # Coupon Configuration
    # ==========================

    coupon_enabled = models.BooleanField(
        default=False
    )

    # ==========================
    # Payment Configuration
    # ==========================

    payment_gateway_enabled = models.BooleanField(
        default=False
    )

    PAYMENT_GATEWAY_CHOICES = [
        ("none", "None"),
        ("razorpay", "Razorpay"),
        ("cashfree", "Cashfree"),
        ("phonepe", "PhonePe"),
        ("payu", "PayU"),
        ("stripe", "Stripe"),
    ]

    payment_gateway = models.CharField(
        max_length=30,
        choices=PAYMENT_GATEWAY_CHOICES,
        default="none"
    )

    upi_enabled = models.BooleanField(
        default=True
    )

    card_enabled = models.BooleanField(
        default=False
    )

    wallet_enabled = models.BooleanField(
        default=False
    )

    netbanking_enabled = models.BooleanField(
        default=False
    )

    # These are optional placeholders.
    # In production we will read secrets from .env.
    payment_gateway_key = models.CharField(
        max_length=255,
        blank=True
    )

    payment_gateway_secret = models.CharField(
        max_length=255,
        blank=True
    )

    webhook_secret = models.CharField(
        max_length=255,
        blank=True
    )

    # ==========================
    # Audit
    # ==========================

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        verbose_name = "Store Settings"
        verbose_name_plural = "Store Settings"

    def save(self, *args, **kwargs):
        """
        Ensure only one StoreSettings row exists.
        """
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        """
        Prevent accidental deletion.
        """
        pass

    @classmethod
    def load(cls):
        """
        Returns the singleton instance.
        Creates it automatically if it doesn't exist.
        """
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return self.store_name