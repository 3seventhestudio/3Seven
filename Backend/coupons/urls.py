from django.urls import path

from .views import (
    AdminCouponListAPIView,
    AdminCouponDetailAPIView,
    AdminProductDropdownAPIView,
)

urlpatterns = [
    path(
        "admin/",
        AdminCouponListAPIView.as_view(),
        name="admin-coupon-list",
    ),
    path(
        "admin/<uuid:coupon_id>/",
        AdminCouponDetailAPIView.as_view(),
        name="admin-coupon-detail",
    ),
    path(
        "admin/products/dropdown/",
        AdminProductDropdownAPIView.as_view(),
        name="admin-product-dropdown",
    ),
]