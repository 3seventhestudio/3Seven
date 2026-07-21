from django.contrib import admin

from .models import StoreSettings


@admin.register(StoreSettings)
class StoreSettingsAdmin(admin.ModelAdmin):
    """
    Admin for global store configuration.
    Only one StoreSettings record should exist.
    """

    fieldsets = (
        (
            "Store Information",
            {
                "fields": (
                    "store_name",
                    "currency",
                    "support_email",
                    "support_phone",
                    "maintenance_mode",
                )
            },
        ),
        (
            "Tax",
            {
                "fields": (
                    "gst_enabled",
                    "gst_percentage",
                )
            },
        ),
        (
            "Shipping",
            {
                "fields": (
                    "free_shipping",
                    "shipping_charge",
                )
            },
        ),
        (
            "Cash On Delivery",
            {
                "fields": (
                    "cod_enabled",
                    "cod_charge",
                )
            },
        ),
        (
            "Coupons",
            {
                "fields": (
                    "coupon_enabled",
                )
            },
        ),
        (
            "Payment Gateway",
            {
                "fields": (
                    "payment_gateway_enabled",
                    "payment_gateway",
                    "upi_enabled",
                    "card_enabled",
                    "wallet_enabled",
                    "netbanking_enabled",
                    "payment_gateway_key",
                    "payment_gateway_secret",
                    "webhook_secret",
                )
            },
        ),
    )

    def has_add_permission(self, request):
        """
        Allow only one StoreSettings record.
        """
        return not StoreSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        """
        Prevent deletion of the StoreSettings record.
        """
        return False