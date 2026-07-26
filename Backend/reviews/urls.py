from django.urls import path

from reviews.views import (
    ProductReviewListAPIView,
    ReviewCreateAPIView,
    ReviewDetailAPIView,
    AdminReviewListAPIView,
    AdminReviewDetailAPIView,
)

urlpatterns = [
    # Customer
    path(
        "products/<slug:slug>/",
        ProductReviewListAPIView.as_view(),
        name="product-reviews",
    ),
    path(
        "products/<slug:slug>/create/",
        ReviewCreateAPIView.as_view(),
        name="review-create",
    ),
    path(
        "<uuid:pk>/",
        ReviewDetailAPIView.as_view(),
        name="review-detail",
    ),

    # Admin
    path(
        "admin/",
        AdminReviewListAPIView.as_view(),
        name="admin-review-list",
    ),
    path(
        "admin/<uuid:pk>/",
        AdminReviewDetailAPIView.as_view(),
        name="admin-review-detail",
    ),
]