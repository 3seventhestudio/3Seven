from django.db import transaction

from .models import Product, Category
from catalog.selectors import AdminCategorySelector



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

class AdminProductService:
    """
    Business logic for Product Management.
    """

    @staticmethod
    @transaction.atomic
    def create_product(validated_data):
        """
        Create a new product.
        """
        product = Product.objects.create(**validated_data)
        return product

    @staticmethod
    @transaction.atomic
    def update_product(product, validated_data):
        """
        Update an existing product.
        """

        for field, value in validated_data.items():
            setattr(product, field, value)

        product.save()

        return product

    @staticmethod
    @transaction.atomic
    def delete_product(product):
        """
        Soft delete a product.
        """

        product.is_deleted = True
        product.save(update_fields=["is_deleted"])

        return product

class AdminCategoryService:
    """
    Category Management Service.
    """

    @staticmethod
    def get_categories(filters=None):
        return AdminCategorySelector.get_categories(filters)

    @staticmethod
    def get_category(category_id):
        return AdminCategorySelector.get_category(category_id)

    @staticmethod
    def create_category(validated_data):
        return Category.objects.create(**validated_data)

    @staticmethod
    def update_category(category, validated_data):
        for field, value in validated_data.items():
            setattr(category, field, value)

        category.save()
        return category

    @staticmethod
    def delete_category(category):
        category.is_deleted = True
        category.is_active = False
        category.save()

    @staticmethod
    def dashboard_stats():
        return AdminCategorySelector.get_dashboard_stats()