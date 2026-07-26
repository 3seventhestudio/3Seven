from rest_framework import serializers

from .models import (
    Banner,
    Page,
    SEO,
    SiteSetting,
    FAQ,
    NewsletterSubscriber,
)


class BannerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Banner
        fields = [
            "id",
            "title",
            "subtitle",
            "banner_type",
            "image",
            "mobile_image",
            "button_text",
            "button_link",
            "display_order",
            "is_active",
            "created_at",
            "updated_at",
        ]


class PageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Page
        fields = [
            "id",
            "title",
            "slug",
            "content",
            "is_active",
            "created_at",
            "updated_at",
        ]


class SEOSerializer(serializers.ModelSerializer):

    class Meta:
        model = SEO
        fields = [
            "id",
            "page",
            "meta_title",
            "meta_description",
            "keywords",
            "canonical_url",
            "og_image",
            "created_at",
            "updated_at",
        ]


class SiteSettingSerializer(serializers.ModelSerializer):

    class Meta:
        model = SiteSetting
        fields = [
            "id",
            "company_name",
            "company_email",
            "company_phone",
            "gst_number",
            "logo",
            "warehouse_contact_name",
            "warehouse_phone",
            "warehouse_email",
            "address_line_1",
            "address_line_2",
            "city",
            "state",
            "country",
            "postal_code",
            "footer_content",
            "instagram_url",
            "facebook_url",
            "maintenance_mode",
            "is_active",
            "created_at",
            "updated_at",
        ]


class FAQSerializer(serializers.ModelSerializer):

    class Meta:
        model = FAQ
        fields = [
            "id",
            "question",
            "answer",
            "display_order",
            "is_active",
            "created_at",
            "updated_at",
        ]


class NewsletterSubscriberSerializer(serializers.ModelSerializer):

    class Meta:
        model = NewsletterSubscriber
        fields = [
            "id",
            "email",
            "is_active",
            "created_at",
            "updated_at",
        ]