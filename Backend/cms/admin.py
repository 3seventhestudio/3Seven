from django.contrib import admin

from .models import SiteSetting, Banner, Page, SEO, FAQ, NewsletterSubscriber


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


@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ('title', 'banner_type', 'display_order', 'is_active')
    list_filter = ('banner_type', 'is_active')
    search_fields = ('title', 'subtitle')


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'is_active')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title',)


@admin.register(SEO)
class SEOAdmin(admin.ModelAdmin):
    list_display = ('page', 'meta_title')
    search_fields = ('meta_title',)


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'display_order', 'is_active')
    list_editable = ('display_order', 'is_active')
    ordering = ('display_order',)


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'is_active', 'created_at')
    list_filter = ('is_active',)
    search_fields = ('email',)