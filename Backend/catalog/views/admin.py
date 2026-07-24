from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser

from common.permissions import IsAdminUserPermission
from common.responses import success_response, error_response

from catalog.selectors import AdminProductSelector
from catalog.services import AdminProductService, AdminCategoryService
from catalog.models import Category
from catalog.serializers.product import ( AdminProductListSerializer, AdminProductDetailSerializer, AdminProductCreateUpdateSerializer, AdminCategorySerializer, AdminCategoryDropdownSerializer)



class AdminProductListAPIView(APIView):
    """
    GET  : Product Listing
    POST : Create Product
    """

    permission_classes = [
        IsAuthenticated,
        IsAdminUserPermission,
    ]

    def get(self, request):

        products = AdminProductSelector.get_products(
            request.query_params
        )

        serializer = AdminProductListSerializer(
            products,
            many=True,
            context={"request": request},
        )

        return success_response(
            data=serializer.data,
            message="Products fetched successfully.",
        )

    def post(self, request):

        serializer = AdminProductCreateUpdateSerializer(
            data=request.data
        )

        if not serializer.is_valid():
            return error_response(
                message="Validation failed.",
                errors=serializer.errors,
            )

        product = AdminProductService.create_product(
            serializer.validated_data
        )

        response_serializer = AdminProductDetailSerializer(
            product,
            context={"request": request},
        )

        return success_response(
            data=response_serializer.data,
            message="Product created successfully.",
            status_code=status.HTTP_201_CREATED,
        )


class AdminProductDetailAPIView(APIView):
    """
    GET    : Product Detail
    PUT    : Update Product
    DELETE : Soft Delete Product
    """

    permission_classes = [
        IsAuthenticated,
        IsAdminUserPermission,
    ]

    def get(self, request, product_id):

        product = AdminProductSelector.get_product(product_id)

        serializer = AdminProductDetailSerializer(
            product,
            context={"request": request},
        )

        return success_response(
            data=serializer.data,
            message="Product fetched successfully.",
        )

    def put(self, request, product_id):

        product = AdminProductSelector.get_product(product_id)

        serializer = AdminProductCreateUpdateSerializer(
            product,
            data=request.data,
        )

        if not serializer.is_valid():
            return error_response(
                message="Validation failed.",
                errors=serializer.errors,
            )

        product = AdminProductService.update_product(
            product,
            serializer.validated_data,
        )

        response_serializer = AdminProductDetailSerializer(
            product,
            context={"request": request},
        )

        return success_response(
            data=response_serializer.data,
            message="Product updated successfully.",
        )

    def delete(self, request, product_id):

        product = AdminProductSelector.get_product(product_id)

        AdminProductService.delete_product(product)

        return success_response(
            message="Product deleted successfully.",
        )

class AdminCategoryListAPIView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        categories = AdminCategoryService.get_categories(request.query_params)

        serializer = AdminCategorySerializer(
            categories,
            many=True,
            context={"request": request},
        )

        return success_response(
            message="Categories fetched successfully.",
            data=serializer.data,
        )

    def post(self, request):
        serializer = AdminCategorySerializer(
            data=request.data,
            context={"request": request},
        )

        if not serializer.is_valid():
            return error_response(
                message="Validation failed.",
                errors=serializer.errors,
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        category = AdminCategoryService.create_category(
            serializer.validated_data
        )

        return success_response(
            message="Category created successfully.",
            data=AdminCategorySerializer(
                category,
                context={"request": request},
            ).data,
            status_code=status.HTTP_201_CREATED,
        )


class AdminCategoryDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self, category_id):
        return AdminCategoryService.get_category(category_id)

    def get(self, request, category_id):
        category = self.get_object(category_id)

        serializer = AdminCategorySerializer(
            category,
            context={"request": request},
        )

        return success_response(
            message="Category fetched successfully.",
            data=serializer.data,
        )

    def put(self, request, category_id):
        category = self.get_object(category_id)

        serializer = AdminCategorySerializer(
            category,
            data=request.data,
            partial=True,
            context={"request": request},
        )

        if not serializer.is_valid():
            return error_response(
                message="Validation failed.",
                errors=serializer.errors,
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        category = AdminCategoryService.update_category(
            category,
            serializer.validated_data,
        )

        return success_response(
            message="Category updated successfully.",
            data=AdminCategorySerializer(
                category,
                context={"request": request},
            ).data,
        )

    def delete(self, request, category_id):
        category = self.get_object(category_id)

        AdminCategoryService.delete_category(category)

        return success_response(
            message="Category deleted successfully.",
        )


class AdminCategoryDropdownAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        categories = Category.objects.filter(is_active=True, is_deleted=False)
        serializer = AdminCategoryDropdownSerializer(categories, many=True)
        return success_response(
            message="Categories dropdown fetched successfully.",
            data=serializer.data,
        )