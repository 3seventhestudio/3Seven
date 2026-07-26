from rest_framework import serializers

from reviews.models import Review, ReviewImage


class ReviewImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewImage
        fields = [
            "id",
            "image",
            "display_order",
        ]


class ReviewListSerializer(serializers.ModelSerializer):
    customer_name = serializers.SerializerMethodField()
    images = ReviewImageSerializer(many=True, read_only=True)

    class Meta:
        model = Review
        fields = [
            "id",
            "customer_name",
            "rating",
            "title",
            "comment",
            "verified_purchase",
            "is_featured",
            "admin_reply",
            "created_at",
            "images",
        ]

    def get_customer_name(self, obj):
        full_name = obj.customer.get_full_name()

        return full_name if full_name else obj.customer.email

class ReviewDetailSerializer(serializers.ModelSerializer):

    images = serializers.SerializerMethodField()

    class Meta:
        model = Review

        fields = (
            "id",
            "rating",
            "title",
            "comment",
            "images",
        )

    def get_images(self, obj):
        request = self.context.get("request")

        return [
            request.build_absolute_uri(image.image.url)
            for image in obj.images.all()
        ]


class ReviewCreateSerializer(serializers.ModelSerializer):
    order_item_id = serializers.UUIDField(write_only=True)

    images = serializers.ListField(
        child=serializers.ImageField(),
        required=False,
        write_only=True,
    )

    class Meta:
        model = Review
        fields = [
            "order_item_id",
            "rating",
            "title",
            "comment",
            "images",
        ]


class ReviewUpdateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(),
        required=False,
        write_only=True,
    )

    class Meta:
        model = Review
        fields = [
            "rating",
            "title",
            "comment",
            "images",
        ]


class AdminReviewSerializer(serializers.ModelSerializer):
    customer_name = serializers.SerializerMethodField()
    product_name = serializers.CharField(
        source="product.name",
        read_only=True,
    )

    class Meta:
        model = Review
        fields = [
            "id",
            "customer_name",
            "product_name",
            "rating",
            "title",
            "comment",
            "verified_purchase",
            "status",
            "is_featured",
            "helpful_count",
            "report_count",
            "admin_reply",
            "created_at",
        ]

    def get_customer_name(self, obj):
        full_name = obj.customer.get_full_name()

        return full_name if full_name else obj.customer.email