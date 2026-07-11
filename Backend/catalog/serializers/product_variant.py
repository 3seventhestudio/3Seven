from rest_framework import serializers

from catalog.models import ProductVariant


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