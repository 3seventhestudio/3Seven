from django.shortcuts import get_object_or_404

from rest_framework.views import APIView

from common.pagination import StandardResultsPagination
from common.responses import success_response

from .selectors import (
    CategorySelector,
    ProductSelector,
)
from .serializers import (
    CategorySerializer,
    ProductListSerializer,
    ProductDetailSerializer,
)


class CategoryListAPIView(APIView):

    def get(self, request):

        categories = CategorySelector.get_active_categories()

        serializer = CategorySerializer(
            categories,
            many=True
        )

        return success_response(
            data=serializer.data,
            message="Categories fetched successfully."
        )


class ProductListAPIView(APIView):

    def get(self, request):

        queryset = ProductSelector.get_products(request.query_params)

        paginator = StandardResultsPagination()

        page = paginator.paginate_queryset(
            queryset,
            request
        )

        serializer = ProductListSerializer(
            page,
            many=True
        )

        return paginator.get_paginated_response({
            "success": True,
            "message": "Products fetched successfully.",
            "data": serializer.data,
        })


class ProductDetailAPIView(APIView):

    def get(self, request, slug):

        product = get_object_or_404(
            ProductSelector.get_products({}),
            slug=slug,
        )

        serializer = ProductDetailSerializer(product)

        return success_response(
            data=serializer.data,
            message="Product fetched successfully."
        )

class FeaturedProductAPIView(APIView):

    def get(self, request):

        queryset = ProductSelector.get_featured_products()

        serializer = ProductListSerializer(
            queryset,
            many=True
        )

        return success_response(
            data=serializer.data,
            message="Featured products fetched successfully."
        )