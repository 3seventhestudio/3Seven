from catalog.models import ProductVariant

from inventory.models import InventoryTransaction
from inventory.selectors import InventorySelector


class InventoryService:

    @staticmethod
    def get_inventory(filters=None):
        return InventorySelector.get_inventory(filters)

    @staticmethod
    def get_variant(variant_id):
        return InventorySelector.get_variant(variant_id)

    @staticmethod
    def update_stock(variant, quantity, transaction_type, remarks=""):

        previous_stock = variant.stock_quantity

        if transaction_type == InventoryTransaction.TRANSACTION_IN:
            variant.stock_quantity += quantity

        elif transaction_type == InventoryTransaction.TRANSACTION_OUT:
            if quantity > variant.stock_quantity:
                raise ValueError("Insufficient stock.")

            variant.stock_quantity -= quantity

        elif transaction_type == InventoryTransaction.TRANSACTION_ADJUSTMENT:
            variant.stock_quantity = quantity

        variant.save()

        InventoryTransaction.objects.create(
            product_variant=variant,
            transaction_type=transaction_type,
            quantity=quantity,
            previous_stock=previous_stock,
            current_stock=variant.stock_quantity,
            remarks=remarks,
        )

        return variant