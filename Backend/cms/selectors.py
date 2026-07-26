from .models import (
    Banner,
    FAQ,
    NewsletterSubscriber,
    Page,
    SEO,
    SiteSetting,
)


class BannerSelector:

    @staticmethod
    def get_active_banners():
        return Banner.objects.filter(
            is_active=True,
        ).order_by(
            "display_order",
            "-created_at",
        )


class PageSelector:

    @staticmethod
    def get_active_pages():
        return Page.objects.filter(
            is_active=True,
        ).order_by(
            "title",
        )

    @staticmethod
    def get_page_by_slug(slug):
        return Page.objects.filter(
            slug=slug,
            is_active=True,
        ).first()


class SEOSelector:

    @staticmethod
    def get_seo_by_page(page):
        return SEO.objects.filter(
            page=page,
        ).first()


class SiteSettingSelector:

    @staticmethod
    def get_site_setting():
        return SiteSetting.objects.filter(
            is_active=True,
        ).first()


class FAQSelector:

    @staticmethod
    def get_active_faqs():
        return FAQ.objects.filter(
            is_active=True,
        ).order_by(
            "display_order",
            "-created_at",
        )


class NewsletterSelector:

    @staticmethod
    def get_subscribers():
        return NewsletterSubscriber.objects.all().order_by(
            "-created_at",
        )