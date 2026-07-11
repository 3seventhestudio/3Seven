from rest_framework import serializers

from catalog.models import ProductImage


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