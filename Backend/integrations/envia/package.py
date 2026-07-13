from decimal import Decimal


class PackageCalculator:

    @staticmethod
    def calculate(order):

        total_weight = Decimal("0.00")
        total_quantity = 0

        for item in order.items.select_related("product_variant"):

            total_weight += item.product_variant.weight * item.quantity
            total_quantity += item.quantity

        if total_quantity == 1:

            package = {
                "length": 35,
                "width": 28,
                "height": 4,
            }

        elif total_quantity <= 3:

            package = {
                "length": 40,
                "width": 32,
                "height": 8,
            }

        else:

            package = {
                "length": 45,
                "width": 35,
                "height": 12,
            }

        package["weight"] = float(total_weight)

        return package