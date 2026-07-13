from cart.models import Cart


class CartSelector:

    @staticmethod
    def get_cart(user):
        return (
            Cart.objects
            .select_related("user")
            .prefetch_related(
                "items__product_variant",
                "items__product_variant__product",
                "items__product_variant__size",
                "items__product_variant__color",
            )
            .get(user=user)
        )