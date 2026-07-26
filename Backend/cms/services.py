from django.db import transaction

from .models import (
    Banner,
    FAQ,
    NewsletterSubscriber,
    Page,
    SEO,
    SiteSetting,
)
from .selectors import (
    BannerSelector,
    FAQSelector,
    NewsletterSelector,
    PageSelector,
    SEOSelector,
    SiteSettingSelector,
)


class BannerService:

    @staticmethod
    def get_active_banners():
        return BannerSelector.get_active_banners()

    @staticmethod
    @transaction.atomic
    def create_banner(validated_data):
        return Banner.objects.create(
            **validated_data
        )

    @staticmethod
    @transaction.atomic
    def update_banner(
        banner,
        validated_data,
    ):
        for field, value in validated_data.items():
            setattr(
                banner,
                field,
                value,
            )

        banner.save()

        return banner

    @staticmethod
    def delete_banner(banner):
        banner.delete()


class PageService:

    @staticmethod
    def get_pages():
        return PageSelector.get_active_pages()

    @staticmethod
    def get_page(slug):
        return PageSelector.get_page_by_slug(
            slug
        )

    @staticmethod
    @transaction.atomic
    def create_page(validated_data):
        return Page.objects.create(
            **validated_data
        )

    @staticmethod
    @transaction.atomic
    def update_page(
        page,
        validated_data,
    ):
        for field, value in validated_data.items():
            setattr(
                page,
                field,
                value,
            )

        page.save()

        return page

    @staticmethod
    def delete_page(page):
        page.delete()


class SEOService:

    @staticmethod
    def get_seo(page):
        return SEOSelector.get_seo_by_page(
            page
        )

    @staticmethod
    @transaction.atomic
    def create_or_update_seo(
        page,
        validated_data,
    ):

        seo, _ = SEO.objects.update_or_create(
            page=page,
            defaults=validated_data,
        )

        return seo


class SiteSettingService:

    @staticmethod
    def get_setting():
        return SiteSettingSelector.get_site_setting()

    @staticmethod
    @transaction.atomic
    def update_setting(
        setting,
        validated_data,
    ):

        for field, value in validated_data.items():
            setattr(
                setting,
                field,
                value,
            )

        setting.save()

        return setting


class FAQService:

    @staticmethod
    def get_faqs():
        return FAQSelector.get_active_faqs()

    @staticmethod
    @transaction.atomic
    def create_faq(validated_data):
        return FAQ.objects.create(
            **validated_data
        )

    @staticmethod
    @transaction.atomic
    def update_faq(
        faq,
        validated_data,
    ):

        for field, value in validated_data.items():
            setattr(
                faq,
                field,
                value,
            )

        faq.save()

        return faq

    @staticmethod
    def delete_faq(faq):
        faq.delete()


class NewsletterService:

    @staticmethod
    def get_subscribers():
        return NewsletterSelector.get_subscribers()

    @staticmethod
    @transaction.atomic
    def subscribe(email):

        subscriber, created = NewsletterSubscriber.objects.get_or_create(
            email=email,
            defaults={
                "is_active": True,
            },
        )

        if not created and not subscriber.is_active:
            subscriber.is_active = True
            subscriber.save()

        return subscriber