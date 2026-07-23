from decimal import Decimal
from uuid import uuid4

from django.db import transaction

from cart.models import Cart
from common.models import StoreSettings
from orders.models import Order, OrderItem, PaymentMethod, OrderStatusHistory
from orders.selectors import AdminOrderSelector

class OrderService:

    @staticmethod
    @transaction.atomic
    def create_order(user, address, payment_method, notes=""):
        """
        Creates an order from the authenticated user's cart.

        Business Rules
        --------------
        - All pricing is calculated on the server.
        - Shipping/COD/GST settings come from StoreSettings.
        - Stock is validated before order creation.
        - Stock is deducted only when the order is confirmed.
        """

        cart = (
            Cart.objects
            .select_related("user")
            .prefetch_related(
                "items__product_variant",
                "items__product_variant__product",
                "items__product_variant__size",
                "items__product_variant__color",
            )
            .filter(user=user)
            .first()
        )

        if cart is None or not cart.items.exists():
            raise ValueError("Your cart is empty.")

        subtotal = Decimal("0.00")

        # Validate stock and calculate subtotal
        for item in cart.items.all():

            variant = item.product_variant

            if item.quantity > variant.stock_quantity:
                raise ValueError(
                    f"{variant.product.name} has only "
                    f"{variant.stock_quantity} item(s) available."
                )

            subtotal += variant.price * item.quantity

        # Load business settings once
        settings = StoreSettings.load()

        # Validate payment method
        OrderService.validate_payment_method(
            payment_method=payment_method,
            settings=settings,
        )

        # Shipping
        shipping_charge = (
            Decimal("0.00")
            if settings.free_shipping
            else settings.shipping_charge
        )

        # COD
        cod_charge = Decimal("0.00")
        if payment_method.lower() == PaymentMethod.COD:
            cod_charge = settings.cod_charge

        # GST
        tax_amount = Decimal("0.00")
        if settings.gst_enabled:
            tax_amount = (
                subtotal * settings.gst_percentage
            ) / Decimal("100")

        # Future use
        discount_amount = Decimal("0.00")

        grand_total = (
            subtotal
            + shipping_charge
            + cod_charge
            + tax_amount
            - discount_amount
        )

        # Create Order
        order = Order.objects.create(
            user=user,
            shipping_address=address,
            order_number=OrderService.generate_order_number(),
            payment_method=payment_method.lower(),
            subtotal=subtotal,
            shipping_charge=shipping_charge,
            cod_charge=cod_charge,
            tax_amount=tax_amount,
            discount_amount=discount_amount,
            grand_total=grand_total,
            notes=notes,
        )

        # Create Order Items
        order_items = []

        for item in cart.items.all():

            variant = item.product_variant

            order_items.append(
                OrderItem(
                    order=order,
                    product_variant=variant,
                    product_name=variant.product.name,
                    sku=variant.sku,
                    size=variant.size.name,
                    color=variant.color.name,
                    quantity=item.quantity,
                    unit_price=variant.price,
                    total_price=variant.price * item.quantity,
                )
            )

        OrderItem.objects.bulk_create(order_items)

        # Clear Cart
        cart.items.all().delete()

        return order

    @staticmethod
    def generate_order_number():
        """
        Generates a unique order number.
        Example:
            3SS-AB12CD34
        """

        settings = StoreSettings.load()
        prefix = getattr(settings, "order_prefix", "3SS")

        return f"{prefix}-{uuid4().hex[:8].upper()}"

    @staticmethod
    def validate_payment_method(payment_method, settings):
        """
        Validates whether the selected payment method
        is enabled in StoreSettings.
        """

        payment_method = payment_method.lower()

        if payment_method == PaymentMethod.COD:
            if not settings.cod_enabled:
                raise ValueError(
                    "Cash on Delivery is currently unavailable."
                )

        elif payment_method == PaymentMethod.UPI:
            if not settings.upi_enabled:
                raise ValueError(
                    "UPI payment is currently unavailable."
                )

        elif payment_method in (
            PaymentMethod.CARD,
            PaymentMethod.NETBANKING,
        ):
            if not settings.payment_gateway_enabled:
                raise ValueError(
                    "Online payment is currently unavailable."
                )

        else:
            raise ValueError("Invalid payment method.")

    @staticmethod
    @transaction.atomic
    def confirm_order(order):
        """
        Deduct stock only after the order is confirmed.
        """

        if order.status != Order.PENDING:
            raise ValueError(
                "Only pending orders can be confirmed."
            )

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

from orders.models import Order, OrderStatusHistory
from orders.selectors import AdminOrderSelector


class AdminOrderService:

    @staticmethod
    def get_orders(filters=None):
        return AdminOrderSelector.get_orders(filters)

    @staticmethod
    def get_order(order_id):
        return AdminOrderSelector.get_order(order_id)

    @staticmethod
    def update_order(order, validated_data):
        status = validated_data.pop("status", None)

        for field, value in validated_data.items():
            setattr(order, field, value)

        if status and status != order.status:
            order.status = status

            OrderStatusHistory.objects.create(
                order=order,
                status=status,
                comment=validated_data.get("notes", ""),
            )

        order.save()

        return order