from rest_framework import serializers

from catalog.models import Category, Product

from .models import Coupon


class AdminCouponListSerializer(serializers.ModelSerializer):
    total_usage = serializers.IntegerField(read_only=True)

    class Meta:
        model = Coupon
        fields = [
            "id",
            "code",
            "name",
            "discount_type",
            "discount_value",
            "minimum_order_amount",
            "start_date",
            "end_date",
            "is_active",
            "total_usage",
        ]


class AdminCouponDetailSerializer(serializers.ModelSerializer):
    applicable_categories = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        many=True,
        required=False,
    )

    applicable_products = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        many=True,
        required=False,
    )

    total_usage = serializers.IntegerField(read_only=True)

    class Meta:
        model = Coupon
        fields = "__all__"


class AdminCouponCreateUpdateSerializer(serializers.ModelSerializer):
    applicable_categories = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        many=True,
        required=False,
    )

    applicable_products = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        many=True,
        required=False,
    )

    class Meta:
        model = Coupon
        fields = [
            "code",
            "name",
            "description",
            "discount_type",
            "discount_value",
            "maximum_discount",
            "minimum_order_amount",
            "start_date",
            "end_date",
            "usage_limit",
            "usage_per_user",
            "first_order_only",
            "is_active",
            "applicable_categories",
            "applicable_products",
        ]


class ApplyCouponSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=50)