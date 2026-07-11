from rest_framework import serializers

from .models import Category, Product, ProductImage, ProductVariant


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            "id",
            "name",
            "slug",
            "image",
        )


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


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = (
            "id",
            "image",
            "alt_text",
            "display_order",
            "is_primary",
        )


class ProductVariantSerializer(serializers.ModelSerializer):
    size = serializers.CharField(source="size.name")
    color = serializers.CharField(source="color.name")

    class Meta:
        model = ProductVariant
        fields = (
            "id",
            "sku",
            "size",
            "color",
            "price",
            "stock_quantity",
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