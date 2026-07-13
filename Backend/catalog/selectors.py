from django.db.models import Q, QuerySet
from .models import Category, Product

class CategorySelector:
    """
    Read-only queries related to categories.
    """
    @staticmethod
    def get_active_categories() -> QuerySet:
        return Category.objects.filter(is_active=True).order_by("display_order", "name")

class ProductSelector:
    """
    Read-only queries related to products.
    """

    @staticmethod
    def _base_queryset() -> QuerySet:
        """
        Base queryset used by all product selectors.
        """
        return (Product.objects.filter(is_active=True).select_related("category").prefetch_related("images","variants","variants__size","variants__color"))

    @staticmethod
    def get_products(filters: dict) -> QuerySet:
        queryset = ProductSelector._base_queryset()
        category = filters.get("category")
        if category:
            queryset = queryset.filter(category__slug=category)
        search = filters.get("search")
        if search:
            queryset = queryset.filter(Q(name__icontains=search)| Q(description__icontains=search)| Q(short_description__icontains=search))
        min_price = filters.get("min_price")
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        max_price = filters.get("max_price")
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        size = filters.get("size")
        if size:
            queryset = queryset.filter(variants__size__name__iexact=size)
        color = filters.get("color")
        if color:
            queryset = queryset.filter(variants__color__name__iexact=color)
        if filters.get("featured") == "true":
            queryset = queryset.filter(featured=True)
        if filters.get("best_seller") == "true":
            queryset = queryset.filter(best_seller=True)
        if filters.get("new_arrival") == "true":
            queryset = queryset.filter(new_arrival=True)
        ordering = filters.get("ordering")
        ordering_map = {"price": "price","-price": "-price","name": "name","-name": "-name","latest": "-created_at", "newest": "-created_at"}
        if ordering in ordering_map:
            queryset = queryset.order_by(ordering_map[ordering])
        return queryset.distinct()

    @staticmethod
    def get_product_by_slug(slug: str) -> Product:
        return ProductSelector._base_queryset().get(slug=slug)

    @staticmethod
    def get_featured_products(limit=None) -> QuerySet:
        queryset = (ProductSelector._base_queryset().filter(featured=True).order_by("-created_at"))
        return queryset[:limit] if limit else queryset

    @staticmethod
    def get_new_arrivals(limit=None) -> QuerySet:
        queryset = (ProductSelector._base_queryset().filter(new_arrival=True).order_by("-created_at"))
        return queryset[:limit] if limit else queryset

    @staticmethod
    def get_best_sellers(limit=None) -> QuerySet:
        queryset = (ProductSelector._base_queryset().filter(best_seller=True).order_by("-created_at"))
        return queryset[:limit] if limit else queryset

    @staticmethod
    def get_related_products(product: Product, limit=8) -> QuerySet:
        return (ProductSelector._base_queryset().filter(category=product.category).exclude(pk=product.pk).order_by("-created_at")[:limit])