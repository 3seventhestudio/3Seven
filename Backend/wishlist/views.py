from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from common.responses import success_response, error_response

from .selectors import WishlistSelector
from .services import WishlistService
from .serializers import (
    WishlistItemSerializer,
    ToggleWishlistSerializer,
)


class WishlistListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        items = WishlistSelector.get_wishlist(request.user)
        serializer = WishlistItemSerializer(items, many=True)
        return success_response(
            message="Wishlist fetched successfully.",
            data=serializer.data,
        )


class WishlistToggleAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ToggleWishlistSerializer(data=request.data)
        if not serializer.is_valid():
            return error_response(
                message="Validation failed.",
                errors=serializer.errors,
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        item, was_added = WishlistService.toggle(
            user=request.user,
            product_id=serializer.validated_data["product_id"],
        )

        if was_added:
            return success_response(
                message="Product added to wishlist.",
                data={"in_wishlist": True},
                status_code=status.HTTP_201_CREATED,
            )

        return success_response(
            message="Product removed from wishlist.",
            data={"in_wishlist": False},
        )


class WishlistRemoveAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, item_id):
        try:
            WishlistService.remove(
                user=request.user,
                item_id=item_id,
            )
            return success_response(
                message="Item removed from wishlist.",
            )
        except Exception:
            return error_response(
                message="Wishlist item not found.",
                status_code=status.HTTP_404_NOT_FOUND,
            )
