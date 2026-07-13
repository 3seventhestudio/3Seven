from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from common.responses import success_response, error_response
from cart.selectors import CartSelector
from cart.serializers import AddToCartSerializer, UpdateCartItemSerializer, CartItemSerializer
from cart.services import CartService


class CartAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            cart = CartSelector.get_cart(request.user)
            serializer = CartItemSerializer(cart.items.all(), many=True)

            subtotal = sum(item.total_price for item in cart.items.all())
            total_items = sum(item.quantity for item in cart.items.all())

            return success_response(
                data={
                    "items": serializer.data,
                    "total_items": total_items,
                    "subtotal": subtotal,
                },
                message="Cart fetched successfully.",
            )

        except Exception:
            return success_response(
                data={
                    "items": [],
                    "total_items": 0,
                    "subtotal": 0,
                },
                message="Cart is empty.",
            )


class AddToCartAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = AddToCartSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            CartService.add_to_cart(
                user=request.user,
                product_variant_id=serializer.validated_data["product_variant_id"],
                quantity=serializer.validated_data["quantity"],
            )

            return success_response(message="Product added to cart successfully.")

        except ValueError as e:
            return error_response(message=str(e), status_code=status.HTTP_400_BAD_REQUEST)


class UpdateCartItemAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, cart_item_id):

        serializer = UpdateCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            CartService.update_cart_item(
                user=request.user,
                cart_item_id=cart_item_id,
                quantity=serializer.validated_data["quantity"],
            )

            return success_response(message="Cart updated successfully.")

        except ValueError as e:
            return error_response(message=str(e), status_code=status.HTTP_400_BAD_REQUEST)


class RemoveCartItemAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, cart_item_id):

        CartService.remove_cart_item(
            user=request.user,
            cart_item_id=cart_item_id,
        )

        return success_response(message="Product removed from cart successfully.")