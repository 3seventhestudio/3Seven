from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import User, Address


class AddressInline(admin.TabularInline):
    model = Address
    extra = 0
    fields = ("full_name", "phone_number", "city", "state", "country", "address_type", "is_default")


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    ordering = ("-created_at",)
    list_display = ( "email", "first_name", "last_name", "phone_number", "email_verified", "is_active", "is_staff", "created_at")
    list_filter = ("email_verified", "is_active", "is_staff", "is_superuser")
    search_fields = ("email", "first_name", "last_name", "phone_number")
    readonly_fields = ( "last_login", "created_at", "updated_at")
    fieldsets = (
        (
            "Login Information",
            {
                "fields": (
                    "email",
                    "password",
                )
            },
        ),
        (
            "Personal Information",
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "phone_number",
                    "email_verified",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        (
            "Important Dates",
            {
                "fields": (
                    "last_login",
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "first_name",
                    "last_name",
                    "phone_number",
                    "password1",
                    "password2",
                    "is_active",
                    "is_staff",
                ),
            },
        ),
    )

    inlines = [AddressInline]


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "full_name",
        "city",
        "state",
        "postal_code",
        "address_type",
        "is_default",
    )

    search_fields = (
        "full_name",
        "phone_number",
        "city",
        "postal_code",
    )

    list_filter = (
        "address_type",
        "is_default",
        "state",
    )