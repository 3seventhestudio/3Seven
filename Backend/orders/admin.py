from django.contrib import admin, messages
from .services import OrderService
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = (
        "product_name",
        "sku",
        "size",
        "color",
        "quantity",
        "unit_price",
        "total_price",
    )


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):

    list_display = (
        "order_number",
        "user",
        "status",
        "payment_method",
        "payment_status",
        "grand_total",
        "created_at",
    )

    list_filter = (
        "status",
        "payment_status",
        "payment_method",
    )

    search_fields = (
        "order_number",
        "user__email",
    )

    inlines = [OrderItemInline]
    actions = ["confirm_orders"]

    @admin.action(description="Confirm selected orders")
    def confirm_orders(self, request, queryset):

        success_count = 0

        for order in queryset:

            try:
                OrderService.confirm_order(order)
                success_count += 1

            except ValueError as ex:
                self.message_user(
                    request,
                    f"{order.order_number}: {ex}",
                    level=messages.ERROR,
                )

        if success_count:
            self.message_user(
                request,
                f"{success_count} order(s) confirmed successfully.",
                level=messages.SUCCESS,
            )


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):

    list_display = (
        "order",
        "product_name",
        "quantity",
        "unit_price",
    )