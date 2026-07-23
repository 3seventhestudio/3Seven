from django.db.models import Q

from orders.models import Order


class AdminOrderSelector:

    @staticmethod
    def base_queryset():
        return (
            Order.objects.select_related(
                "user",
                "shipping_address",
            ).prefetch_related(
                "items",
                "status_history",
            )
        )

    @classmethod
    def get_orders(cls, filters=None):
        queryset = cls.base_queryset()

        if filters:
            search = filters.get("search")
            status = filters.get("status")
            payment_status = filters.get("payment_status")

            if search:
                queryset = queryset.filter(
                    Q(order_number__icontains=search)
                    | Q(user__first_name__icontains=search)
                    | Q(user__last_name__icontains=search)
                    | Q(user__email__icontains=search)
                )

            if status:
                queryset = queryset.filter(status=status)

            if payment_status:
                queryset = queryset.filter(
                    payment_status=payment_status
                )

        return queryset.order_by("-created_at")

    @classmethod
    def get_order(cls, order_id):
        return cls.base_queryset().get(pk=order_id)