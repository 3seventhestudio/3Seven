from django.contrib import admin

from .models import SiteSetting


@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):

    list_display = (
        "company_name",
        "company_phone",
        "company_email",
        "city",
        "state",
        "is_active",
    )