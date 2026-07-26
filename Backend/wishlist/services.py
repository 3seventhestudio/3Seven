from django.db import IntegrityError
from .models import WishlistItem
from .selectors import WishlistSelector


class WishlistService:

    @staticmethod
    def toggle(user, product_id):
        """Toggle product in wishlist. Returns (item_or_None, was_added)."""
        try:
            item = WishlistItem.objects.get(
                user=user,
                product_id=product_id,
            )
            item.delete()
            return None, False
        except WishlistItem.DoesNotExist:
            item = WishlistItem.objects.create(
                user=user,
                product_id=product_id,
            )
            return item, True

    @staticmethod
    def remove(user, item_id):
        item = WishlistItem.objects.get(
            id=item_id,
            user=user,
        )
        item.delete()
