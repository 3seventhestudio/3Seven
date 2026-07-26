from rest_framework import serializers

from cart.models import CartItem


class AddToCartSerializer(serializers.Serializer):
    product_variant_id = serializers.UUIDField()
    quantity = serializers.IntegerField(min_value=1)


class UpdateCartItemSerializer(serializers.Serializer):
    quantity = serializers.IntegerField(min_value=1)


class CartItemSerializer(serializers.ModelSerializer):
    product_id = serializers.UUIDField(source="product_variant.product.id", read_only=True)
    product_variant_id = serializers.UUIDField(source="product_variant.id", read_only=True)
    product_name = serializers.CharField(source="product_variant.product.name", read_only=True)
    product_slug = serializers.CharField(source="product_variant.product.slug", read_only=True)
    thumbnail = serializers.ImageField(source="product_variant.product.thumbnail", read_only=True)
    sku = serializers.CharField(source="product_variant.sku", read_only=True)
    size = serializers.CharField(source="product_variant.size.name", read_only=True)
    color = serializers.CharField(source="product_variant.color.name", read_only=True)
    price = serializers.DecimalField(source="product_variant.price", max_digits=10, decimal_places=2, read_only=True)
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = CartItem
        fields = (
            "id",
            "product_id",
            "product_variant_id",
            "product_name",
            "product_slug",
            "thumbnail",
            "sku",
            "size",
            "color",
            "price",
            "quantity",
            "total_price",
        )