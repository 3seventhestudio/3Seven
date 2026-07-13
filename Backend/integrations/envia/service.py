from cms.selectors import SiteSettingsSelector
from .client import EnviaClient
from .package import PackageCalculator
from .rate import RateService


class EnviaService:

    @staticmethod
    def get_shipping_quotes(order):

        company = SiteSettingsSelector.get_site_setting()

        address = order.address

        package = PackageCalculator.calculate(order)

        payload = {
            "origin": {
                "name": company.warehouse_contact_name,
                "company": company.company_name,
                "email": company.warehouse_email,
                "phone": company.warehouse_phone,
                "address1": company.address_line_1,
                "address2": company.address_line_2,
                "city": company.city,
                "state": company.state,
                "country": company.country,
                "postalCode": company.postal_code,
            },
            "destination": {
                "name": address.full_name,
                "email": order.user.email,
                "phone": address.phone_number,
                "address1": address.address_line_1,
                "address2": address.address_line_2,
                "city": address.city,
                "state": address.state,
                "country": address.country,
                "postalCode": address.postal_code,
            },
            "packages": [
                {
                    "content": "Women's Jeans",
                    "amount": package["weight"],
                    "type": "box",
                    "weight": package["weight"],
                    "length": package["length"],
                    "width": package["width"],
                    "height": package["height"],
                }
            ],
        }
        return RateService.get_rates(payload)