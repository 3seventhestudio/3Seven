from django.urls import path

from .views import (
    CheckoutAPIView,
    OrderListAPIView,
    OrderDetailAPIView,
    AdminOrderListAPIView,
    AdminOrderDetailAPIView,
    AdminAcceptAndShipOrderAPIView,
    AdminOrderShippingQuotesAPIView,
    AdminOrderShippingLabelAPIView,
)

urlpatterns = [
    path("checkout/", CheckoutAPIView.as_view(), name="checkout"),
    path("admin/", AdminOrderListAPIView.as_view(), name="admin-orders"),
    path("admin/<uuid:order_id>/", AdminOrderDetailAPIView.as_view(), name="admin-order-detail"),
    path("admin/<uuid:order_id>/accept-and-ship/", AdminAcceptAndShipOrderAPIView.as_view(), name="admin-order-accept-ship"),
    path("admin/<uuid:order_id>/shipping-quotes/", AdminOrderShippingQuotesAPIView.as_view(), name="admin-order-shipping-quotes"),
    path("admin/<uuid:order_id>/shipping-label/", AdminOrderShippingLabelAPIView.as_view(), name="admin-order-shipping-label"),
    path("", OrderListAPIView.as_view(), name="order-list"),
    path("<str:order_number>/", OrderDetailAPIView.as_view(), name="order-detail"),
]