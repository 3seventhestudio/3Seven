from django.db.models import Q, QuerySet, Count, Prefetch
from .models import Category, Product, ProductImage, ProductVariant

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
    
class AdminProductSelector:
    """
    Product Management selector for Admin Panel.
    """

    @staticmethod
    def base_queryset():
        return (
            Product.objects
            .select_related("category")
            .prefetch_related(
                Prefetch(
                    "images",
                    queryset=ProductImage.objects.order_by("display_order"),
                ),
                Prefetch(
                    "variants",
                    queryset=ProductVariant.objects.select_related(
                        "size",
                        "color",
                    ),
                ),
            )
            .annotate(
                variant_count=Count("variants", distinct=True),
                image_count=Count("images", distinct=True),
            )
        )

    @classmethod
    def get_products(cls, filters=None):

        queryset = cls.base_queryset()

        if not filters:
            return queryset.order_by("-created_at")

        search = filters.get("search")
        category = filters.get("category")
        featured = filters.get("featured")
        new_arrival = filters.get("new_arrival")
        best_seller = filters.get("best_seller")

        if search:
            queryset = queryset.filter(
                Q(name__icontains=search)
                | Q(slug__icontains=search)
                | Q(sku__icontains=search)
                | Q(short_description__icontains=search)
            )

        if category:
            queryset = queryset.filter(category_id=category)

        if featured not in [None, ""]:
            queryset = queryset.filter(
                featured=str(featured).lower() == "true"
            )

        if new_arrival not in [None, ""]:
            queryset = queryset.filter(
                new_arrival=str(new_arrival).lower() == "true"
            )

        if best_seller not in [None, ""]:
            queryset = queryset.filter(
                best_seller=str(best_seller).lower() == "true"
            )

        return queryset.order_by("-created_at")

    @classmethod
    def get_product(cls, product_id):
        return cls.base_queryset().get(pk=product_id)

    @staticmethod
    def get_dashboard_stats():

        return {
            "total_products": Product.objects.count(),
            "featured_products": Product.objects.filter(featured=True).count(),
            "new_arrivals": Product.objects.filter(new_arrival=True).count(),
            "best_sellers": Product.objects.filter(best_seller=True).count(),
        }

class AdminCategorySelector:
    """
    Category Management selector for Admin Panel.
    """

    @staticmethod
    def base_queryset():
        return Category.objects.all()

    @classmethod
    def get_categories(cls, filters=None):
        queryset = cls.base_queryset()

        if filters:
            search = filters.get("search")

            if search:
                queryset = queryset.filter(
                    Q(name__icontains=search)
                    | Q(slug__icontains=search)
                    | Q(description__icontains=search)
                )

        return queryset.order_by("display_order", "name")

    @classmethod
    def get_category(cls, category_id):
        return cls.base_queryset().get(pk=category_id)

    @staticmethod
    def get_dashboard_stats():
        return {
            "total_categories": Category.objects.count(),
            "active_categories": Category.objects.filter(is_active=True).count(),
            "inactive_categories": Category.objects.filter(is_active=False).count(),
        }