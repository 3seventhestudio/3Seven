from django.urls import path

from .views import (
    CartAPIView,
    AddToCartAPIView,
    UpdateCartItemAPIView,
    RemoveCartItemAPIView,
)

urlpatterns = [
    path("", CartAPIView.as_view(), name="cart"),
    path("add/", AddToCartAPIView.as_view(), name="cart-add"),
    path("items/<uuid:cart_item_id>/", UpdateCartItemAPIView.as_view(), name="cart-update"),
    path("items/<uuid:cart_item_id>/delete/", RemoveCartItemAPIView.as_view(), name="cart-delete"),
]