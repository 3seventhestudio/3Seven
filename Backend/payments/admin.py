from django.contrib import admin
from .models import PaymentTransaction


@admin.register(PaymentTransaction)
class PaymentTransactionAdmin(admin.ModelAdmin):
    list_display = (
        "order",
        "payment_gateway",
        "razorpay_order_id",
        "amount",
        "status",
        "created_at",
    )
    list_filter = (
        "status",
        "payment_gateway",
        "created_at",
    )
    search_fields = (
        "order__order_number",
        "razorpay_order_id",
        "razorpay_payment_id",
    )
    readonly_fields = (
        "order",
        "payment_gateway",
        "razorpay_order_id",
        "razorpay_payment_id",
        "razorpay_signature",
        "amount",
        "currency",
        "status",
    )
