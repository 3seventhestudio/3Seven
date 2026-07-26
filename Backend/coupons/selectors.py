from django.db.models import Count, Q
from django.utils import timezone

from .models import Coupon, CouponUsage


class AdminCouponSelector:

    @staticmethod
    def base_queryset():
        return (
            Coupon.objects
            .prefetch_related(
                "applicable_categories",
                "applicable_products",
            )
            .annotate(
                total_usage=Count("usages"),
            )
        )

    @classmethod
    def get_coupons(cls, filters=None):

        queryset = cls.base_queryset()

        if not filters:
            return queryset.order_by("-created_at")

        search = filters.get("search")
        discount_type = filters.get("discount_type")
        is_active = filters.get("is_active")

        if search:
            queryset = queryset.filter(
                Q(code__icontains=search)
                | Q(name__icontains=search)
                | Q(description__icontains=search)
            )

        if discount_type:
            queryset = queryset.filter(
                discount_type=discount_type
            )

        if is_active not in [None, ""]:
            queryset = queryset.filter(
                is_active=str(is_active).lower() == "true"
            )

        return queryset.order_by("-created_at")

    @classmethod
    def get_coupon(cls, coupon_id):
        return cls.base_queryset().get(pk=coupon_id)


class CouponSelector:

    @staticmethod
    def get_coupon_by_code(code):

        now = timezone.now()

        return Coupon.objects.filter(
            code__iexact=code.strip(),
            is_active=True,
            start_date__lte=now,
            end_date__gte=now,
        ).first()

    @staticmethod
    def get_total_coupon_usage(coupon):
        return CouponUsage.objects.filter(
            coupon=coupon
        ).count()

    @staticmethod
    def get_user_coupon_usage(coupon, user):
        return CouponUsage.objects.filter(
            coupon=coupon,
            user=user,
        ).count()