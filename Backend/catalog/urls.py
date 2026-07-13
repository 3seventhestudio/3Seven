from django.urls import path
from .views import (CategoryListAPIView, ProductListAPIView, ProductDetailAPIView, FeaturedProductAPIView, NewArrivalProductAPIView, BestSellerProductAPIView)

urlpatterns = [

    path("categories/", CategoryListAPIView.as_view(), name="category-list"),
    path("products/", ProductListAPIView.as_view(), name="product-list"),
    path("products/featured/", FeaturedProductAPIView.as_view(), name="featured-products"),
    path("products/new-arrivals/", NewArrivalProductAPIView.as_view(), name="new-arrivals"),
    path("products/best-sellers/", BestSellerProductAPIView.as_view(), name="best-sellers"),
    path("products/<slug:slug>/", ProductDetailAPIView.as_view(), name="product-detail"),
]