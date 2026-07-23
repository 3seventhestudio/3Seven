from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from common.responses import success_response, error_response

from inventory.serializers import (
    InventoryListSerializer,
    InventoryUpdateSerializer,
)
from inventory.services import InventoryService


class InventoryListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        inventory = InventoryService.get_inventory(request.query_params)

        serializer = InventoryListSerializer(
            inventory,
            many=True,
        )

        return success_response(
            message="Inventory fetched successfully.",
            data=serializer.data,
        )


class InventoryUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, variant_id):
        variant = InventoryService.get_variant(variant_id)

        serializer = InventoryUpdateSerializer(data=request.data)

        if not serializer.is_valid():
            return error_response(
                message="Validation failed.",
                errors=serializer.errors,
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        try:
            variant = InventoryService.update_stock(
                variant=variant,
                quantity=serializer.validated_data["quantity"],
                transaction_type=serializer.validated_data["transaction_type"],
                remarks=serializer.validated_data.get("remarks", ""),
            )

            return success_response(
                message="Inventory updated successfully.",
                data=InventoryListSerializer(variant).data,
            )

        except ValueError as e:
            return error_response(
                message=str(e),
                status_code=status.HTTP_400_BAD_REQUEST,
            )