from django.db import models

from common.models import BaseModel
from accounts.models import User
from catalog.models import ProductVariant


class Cart(BaseModel):

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="cart")

    class Meta:
        db_table = "carts"

    def __str__(self):
        return f"{self.user.email} Cart"


class CartItem(BaseModel):

    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    product_variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, related_name="cart_items")
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        db_table = "cart_items"
        unique_together = ("cart", "product_variant")

    @property
    def total_price(self):
        return self.product_variant.price * self.quantity

    def __str__(self):
        return f"{self.cart.user.email} - {self.product_variant}"