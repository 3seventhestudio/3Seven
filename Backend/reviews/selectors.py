from django.db.models import Avg, Count, Prefetch
from django.shortcuts import get_object_or_404
from reviews.models import Review, ReviewImage


class ReviewSelector:

    @staticmethod
    def get_product_reviews(product):
        return (
            Review.objects.filter(
                product=product,
                status=Review.Status.APPROVED,
                is_deleted=False,
            )
            .select_related("customer")
            .prefetch_related(
                Prefetch(
                    "images",
                    queryset=ReviewImage.objects.filter(is_deleted=False),
                )
            )
            .order_by("-is_featured", "-created_at")
        )

    @staticmethod
    def get_review(review_id, customer=None):
        queryset = (
            Review.objects.filter(is_deleted=False)
            .select_related("customer", "product", "order_itemm")
            .prefetch_related("images")
        )

        if customer:
            queryset = queryset.filter(customer=customer)
        return get_object_or_404(
            queryset,
            id=review_id
        )

    @staticmethod
    def get_customer_review(product, customer):
        return (
            Review.objects.filter(
                product=product,
                customer=customer,
                is_deleted=False,
            )
            .first()
        )

    @staticmethod
    def get_admin_reviews(filters=None):
        queryset = (
            Review.objects.filter(is_deleted=False)
            .select_related("customer", "product")
            .order_by("-created_at")
        )

        if not filters:
            return queryset

        status = filters.get("status")
        if status:
            queryset = queryset.filter(status=status)

        rating = filters.get("rating")
        if rating:
            queryset = queryset.filter(rating=rating)

        product = filters.get("product")
        if product:
            queryset = queryset.filter(product_id=product)

        customer = filters.get("customer")
        if customer:
            queryset = queryset.filter(customer_id=customer)

        search = filters.get("search")
        if search:
            queryset = queryset.filter(comment__icontains=search)

        return queryset

    @staticmethod
    def get_review_summary(product):
        reviews = Review.objects.filter(
            product=product,
            status=Review.Status.APPROVED,
            is_deleted=False,
        )

        summary = reviews.aggregate(
            average_rating=Avg("rating"),
            total_reviews=Count("id"),
        )

        distribution = {
            star: reviews.filter(rating=star).count()
            for star in range(5, 0, -1)
        }

        return {
            "average_rating": round(summary["average_rating"] or 0, 1),
            "total_reviews": summary["total_reviews"],
            "distribution": distribution,
        }