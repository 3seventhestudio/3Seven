from django.urls import path

from .views import (
    BannerDetailAPIView,
    BannerListAPIView,
    FAQListAPIView,
    NewsletterSubscribeAPIView,
    PageDetailAPIView,
    PageListAPIView,
    SiteSettingAPIView,
)


urlpatterns = [

    # Banners
    path(
        "banners/",
        BannerListAPIView.as_view(),
        name="cms-banner-list",
    ),

    path(
        "banners/<uuid:banner_id>/",
        BannerDetailAPIView.as_view(),
        name="cms-banner-detail",
    ),


    # Pages
    path(
        "pages/",
        PageListAPIView.as_view(),
        name="cms-page-list",
    ),

    path(
        "pages/<slug:slug>/",
        PageDetailAPIView.as_view(),
        name="cms-page-detail",
    ),


    # Site Settings
    path(
        "settings/",
        SiteSettingAPIView.as_view(),
        name="cms-settings",
    ),


    # FAQ
    path(
        "faqs/",
        FAQListAPIView.as_view(),
        name="cms-faq-list",
    ),


    # Newsletter
    path(
        "newsletter/subscribe/",
        NewsletterSubscribeAPIView.as_view(),
        name="cms-newsletter-subscribe",
    ),
]