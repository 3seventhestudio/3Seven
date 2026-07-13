from .models import SiteSetting


class SiteSettingSelector:

    @staticmethod
    def get_site_setting():
        return SiteSetting.objects.get(is_active=True)