from django.db.models import Sum, Count, Q
from orders.models import Order
from accounts.models import User
from catalog.models import Product, ProductVariant


class AdminDashboardSelector:

    @staticmethod
    def get_dashboard_data():
        # Total revenue (paid orders only)
        revenue = Order.objects.filter(
            payment_status="paid"
        ).aggregate(
            total=Sum("grand_total")
        )["total"] or 0

        total_orders = Order.objects.count()
        total_customers = User.objects.filter(is_staff=False).count()
        total_products = Product.objects.filter(is_active=True, is_deleted=False).count()

        # Recent orders
        recent_orders = (
            Order.objects
            .select_related("user")
            .order_by("-created_at")[:10]
        )

        # Low stock
        low_stock = (
            ProductVariant.objects
            .select_related("product", "size", "color")
            .filter(stock_quantity__lte=5, product__is_active=True)
            .order_by("stock_quantity")[:20]
        )

        # Orders by status
        status_counts = (
            Order.objects
            .values("status")
            .annotate(count=Count("id"))
            .order_by("status")
        )

        return {
            "total_revenue": revenue,
            "total_orders": total_orders,
            "total_customers": total_customers,
            "total_products": total_products,
            "recent_orders": recent_orders,
            "low_stock": low_stock,
            "orders_by_status": {item["status"]: item["count"] for item in status_counts},
        }
