import uuid

from django.conf import settings
from django.db import models

from common.models import BaseModel
from catalog.models import Category, Product
from orders.models import Order


class CouponType(models.TextChoices):
    PERCENTAGE = "percentage", "Percentage"
    FIXED = "fixed", "Fixed Amount"
    FREE_SHIPPING = "free_shipping", "Free Shipping"


class CouponScope(models.TextChoices):
    ALL = "all", "Entire Store"
    CATEGORY = "category", "Selected Categories"
    PRODUCT = "product", "Selected Products"


class CustomerSelection(models.TextChoices):
    ALL = "all", "All Customers"
    NEW = "new", "New Customers"
    EXISTING = "existing", "Existing Customers"


class Coupon(BaseModel):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    code = models.CharField(
        max_length=50,
        unique=True,
        db_index=True,
    )

    name = models.CharField(
        max_length=150,
    )

    description = models.TextField(
        blank=True,
    )

    discount_type = models.CharField(
        max_length=20,
        choices=CouponType.choices,
    )

    scope = models.CharField(
        max_length=20,
        choices=CouponScope.choices,
        default=CouponScope.ALL,
    )

    discount_value = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    maximum_discount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
    )

    minimum_order_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
    )

    start_date = models.DateTimeField()

    end_date = models.DateTimeField()

    usage_limit = models.PositiveIntegerField(
        default=0,
        help_text="0 = Unlimited",
    )

    usage_per_user = models.PositiveIntegerField(
        default=1,
    )

    priority = models.PositiveIntegerField(
        default=1,
    )

    customer_selection = models.CharField(
        max_length=20,
        choices=CustomerSelection.choices,
        default=CustomerSelection.ALL,
    )

    first_order_only = models.BooleanField(
        default=False,
    )

    auto_apply = models.BooleanField(
        default=False,
    )

    is_active = models.BooleanField(
        default=True,
    )

    applicable_categories = models.ManyToManyField(
        Category,
        blank=True,
        related_name="coupons",
    )

    applicable_products = models.ManyToManyField(
        Product,
        blank=True,
        related_name="coupons",
    )

    class Meta:
        db_table = "coupons"
        ordering = [
            "priority",
            "-created_at",
        ]

    def __str__(self):
        return self.code


class CouponUsage(BaseModel):
    coupon = models.ForeignKey(
        Coupon,
        on_delete=models.CASCADE,
        related_name="usages",
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="coupon_usages",
    )

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="coupon_usages",
    )

    discount_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    class Meta:
        db_table = "coupon_usages"
        ordering = [
            "-created_at",
        ]

    def __str__(self):
        return f"{self.coupon.code} - {self.user.email}"