from decimal import Decimal

from django.db import transaction

from .models import (
    Coupon,
    CouponScope,
    CouponType,
    CouponUsage,
    CustomerSelection,
)
from .selectors import (
    AdminCouponSelector,
    CouponSelector,
)


class AdminCouponService:

    @staticmethod
    def get_coupons(filters=None):
        return AdminCouponSelector.get_coupons(filters)

    @staticmethod
    def get_coupon(coupon_id):
        return AdminCouponSelector.get_coupon(coupon_id)

    @staticmethod
    @transaction.atomic
    def create_coupon(validated_data):

        categories = validated_data.pop(
            "applicable_categories",
            []
        )

        products = validated_data.pop(
            "applicable_products",
            []
        )

        coupon = Coupon.objects.create(
            **validated_data
        )

        coupon.applicable_categories.set(categories)
        coupon.applicable_products.set(products)

        return coupon

    @staticmethod
    @transaction.atomic
    def update_coupon(coupon, validated_data):

        categories = validated_data.pop(
            "applicable_categories",
            None,
        )

        products = validated_data.pop(
            "applicable_products",
            None,
        )

        for field, value in validated_data.items():
            setattr(coupon, field, value)

        coupon.save()

        if categories is not None:
            coupon.applicable_categories.set(categories)

        if products is not None:
            coupon.applicable_products.set(products)

        return coupon

    @staticmethod
    def delete_coupon(coupon):
        coupon.delete()


class CouponService:

    @staticmethod
    def validate_coupon(
        *,
        user,
        code,
        subtotal,
        cart_items,
    ):

        coupon = CouponSelector.get_coupon_by_code(code)

        if not coupon:
            return (
                False,
                "Invalid or expired coupon.",
                None,
            )

        if not coupon.is_active:
            return (
                False,
                "Coupon is inactive.",
                None,
            )

        if (
            coupon.minimum_order_amount > 0
            and subtotal < coupon.minimum_order_amount
        ):
            return (
                False,
                f"Minimum order amount is {coupon.minimum_order_amount}.",
                None,
            )

        if (
            coupon.usage_limit > 0
            and CouponSelector.get_total_coupon_usage(coupon)
            >= coupon.usage_limit
        ):
            return (
                False,
                "Coupon usage limit exceeded.",
                None,
            )

        if (
            coupon.usage_per_user > 0
            and CouponSelector.get_user_coupon_usage(
                coupon,
                user,
            )
            >= coupon.usage_per_user
        ):
            return (
                False,
                "Coupon usage limit exceeded for this customer.",
                None,
            )

        if coupon.customer_selection == CustomerSelection.NEW:
            if user.orders.exists():
                return (
                    False,
                    "Coupon is valid for new customers only.",
                    None,
                )

        if coupon.customer_selection == CustomerSelection.EXISTING:
            if not user.orders.exists():
                return (
                    False,
                    "Coupon is valid for existing customers only.",
                    None,
                )

        if coupon.first_order_only:
            if user.orders.exists():
                return (
                    False,
                    "Coupon is valid only on first order.",
                    None,
                )

        eligible_subtotal = subtotal

        if coupon.scope != CouponScope.ALL:

            eligible_subtotal = Decimal("0.00")

            category_ids = set(
                coupon.applicable_categories.values_list(
                    "id",
                    flat=True,
                )
            )

            product_ids = set(
                coupon.applicable_products.values_list(
                    "id",
                    flat=True,
                )
            )

            for item in cart_items:

                product = item.variant.product

                if (
                    coupon.scope == CouponScope.CATEGORY
                    and product.category_id in category_ids
                ):
                    eligible_subtotal += item.total_price

                elif (
                    coupon.scope == CouponScope.PRODUCT
                    and product.id in product_ids
                ):
                    eligible_subtotal += item.total_price

            if eligible_subtotal <= 0:
                return (
                    False,
                    "Coupon is not applicable to selected products.",
                    None,
                )

        discount = Decimal("0.00")

        if coupon.discount_type == CouponType.PERCENTAGE:

            discount = (
                eligible_subtotal
                * coupon.discount_value
                / Decimal("100")
            )

            if (
                coupon.maximum_discount > 0
                and discount > coupon.maximum_discount
            ):
                discount = coupon.maximum_discount

        elif coupon.discount_type == CouponType.FIXED:

            discount = min(
                coupon.discount_value,
                eligible_subtotal,
            )

        elif coupon.discount_type == CouponType.FREE_SHIPPING:

            discount = Decimal("0.00")

        return (
            True,
            "Coupon applied successfully.",
            {
                "coupon": coupon,
                "discount": discount.quantize(
                    Decimal("0.01")
                ),
                "eligible_subtotal": eligible_subtotal,
                "free_shipping": (
                    coupon.discount_type
                    == CouponType.FREE_SHIPPING
                ),
            },
        )

    @staticmethod
    def create_usage(
        coupon,
        user,
        order,
        discount_amount,
    ):

        CouponUsage.objects.create(
            coupon=coupon,
            user=user,
            order=order,
            discount_amount=discount_amount,
        )

    @staticmethod
    def get_auto_apply_coupon(
        *,
        user,
        subtotal,
        cart_items,
    ):

        coupons = CouponSelector.get_auto_apply_coupons()

        for coupon in coupons:

            valid, _, data = CouponService.validate_coupon(
                user=user,
                code=coupon.code,
                subtotal=subtotal,
                cart_items=cart_items,
            )

            if valid:
                return data

        return None