from django.urls import path

from inventory.views import (
    InventoryListAPIView,
    InventoryUpdateAPIView,
)

urlpatterns = [
    path(
        "",
        InventoryListAPIView.as_view(),
        name="admin-inventory",
    ),
    path(
        "<uuid:variant_id>/",
        InventoryUpdateAPIView.as_view(),
        name="admin-inventory-update",
    ),
]