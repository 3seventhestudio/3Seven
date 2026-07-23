from django.db import models

from common.models import BaseModel
from catalog.models import ProductVariant


class InventoryTransaction(BaseModel):
    """
    Inventory stock movement history.
    """

    TRANSACTION_IN = "IN"
    TRANSACTION_OUT = "OUT"
    TRANSACTION_ADJUSTMENT = "ADJUSTMENT"

    TRANSACTION_TYPES = (
        (TRANSACTION_IN, "Stock In"),
        (TRANSACTION_OUT, "Stock Out"),
        (TRANSACTION_ADJUSTMENT, "Adjustment"),
    )

    product_variant = models.ForeignKey(
        ProductVariant,
        on_delete=models.CASCADE,
        related_name="inventory_transactions",
    )

    transaction_type = models.CharField(
        max_length=20,
        choices=TRANSACTION_TYPES,
    )

    quantity = models.PositiveIntegerField()

    previous_stock = models.PositiveIntegerField()

    current_stock = models.PositiveIntegerField()

    remarks = models.TextField(blank=True)

    class Meta:
        db_table = "inventory_transactions"
        ordering = ["-created_at"]

    def __str__(self):
        return (
            f"{self.product_variant.sku} "
            f"{self.transaction_type} "
            f"{self.quantity}"
        )