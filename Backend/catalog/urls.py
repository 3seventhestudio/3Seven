from django.urls import path
from .views.customer import (CategoryListAPIView, ProductListAPIView, ProductDetailAPIView, FeaturedProductAPIView, NewArrivalProductAPIView, BestSellerProductAPIView)
from catalog.views.admin import ( AdminProductListAPIView, AdminProductDetailAPIView, AdminCategoryListAPIView, AdminCategoryDetailAPIView, AdminCategoryDropdownAPIView)

urlpatterns = [

    path("categories/", CategoryListAPIView.as_view(), name="category-list"),
    path("products/", ProductListAPIView.as_view(), name="product-list"),
    path("products/featured/", FeaturedProductAPIView.as_view(), name="featured-products"),
    path("products/new-arrivals/", NewArrivalProductAPIView.as_view(), name="new-arrivals"),
    path("products/best-sellers/", BestSellerProductAPIView.as_view(), name="best-sellers"),
    path("products/<slug:slug>/", ProductDetailAPIView.as_view(), name="product-detail"),
    path("admin/products/", AdminProductListAPIView.as_view(), name="admin-product-list"),
    path("admin/products/<uuid:product_id>/", AdminProductDetailAPIView.as_view(), name="admin-product-detail"),
    # Admin Category Management
    path("admin/categories/", AdminCategoryListAPIView.as_view(), name="admin-categories"),
    path("admin/categories/dropdown/", AdminCategoryDropdownAPIView.as_view(), name="admin-category-dropdown"),
    path("admin/categories/<uuid:category_id>/", AdminCategoryDetailAPIView.as_view(), name="admin-category-detail"),
]