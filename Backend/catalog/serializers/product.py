from rest_framework import serializers

from catalog.models import Product, Category
from .product_image import ProductImageSerializer
from .product_variant import ProductVariantSerializer


class ProductListSerializer(serializers.ModelSerializer):

    category = serializers.CharField(source="category.name")
    thumbnail = serializers.SerializerMethodField()
    in_stock = serializers.ReadOnlyField()
    discount_percentage = serializers.SerializerMethodField()
    default_variant_id = serializers.SerializerMethodField()
    default_size = serializers.SerializerMethodField()
    default_color = serializers.SerializerMethodField()

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
            "default_variant_id",
            "default_size",
            "default_color",
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

    def get_default_variant_id(self, obj):

        variant = obj.variants.filter(
            is_active=True
        ).first()

        return str(variant.id) if variant else None


    def get_default_size(self, obj):

        variant = obj.variants.filter(
            is_active=True
        ).first()

        return variant.size.name if variant else None


    def get_default_color(self, obj):

        variant = obj.variants.filter(
            is_active=True
        ).first()

        return variant.color.name if variant else None

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

class AdminProductListSerializer(serializers.ModelSerializer):
    """
    Serializer used by the Admin Product List page.
    """

    category = serializers.CharField(source="category.name", read_only=True)
    category_id = serializers.IntegerField(source="category.id", read_only=True)

    variant_count = serializers.IntegerField(read_only=True)
    image_count = serializers.IntegerField(read_only=True)

    in_stock = serializers.ReadOnlyField()

    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "sku",
            "category",
            "category_id",
            "price",
            "compare_price",
            "stock_quantity",
            "featured",
            "new_arrival",
            "best_seller",
            "in_stock",
            "variant_count",
            "image_count",
            "thumbnail",
            "created_at",
        ]

    def get_thumbnail(self, obj):
        request = self.context.get("request")

        if not obj.thumbnail:
            return None

        if request:
            return request.build_absolute_uri(obj.thumbnail.url)

        return obj.thumbnail.url


class AdminProductDetailSerializer(serializers.ModelSerializer):
    """
    Used for Product Edit screen.
    """

    class Meta:
        model = Product
        fields = [
            "id",
            "category",
            "name",
            "slug",
            "sku",
            "short_description",
            "description",
            "price",
            "compare_price",
            "stock_quantity",
            "featured",
            "new_arrival",
            "best_seller",
            "thumbnail",
        ]


class AdminProductCreateUpdateSerializer(serializers.ModelSerializer):
    """
    Used for Create & Update APIs.
    """

    class Meta:
        model = Product
        fields = [
            "category",
            "name",
            "slug",
            "sku",
            "short_description",
            "description",
            "price",
            "compare_price",
            "stock_quantity",
            "featured",
            "new_arrival",
            "best_seller",
            "thumbnail",
        ]

    def validate_sku(self, value):
        queryset = Product.objects.filter(sku=value)

        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError(
                "Product SKU already exists."
            )

        return value

    def validate_slug(self, value):
        queryset = Product.objects.filter(slug=value)

        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError(
                "Product slug already exists."
            )

        return value

    def validate_compare_price(self, value):
        if value is None:
            return value

        price = self.initial_data.get("price")

        if price:
            try:
                if float(value) < float(price):
                    raise serializers.ValidationError(
                        "Compare price should be greater than or equal to price."
                    )
            except (TypeError, ValueError):
                pass

        return value


class AdminCategoryDropdownSerializer(serializers.ModelSerializer):
    """
    Lightweight serializer for category dropdowns.
    """

    class Meta:
        model = Category
        fields = [
            "id",
            "name",
        ]

class AdminCategorySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "image",
            "image_url",
            "display_order",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "slug",
            "created_at",
            "updated_at",
        ]

    def get_image_url(self, obj):
        request = self.context.get("request")

        if obj.image:
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url

        return None

    def validate_name(self, value):
        queryset = Category.objects.filter(name__iexact=value)

        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError(
                "Category with this name already exists."
            )

        return value