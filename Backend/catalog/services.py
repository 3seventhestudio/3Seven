from django.db import transaction

from .models import Product


class ProductService:
    """
    Handles business logic for Product.
    """

    @staticmethod
    @transaction.atomic
    def create_product(validated_data: dict) -> Product:
        """
        Create a new product.
        """
        return Product.objects.create(**validated_data)

    @staticmethod
    @transaction.atomic
    def update_product(product: Product, validated_data: dict) -> Product:
        """
        Update an existing product.
        """
        for field, value in validated_data.items():
            setattr(product, field, value)

        product.save()

        return product

    @staticmethod
    @transaction.atomic
    def delete_product(product: Product) -> None:
        """
        Soft delete a product.
        """
        product.is_active = False
        product.save(update_fields=["is_active"])