from django.urls import path

from .views import CheckoutAPIView, OrderListAPIView, OrderDetailAPIView, AdminOrderListAPIView, AdminOrderDetailAPIView

urlpatterns = [
    path("checkout/", CheckoutAPIView.as_view(), name="checkout"),
    path("", OrderListAPIView.as_view(), name="order-list"),
    path("<str:order_number>/", OrderDetailAPIView.as_view(), name="order-detail"),
    path("admin/", AdminOrderListAPIView.as_view(), name="admin-orders"),
    path("admin/<uuid:order_id>/", AdminOrderDetailAPIView.as_view(), name="admin-order-detail")
]