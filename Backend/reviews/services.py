from django.db import transaction
from rest_framework.exceptions import PermissionDenied, ValidationError

from orders.models import Order
from orders.models import OrderItem
from reviews.models import Review, ReviewImage


class ReviewService:

    @staticmethod
    @transaction.atomic
    def create_review(*, customer, product, data):
        order_item = (
            OrderItem.objects.filter(
                order__user=customer,
                product_variant__product=product,
                order__status=Order.Status.DELIVERED,
                is_deleted=False,
            )
            .select_related(
                "order",
                "product_variant__product",
            )
            .first()
        )

        if not order_item:
            raise PermissionDenied(
                "You can review only delivered products."
            )

        if Review.objects.filter(
            order_item=order_item,
            is_deleted=False,
        ).exists():
            raise ValidationError(
                "You have already reviewed this product."
            )

        images = data.pop("images", [])

        review = Review.objects.create(
            product=product,
            order_item=order_item,
            customer=customer,
            verified_purchase=True,
            status=Review.Status.PENDING,
            **data,
        )

        for index, image in enumerate(images):
            ReviewImage.objects.create(
                review=review,
                image=image,
                display_order=index,
            )

        return review

    @staticmethod
    @transaction.atomic
    def create_review(*, customer, product, data):
        order_item_id = data.pop("order_item_id")
        images = data.pop("images", [])

        order_item = (
            OrderItem.objects.select_related(
                "order",
                "product_variant__product",
            )
            .filter(
                id=order_item_id,
                order__user=customer,
                order__status=Order.Status.DELIVERED,
                product_variant__product=product,
                is_deleted=False,
            )
            .first()
        )

        if not order_item:
            raise PermissionDenied(
                "You can review only delivered products."
            )

        if Review.objects.filter(
            order_item=order_item,
            is_deleted=False,
        ).exists():
            raise ValidationError(
                "You have already reviewed this product."
            )

        review = Review.objects.create(
            product=product,
            order_item=order_item,
            customer=customer,
            verified_purchase=True,
            status=Review.Status.PENDING,
            **data,
        )

        for index, image in enumerate(images):
            ReviewImage.objects.create(
                review=review,
                image=image,
                display_order=index,
            )

        return review

    @staticmethod
    def delete_review(*, review, customer):
        if review.customer != customer:
            raise PermissionDenied(
                "You don't have permission to delete this review."
            )

        review.delete()

    @staticmethod
    def approve_review(review):
        review.status = Review.Status.APPROVED
        review.save(update_fields=["status"])

    @staticmethod
    def reject_review(review):
        review.status = Review.Status.REJECTED
        review.save(update_fields=["status"])

    @staticmethod
    def feature_review(review):
        review.is_featured = True
        review.save(update_fields=["is_featured"])

    @staticmethod
    def unfeature_review(review):
        review.is_featured = False
        review.save(update_fields=["is_featured"])

    @staticmethod
    def reply_review(review, reply):
        review.admin_reply = reply
        review.save(update_fields=["admin_reply"])