from django.shortcuts import get_object_or_404

from rest_framework.views import APIView

from common.pagination import StandardResultsPagination
from common.responses import success_response

from ..selectors import (
    CategorySelector,
    ProductSelector,
)

from ..serializers import (
    CategorySerializer,
    ProductListSerializer,
    ProductDetailSerializer,
)


class CategoryListAPIView(APIView):

    def get(self, request):

        categories = CategorySelector.get_active_categories()

        serializer = CategorySerializer(
            categories,
            many=True,
            context={"request": request},
        )

        return success_response(
            data=serializer.data,
            message="Categories fetched successfully.",
        )


class ProductListAPIView(APIView):

    def get(self, request):

        queryset = ProductSelector.get_products(
            request.query_params
        )

        paginator = StandardResultsPagination()

        page = paginator.paginate_queryset(
            queryset,
            request,
        )
        print("Testing", ProductListSerializer)
        serializer = ProductListSerializer(
            page,
            many=True,
            context={"request": request},
        )

        return paginator.get_paginated_response(
            {
                "success": True,
                "message": "Products fetched successfully.",
                "data": serializer.data,
            }
        )


class ProductDetailAPIView(APIView):

    def get(self, request, slug):

        product = get_object_or_404(
            ProductSelector.get_products({}),
            slug=slug,
        )

        serializer = ProductDetailSerializer(
            product,
            context={"request": request},
        )

        return success_response(
            data=serializer.data,
            message="Product fetched successfully.",
        )


class FeaturedProductAPIView(APIView):

    def get(self, request):

        queryset = ProductSelector.get_featured_products()

        serializer = ProductListSerializer(
            queryset,
            many=True,
            context={"request": request},
        )

        return success_response(
            data=serializer.data,
            message="Featured products fetched successfully.",
        )


class NewArrivalProductAPIView(APIView):

    def get(self, request):

        queryset = ProductSelector.get_new_arrivals()

        serializer = ProductListSerializer(
            queryset,
            many=True,
            context={"request": request},
        )

        return success_response(
            data=serializer.data,
            message="New arrival products fetched successfully.",
        )


class BestSellerProductAPIView(APIView):

    def get(self, request):

        queryset = ProductSelector.get_best_sellers()

        serializer = ProductListSerializer(
            queryset,
            many=True,
            context={"request": request},
        )

        return success_response(
            data=serializer.data,
            message="Best seller products fetched successfully.",
        )