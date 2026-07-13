from django.db import models

from common.models import BaseModel


class SiteSetting(BaseModel):

    company_name = models.CharField(max_length=200)

    company_email = models.EmailField()

    company_phone = models.CharField(max_length=20)

    gst_number = models.CharField(max_length=50, blank=True)

    logo = models.ImageField(upload_to="settings/", blank=True, null=True)

    warehouse_contact_name = models.CharField(max_length=200)

    warehouse_phone = models.CharField(max_length=20)

    warehouse_email = models.EmailField(blank=True)

    address_line_1 = models.CharField(max_length=255)

    address_line_2 = models.CharField(max_length=255, blank=True)

    city = models.CharField(max_length=100)

    state = models.CharField(max_length=100)

    country = models.CharField(max_length=100, default="India")

    postal_code = models.CharField(max_length=10)

    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "site_settings"
        verbose_name = "Site Setting"
        verbose_name_plural = "Site Settings"

    def __str__(self):
        return self.company_name