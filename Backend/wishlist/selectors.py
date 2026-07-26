from .models import WishlistItem


class WishlistSelector:

    @staticmethod
    def get_wishlist(user):
        return (
            WishlistItem.objects
            .filter(user=user)
            .select_related(
                "product",
                "product__category",
            )
            .prefetch_related(
                "product__images",
            )
        )

    @staticmethod
    def is_in_wishlist(user, product_id):
        return WishlistItem.objects.filter(
            user=user,
            product_id=product_id,
        ).exists()
