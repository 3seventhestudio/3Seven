from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema
from accounts.models import Address
from common.responses import success_response, error_response
from orders.models import Order
from orders.serializers import CheckoutSerializer, OrderSerializer
from orders.services import OrderService


class CheckoutAPIView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CheckoutSerializer

    @extend_schema(
        operation_id="checkout_order",
        tags=["Orders"],
        request=CheckoutSerializer,
        responses={201: OrderSerializer},
    )
    def post(self, request):
        serializer = CheckoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            address = Address.objects.get(
                pk=serializer.validated_data["address_id"],
                user=request.user,
            )

            print("Authenticated User ID:", request.user.id)
            print("Authenticated Email:", request.user.email)
            order = OrderService.create_order(
                user=request.user,
                address=address,
                payment_method=serializer.validated_data["payment_method"],
                notes=serializer.validated_data.get("notes", ""),
            )

            return success_response(
                data=OrderSerializer(
                    order,
                    context={"request": request},
                ).data,
                message="Order created successfully.",
            )

        except Address.DoesNotExist:
            return error_response(
                message="Address not found.",
                status_code=status.HTTP_404_NOT_FOUND,
            )

        except ValueError as ex:
            return error_response(
                message=str(ex),
                status_code=status.HTTP_400_BAD_REQUEST,
            )

@extend_schema(
    tags=["Orders"],
    summary="List Orders",
    responses=OrderSerializer(many=True),
)
class OrderListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = (
            Order.objects
            .filter(user=request.user)
            .prefetch_related("items")
            .order_by("-created_at")
        )

        serializer = OrderSerializer(
            orders,
            many=True,
            context={"request": request},
        )

        return success_response(
            data=serializer.data,
            message="Orders fetched successfully.",
        )

@extend_schema(
    tags=["Orders"],
    summary="Order Details",
    responses=OrderSerializer,
)
class OrderDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_number):
        try:
            order = (
                Order.objects
                .prefetch_related("items")
                .get(
                    order_number=order_number,
                    user=request.user,
                )
            )

            serializer = OrderSerializer(
                order,
                context={"request": request},
            )

            return success_response(
                data=serializer.data,
                message="Order fetched successfully.",
            )

        except Order.DoesNotExist:
            return error_response(
                message="Order not found.",
                status_code=status.HTTP_404_NOT_FOUND,
            )