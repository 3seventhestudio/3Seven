from decimal import Decimal


class PackageCalculator:

    @staticmethod
    def calculate(order, custom_weight=None, custom_length=None, custom_width=None, custom_height=None):
        """
        Calculates exact parcel weight and dimensions based on order items.
        Allows Admin override if custom weight/dimensions are provided.
        """
        total_weight = Decimal("0.00")
        total_quantity = 0

        for item in order.items.select_related("product_variant__product"):
            prod = getattr(item.product_variant, "product", None)
            unit_weight = getattr(prod, "weight", Decimal("0.60")) if prod else Decimal("0.60")
            total_weight += Decimal(str(unit_weight)) * item.quantity
            total_quantity += item.quantity

        # Default dimension heuristics based on item quantity
        if total_quantity == 1:
            default_len, default_wid, default_hei = 35, 28, 5
        elif total_quantity <= 3:
            default_len, default_wid, default_hei = 40, 32, 10
        else:
            default_len, default_wid, default_hei = 48, 36, 16

        length = int(custom_length) if custom_length and int(custom_length) > 0 else default_len
        width = int(custom_width) if custom_width and int(custom_width) > 0 else default_wid
        height = int(custom_height) if custom_height and int(custom_height) > 0 else default_hei
        weight = float(custom_weight) if custom_weight and float(custom_weight) > 0 else max(0.5, float(total_weight))

        return {
            "length": length,
            "width": width,
            "height": height,
            "weight": round(weight, 2),
            "total_items": total_quantity,
        }