from django.contrib import admin

from .models import (
    Category,
    Product,
    ProductImage,
    ProductVariant,
    Size,
    Color,
)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "display_order",
        "is_active",
    )

    prepopulated_fields = {
        "slug": ("name",)
    }

    ordering = (
        "display_order",
        "name",
    )

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

@admin.register(Size)
class SizeAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "display_order",
        "is_active",
    )

    ordering = (
        "display_order",
    )


@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "hex_code",
        "is_active",
    )

class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

    inlines = [
    ProductImageInline,
    ProductVariantInline]
    
    list_display = (
        "name",
        "category",
        "price",
        "stock_quantity",
        "featured",
        "new_arrival",
        "best_seller",
        "is_active",
    )

    list_filter = (
        "category",
        "featured",
        "new_arrival",
        "best_seller",
        "is_active",
    )

    search_fields = (
        "name",
        "sku",
    )

    prepopulated_fields = {
        "slug": ("name",)
    }

    list_editable = (
        "featured",
        "new_arrival",
        "best_seller",
    )