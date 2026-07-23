from django.db.models import QuerySet

from catalog.models import ProductVariant


class InventorySelector:
    @staticmethod
    def base_queryset() -> QuerySet:
        return (
            ProductVariant.objects.select_related(
                "product",
                "product__category",
                "size",
                "color",
            )
        )

    @classmethod
    def get_inventory(cls, filters=None):
        queryset = cls.base_queryset()

        if filters:
            search = filters.get("search")
            category = filters.get("category")
            stock = filters.get("stock")

            if search:
                queryset = queryset.filter(
                    product__name__icontains=search
                )

            if category:
                queryset = queryset.filter(
                    product__category_id=category
                )

            if stock == "in_stock":
                queryset = queryset.filter(stock_quantity__gt=0)

            elif stock == "out_of_stock":
                queryset = queryset.filter(stock_quantity=0)

            elif stock == "low_stock":
                queryset = queryset.filter(
                    stock_quantity__gt=0,
                    stock_quantity__lte=10,
                )

        return queryset.order_by(
            "product__name",
            "size__display_order",
            "color__name",
        )

    @classmethod
    def get_variant(cls, variant_id):
        return cls.base_queryset().get(pk=variant_id)