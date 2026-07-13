from django.db import transaction

from cart.models import Cart, CartItem
from catalog.models import ProductVariant


class CartService:

    @staticmethod
    @transaction.atomic
    def add_to_cart(user, product_variant_id, quantity):

        product_variant = ProductVariant.objects.select_for_update().get(
            pk=product_variant_id,
            is_active=True,
        )

        if product_variant.stock_quantity < quantity:
            raise ValueError("Requested quantity is not available in stock.")

        cart, _ = Cart.objects.get_or_create(user=user)

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product_variant=product_variant,
            defaults={"quantity": quantity},
        )

        if not created:
            new_quantity = cart_item.quantity + quantity

            if new_quantity > product_variant.stock_quantity:
                raise ValueError("Requested quantity is not available in stock.")

            cart_item.quantity = new_quantity
            cart_item.save(update_fields=["quantity"])

        return cart

    @staticmethod
    @transaction.atomic
    def update_cart_item(user, cart_item_id, quantity):

        cart_item = CartItem.objects.select_related(
            "cart",
            "product_variant",
        ).get(
            pk=cart_item_id,
            cart__user=user,
        )

        if quantity > cart_item.product_variant.stock_quantity:
            raise ValueError("Requested quantity is not available in stock.")

        cart_item.quantity = quantity
        cart_item.save(update_fields=["quantity"])

        return cart_item

    @staticmethod
    @transaction.atomic
    def remove_cart_item(user, cart_item_id):

        cart_item = CartItem.objects.get(
            pk=cart_item_id,
            cart__user=user,
        )

        cart_item.delete()