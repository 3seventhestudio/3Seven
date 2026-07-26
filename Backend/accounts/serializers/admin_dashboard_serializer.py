from rest_framework import serializers


class RecentOrderSerializer(serializers.Serializer):
    order_number = serializers.CharField()
    status = serializers.CharField()
    payment_status = serializers.CharField()
    grand_total = serializers.DecimalField(max_digits=10, decimal_places=2)
    created_at = serializers.DateTimeField()
    customer_email = serializers.SerializerMethodField()

    def get_customer_email(self, obj):
        return obj.user.email if obj.user else ""


class LowStockSerializer(serializers.Serializer):
    product_name = serializers.SerializerMethodField()
    sku = serializers.CharField()
    size = serializers.SerializerMethodField()
    color = serializers.SerializerMethodField()
    stock_quantity = serializers.IntegerField()

    def get_product_name(self, obj):
        return obj.product.name

    def get_size(self, obj):
        return obj.size.name if obj.size else ""

    def get_color(self, obj):
        return obj.color.name if obj.color else ""


class AdminDashboardSerializer(serializers.Serializer):
    total_revenue = serializers.DecimalField(max_digits=12, decimal_places=2)
    total_orders = serializers.IntegerField()
    total_customers = serializers.IntegerField()
    total_products = serializers.IntegerField()
    recent_orders = RecentOrderSerializer(many=True)
    low_stock = LowStockSerializer(many=True)
    orders_by_status = serializers.DictField(child=serializers.IntegerField())
