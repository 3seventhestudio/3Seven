import uuid

from django.db import models

from common.models import BaseModel


class BannerType(models.TextChoices):
    HERO = "hero", "Hero Banner"
    COLLECTION = "collection", "Collection Banner"
    PROMOTION = "promotion", "Promotion Banner"


class Banner(BaseModel):

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    title = models.CharField(
        max_length=150,
    )

    subtitle = models.CharField(
        max_length=255,
        blank=True,
    )

    banner_type = models.CharField(
        max_length=20,
        choices=BannerType.choices,
        default=BannerType.HERO,
    )

    image = models.ImageField(
        upload_to="cms/banners/",
    )

    mobile_image = models.ImageField(
        upload_to="cms/banners/mobile/",
        blank=True,
        null=True,
    )

    button_text = models.CharField(
        max_length=50,
        blank=True,
    )

    button_link = models.CharField(
        max_length=255,
        blank=True,
    )

    display_order = models.PositiveIntegerField(
        default=0,
    )

    is_active = models.BooleanField(
        default=True,
    )

    class Meta:
        db_table = "cms_banners"
        ordering = [
            "display_order",
            "-created_at",
        ]

    def __str__(self):
        return self.title


class Page(BaseModel):

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    title = models.CharField(
        max_length=150,
    )

    slug = models.SlugField(
        unique=True,
        db_index=True,
    )

    content = models.TextField()

    is_active = models.BooleanField(
        default=True,
    )

    class Meta:
        db_table = "cms_pages"
        ordering = [
            "title",
        ]

    def __str__(self):
        return self.title


class SEO(BaseModel):

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    page = models.OneToOneField(
        Page,
        on_delete=models.CASCADE,
        related_name="seo",
    )

    meta_title = models.CharField(
        max_length=255,
        blank=True,
    )

    meta_description = models.TextField(
        blank=True,
    )

    keywords = models.TextField(
        blank=True,
    )

    canonical_url = models.URLField(
        blank=True,
    )

    og_image = models.ImageField(
        upload_to="cms/seo/",
        blank=True,
        null=True,
    )

    class Meta:
        db_table = "cms_seo"


class SiteSetting(BaseModel):

    company_name = models.CharField(
        max_length=200
    )

    company_email = models.EmailField()

    company_phone = models.CharField(
        max_length=20
    )

    gst_number = models.CharField(
        max_length=50,
        blank=True
    )

    logo = models.ImageField(
        upload_to="settings/",
        blank=True,
        null=True
    )

    warehouse_contact_name = models.CharField(
        max_length=200
    )

    warehouse_phone = models.CharField(
        max_length=20
    )

    warehouse_email = models.EmailField(
        blank=True
    )

    address_line_1 = models.CharField(
        max_length=255
    )

    address_line_2 = models.CharField(
        max_length=255,
        blank=True
    )

    city = models.CharField(
        max_length=100
    )

    state = models.CharField(
        max_length=100
    )

    country = models.CharField(
        max_length=100,
        default="India"
    )

    postal_code = models.CharField(
        max_length=10
    )

    footer_content = models.TextField(
        blank=True
    )

    instagram_url = models.URLField(
        blank=True
    )

    facebook_url = models.URLField(
        blank=True
    )

    maintenance_mode = models.BooleanField(
        default=False
    )

    is_active = models.BooleanField(
        default=True
    )

    class Meta:
        db_table = "site_settings"
        verbose_name = "Site Setting"
        verbose_name_plural = "Site Settings"

    def __str__(self):
        return self.company_name


class FAQ(BaseModel):

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    question = models.CharField(
        max_length=255
    )

    answer = models.TextField()

    display_order = models.PositiveIntegerField(
        default=0
    )

    is_active = models.BooleanField(
        default=True
    )

    class Meta:
        db_table = "cms_faq"
        ordering = [
            "display_order",
            "-created_at",
        ]

    def __str__(self):
        return self.question


class NewsletterSubscriber(BaseModel):

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    email = models.EmailField(
        unique=True
    )

    is_active = models.BooleanField(
        default=True
    )

    class Meta:
        db_table = "cms_newsletter_subscribers"
        ordering = [
            "-created_at",
        ]

    def __str__(self):
        return self.email