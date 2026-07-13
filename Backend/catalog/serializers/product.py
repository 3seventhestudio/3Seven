from rest_framework import serializers

from catalog.models import Product
from .product_image import ProductImageSerializer
from .product_variant import ProductVariantSerializer


class ProductListSerializer(serializers.ModelSerializer):

    category = serializers.CharField(source="category.name")

    thumbnail = serializers.SerializerMethodField()

    in_stock = serializers.ReadOnlyField()

    discount_percentage = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "slug",
            "category",
            "price",
            "compare_price",
            "discount_percentage",
            "thumbnail",
            "in_stock",
            "featured",
            "new_arrival",
            "best_seller",
        )

    def get_thumbnail(self, obj):

        request = self.context.get("request")

        primary = (
            obj.images
            .filter(
                is_primary=True,
                is_active=True,
                is_deleted=False,
            )
            .order_by("display_order")
            .first()
        )

        if not primary:
            return None

        if request:
            return request.build_absolute_uri(primary.image.url)

        return primary.image.url

    def get_discount_percentage(self, obj):

        if obj.compare_price and obj.compare_price > obj.price:

            return round(
                ((obj.compare_price - obj.price) / obj.compare_price) * 100
            )

        return 0


class ProductDetailSerializer(serializers.ModelSerializer):

    category = serializers.CharField(source="category.name")

    thumbnail = serializers.SerializerMethodField()

    images = ProductImageSerializer(
        many=True,
        read_only=True,
    )

    variants = ProductVariantSerializer(
        many=True,
        read_only=True,
    )

    related_products = serializers.SerializerMethodField()

    in_stock = serializers.ReadOnlyField()

    discount_percentage = serializers.SerializerMethodField()

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
            "discount_percentage",
            "thumbnail",
            "in_stock",
            "featured",
            "new_arrival",
            "best_seller",
            "images",
            "variants",
            "related_products",
        )

    def get_thumbnail(self, obj):

        request = self.context.get("request")

        primary = (
            obj.images
            .filter(
                is_primary=True,
                is_active=True,
                is_deleted=False,
            )
            .order_by("display_order")
            .first()
        )

        if not primary:
            return None

        if request:
            return request.build_absolute_uri(primary.image.url)

        return primary.image.url

    def get_discount_percentage(self, obj):

        if obj.compare_price and obj.compare_price > obj.price:

            return round(
                ((obj.compare_price - obj.price) / obj.compare_price) * 100
            )

        return 0

    def get_related_products(self, obj):

        from catalog.selectors import ProductSelector

        products = ProductSelector.get_related_products(obj)

        return ProductListSerializer(
            products,
            many=True,
            context=self.context,
        ).data