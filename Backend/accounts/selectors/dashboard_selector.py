from orders.models import Order, OrderStatus
from accounts.models import Address


class DashboardSelector:

    @staticmethod
    def get_dashboard(user):
        """
        Dashboard summary for logged-in customer.
        """

        orders = (
            Order.objects
            .filter(user=user)
            .order_by("-created_at")
        )

        total_orders = orders.count()

        pending_orders = orders.filter(
            status=OrderStatus.PENDING
        ).count()

        saved_addresses = Address.objects.filter(
            user=user
        ).count()

        recent_orders = orders[:5]

        return {
            "profile": user,
            "stats": {
                "total_orders": total_orders,
                "pending_orders": pending_orders,
                "saved_addresses": saved_addresses,
            },
            "recent_orders": recent_orders,
        }