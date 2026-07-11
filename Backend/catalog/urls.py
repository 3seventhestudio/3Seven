from django.urls import path
from .views import (CategoryListAPIView, ProductListAPIView, ProductDetailAPIView, FeaturedProductAPIView)

urlpatterns = [

    path("categories/", CategoryListAPIView.as_view(), name="category-list"),
    path("products/", ProductListAPIView.as_view(), name="product-list"),
    path("products/featured/", FeaturedProductAPIView.as_view(), name="featured-products"),
    path("products/<slug:slug>/", ProductDetailAPIView.as_view(), name="product-detail"),
]