from django.urls import path
from .views import (
    WishlistListAPIView,
    WishlistToggleAPIView,
    WishlistRemoveAPIView,
)

app_name = "wishlist"

urlpatterns = [
    path("", WishlistListAPIView.as_view(), name="wishlist-list"),
    path("toggle/", WishlistToggleAPIView.as_view(), name="wishlist-toggle"),
    path("<uuid:item_id>/", WishlistRemoveAPIView.as_view(), name="wishlist-remove"),
]
