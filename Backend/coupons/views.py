from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from catalog.models import Product
from common.responses import success_response, error_response

from .serializers import (
    AdminCouponListSerializer,
    AdminCouponDetailSerializer,
    AdminCouponCreateUpdateSerializer,
)
from .services import AdminCouponService


class AdminCouponListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        coupons = AdminCouponService.get_coupons(
            request.query_params
        )

        serializer = AdminCouponListSerializer(
            coupons,
            many=True,
        )

        return success_response(
            message="Coupons fetched successfully.",
            data=serializer.data,
        )

    def post(self, request):
        serializer = AdminCouponCreateUpdateSerializer(
            data=request.data
        )

        if not serializer.is_valid():
            return error_response(
                message="Validation failed.",
                errors=serializer.errors,
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        coupon = AdminCouponService.create_coupon(
            serializer.validated_data
        )

        return success_response(
            message="Coupon created successfully.",
            data=AdminCouponDetailSerializer(coupon).data,
            status_code=status.HTTP_201_CREATED,
        )


class AdminCouponDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, coupon_id):
        return AdminCouponService.get_coupon(coupon_id)

    def get(self, request, coupon_id):
        coupon = self.get_object(coupon_id)

        serializer = AdminCouponDetailSerializer(coupon)

        return success_response(
            message="Coupon fetched successfully.",
            data=serializer.data,
        )

    def put(self, request, coupon_id):
        coupon = self.get_object(coupon_id)

        serializer = AdminCouponCreateUpdateSerializer(
            coupon,
            data=request.data,
            partial=True,
        )

        if not serializer.is_valid():
            return error_response(
                message="Validation failed.",
                errors=serializer.errors,
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        coupon = AdminCouponService.update_coupon(
            coupon,
            serializer.validated_data,
        )

        return success_response(
            message="Coupon updated successfully.",
            data=AdminCouponDetailSerializer(coupon).data,
        )

    def delete(self, request, coupon_id):
        coupon = self.get_object(coupon_id)

        AdminCouponService.delete_coupon(coupon)

        return success_response(
            message="Coupon deleted successfully.",
        )


class AdminProductDropdownAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        search = request.query_params.get(
            "search",
            ""
        ).strip()

        queryset = Product.objects.filter(
            is_active=True,
        )

        if search:
            queryset = queryset.filter(
                name__icontains=search,
            )

        queryset = queryset.only(
            "id",
            "name",
        ).order_by("name")[:50]

        data = [
            {
                "id": product.id,
                "name": product.name,
            }
            for product in queryset
        ]

        return success_response(
            message="Products fetched successfully.",
            data=data,
        )