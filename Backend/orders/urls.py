from django.urls import path

from .views import CheckoutAPIView, OrderListAPIView, OrderDetailAPIView

urlpatterns = [
    path("checkout/", CheckoutAPIView.as_view(), name="checkout"),
    path("", OrderListAPIView.as_view(), name="order-list"),
    path("<str:order_number>/", OrderDetailAPIView.as_view(), name="order-detail")
]