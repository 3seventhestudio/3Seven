from rest_framework import serializers

from catalog.models import ProductVariant
from inventory.models import InventoryTransaction


class InventoryListSerializer(serializers.ModelSerializer):
    product = serializers.CharField(source="product.name", read_only=True)
    category = serializers.CharField(source="product.category.name", read_only=True)
    size = serializers.CharField(source="size.name", read_only=True)
    color = serializers.CharField(source="color.name", read_only=True)

    class Meta:
        model = ProductVariant
        fields = [
            "id",
            "product",
            "category",
            "sku",
            "size",
            "color",
            "price",
            "stock_quantity",
        ]


class InventoryUpdateSerializer(serializers.Serializer):
    transaction_type = serializers.ChoiceField(
        choices=InventoryTransaction.TRANSACTION_TYPES
    )

    quantity = serializers.IntegerField(min_value=0)

    remarks = serializers.CharField(
        required=False,
        allow_blank=True,
    )