from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from common.responses import success_response, error_response
from .serializers import CreateRazorpayOrderSerializer, VerifyRazorpayPaymentSerializer
from .services import RazorpayService


class CreateRazorpayOrderAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CreateRazorpayOrderSerializer(data=request.data)
        if not serializer.is_valid():
            return error_response(
                message="Validation failed.",
                errors=serializer.errors,
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        try:
            data = RazorpayService.create_razorpay_order(
                user=request.user,
                order_number=serializer.validated_data["order_number"],
            )
            return success_response(
                message="Razorpay order created successfully.",
                data=data,
            )
        except Exception as e:
            return error_response(
                message=str(e),
                status_code=status.HTTP_400_BAD_REQUEST,
            )


class VerifyRazorpayPaymentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = VerifyRazorpayPaymentSerializer(data=request.data)
        if not serializer.is_valid():
            return error_response(
                message="Validation failed.",
                errors=serializer.errors,
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        success, message, order = RazorpayService.verify_payment(
            user=request.user,
            order_number=serializer.validated_data["order_number"],
            razorpay_order_id=serializer.validated_data["razorpay_order_id"],
            razorpay_payment_id=serializer.validated_data["razorpay_payment_id"],
            razorpay_signature=serializer.validated_data["razorpay_signature"],
        )

        if success:
            return success_response(
                message=message,
                data={"order_number": order.order_number},
            )
        else:
            return error_response(
                message=message,
                status_code=status.HTTP_400_BAD_REQUEST,
            )
