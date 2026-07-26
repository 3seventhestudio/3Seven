from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    RegisterAPIView,
    LoginAPIView,
    LogoutAPIView,
    ProfileAPIView,
    AddressListCreateAPIView,
    AddressDetailAPIView,
    AddressDefaultAPIView,
    DashboardAPIView,
    ChangePasswordAPIView,
    AdminCustomerListAPIView,
    AdminCustomerDetailAPIView,
    AdminDashboardAPIView
)

app_name = "accounts"

urlpatterns = [
    path("register/", RegisterAPIView.as_view(), name="register"),
    path("login/", LoginAPIView.as_view(), name="login"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", LogoutAPIView.as_view(), name="logout"),
    path("profile/", ProfileAPIView.as_view(), name="profile"),

    path("addresses/", AddressListCreateAPIView.as_view(), name="address-list"),
    path("addresses/<uuid:address_id>/", AddressDetailAPIView.as_view(), name="address-detail"),
    path("addresses/<uuid:address_id>/default/", AddressDefaultAPIView.as_view(), name="address-default"),
    path("dashboard/", DashboardAPIView.as_view(), name="dashboard"),
    path("change-password/", ChangePasswordAPIView.as_view(), name="change-password"),

    path("admin/customers/", AdminCustomerListAPIView.as_view(), name="admin-customers"),
    path("admin/customers/<uuid:customer_id>/", AdminCustomerDetailAPIView.as_view(), name="admin-customer-detail"),
    path("admin/dashboard/", AdminDashboardAPIView.as_view(), name="admin-dashboard"),
]