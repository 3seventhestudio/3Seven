from django.conf import settings
from django.db import models
from common.models import BaseModel
from catalog.models import Product


class WishlistItem(BaseModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="wishlist_items",
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="wishlisted_by",
    )

    class Meta:
        db_table = "wishlist_items"
        ordering = ["-created_at"]
        constraints = [
            models.UniqueConstraint(
                fields=["user", "product"],
                name="unique_wishlist_item",
            )
        ]

    def __str__(self):
        return f"{self.user.email} - {self.product.name}"
