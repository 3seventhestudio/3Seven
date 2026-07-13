from django.contrib import admin

from .models import Cart, CartItem


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):

    list_display = ("user", "created_at")
    search_fields = ("user__email",)
    inlines = [CartItemInline]


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):

    list_display = ("cart", "product_variant", "quantity")
    search_fields = ("cart__user__email", "product_variant__sku")