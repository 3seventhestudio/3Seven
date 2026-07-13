from rest_framework import serializers

from catalog.models import ProductImage


class ProductImageSerializer(serializers.ModelSerializer):

    image = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = (
            "id",
            "image",
            "alt_text",
            "display_order",
            "is_primary",
        )

    def get_image(self, obj):

        request = self.context.get("request")

        if not obj.image:
            return None

        if request:
            return request.build_absolute_uri(obj.image.url)

        return obj.image.url