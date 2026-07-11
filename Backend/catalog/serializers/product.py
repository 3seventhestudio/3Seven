from rest_framework import serializers

from catalog.models import Product
from .product_image import ProductImageSerializer
from .product_variant import ProductVariantSerializer


class ProductListSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source="category.name")

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "slug",
            "category",
            "price",
            "compare_price",
            "thumbnail",
            "featured",
            "new_arrival",
            "best_seller",
        )


class ProductDetailSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source="category.name")
    images = ProductImageSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "slug",
            "category",
            "short_description",
            "description",
            "price",
            "compare_price",
            "thumbnail",
            "featured",
            "new_arrival",
            "best_seller",
            "images",
            "variants",
        )