from django.urls import path
from .views import CreateRazorpayOrderAPIView, VerifyRazorpayPaymentAPIView

app_name = "payments"

urlpatterns = [
    path(
        "create-razorpay-order/",
        CreateRazorpayOrderAPIView.as_view(),
        name="create-razorpay-order",
    ),
    path(
        "verify-razorpay-payment/",
        VerifyRazorpayPaymentAPIView.as_view(),
        name="verify-razorpay-payment",
    ),
]
