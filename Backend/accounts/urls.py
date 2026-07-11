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
]