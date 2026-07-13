import uuid
from decimal import Decimal

from django.db import transaction

from cart.models import Cart
from orders.models import Order, OrderItem


class OrderService:

    @staticmethod
    @transaction.atomic
    def create_order(user, address, payment_method, notes=""):

        cart = (
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

        if not cart.items.exists():
            raise ValueError("Your cart is empty.")

        subtotal = Decimal("0.00")

        for item in cart.items.all():

            if item.quantity > item.product_variant.stock_quantity:
                raise ValueError(
                    f"{item.product_variant.product.name} has only {item.product_variant.stock_quantity} item(s) available."
                )

            subtotal += item.product_variant.price * item.quantity

        shipping_charge = Decimal("0.00")

        total = subtotal + shipping_charge

        order = Order.objects.create(
            user=user,
            address=address,
            order_number=OrderService.generate_order_number(),
            payment_method=payment_method,
            subtotal=subtotal,
            shipping_charge=shipping_charge,
            total=total,
            notes=notes,
        )

        for item in cart.items.all():

            OrderItem.objects.create(
            order=order,
            product_variant=item.product_variant,
            product_name=item.product_variant.product.name,
            sku=item.product_variant.sku,
            size=item.product_variant.size.name,
            color=item.product_variant.color.name,
            quantity=item.quantity,
            unit_price=item.product_variant.price,
            total_price=item.product_variant.price * item.quantity,
        )

        return order

    @staticmethod
    def generate_order_number():

        return f"3SVN-{uuid.uuid4().hex[:8].upper()}"
    
    @staticmethod
    @transaction.atomic
    def confirm_order(order):

        if order.status != Order.PENDING:
            raise ValueError("Only pending orders can be confirmed.")

        for item in order.items.select_related("product_variant"):

            variant = item.product_variant

            if variant.stock_quantity < item.quantity:
                raise ValueError(
                    f"{variant.product.name} does not have sufficient stock."
                )

            variant.stock_quantity -= item.quantity
            variant.save(update_fields=["stock_quantity"])

        order.status = Order.CONFIRMED
        order.save(update_fields=["status"])

        return order