from rest_framework import serializers
from catalog.models import Product
from .models import WishlistItem


class WishlistProductSerializer(serializers.ModelSerializer):
    thumbnail = serializers.ImageField()
    category_name = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "price",
            "compare_price",
            "thumbnail",
            "in_stock",
            "category_name",
        ]

    def get_category_name(self, obj):
        return obj.category.name if obj.category else ""


class WishlistItemSerializer(serializers.ModelSerializer):
    product = WishlistProductSerializer()

    class Meta:
        model = WishlistItem
        fields = ["id", "product", "created_at"]


class ToggleWishlistSerializer(serializers.Serializer):
    product_id = serializers.UUIDField()
