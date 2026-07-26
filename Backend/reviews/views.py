from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView

from catalog.models import Product
from common.responses import success_response

from reviews.models import Review
from reviews.selectors import ReviewSelector
from reviews.serializers import (
    AdminReviewSerializer,
    ReviewCreateSerializer,
    ReviewListSerializer,
    ReviewDetailSerializer,
    ReviewUpdateSerializer,
)
from reviews.services import ReviewService


class ProductReviewListAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, slug):
        product = get_object_or_404(
            Product,
            slug=slug,
            is_deleted=False,
        )

        reviews = ReviewSelector.get_product_reviews(product)
        summary = ReviewSelector.get_review_summary(product)

        return success_response(
            data={
                "summary": summary,
                "reviews": ReviewListSerializer(
                    reviews,
                    many=True,
                ).data,
            }
        )


class ReviewCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, slug):
        product = get_object_or_404(
            Product,
            slug=slug,
            is_deleted=False,
        )

        serializer = ReviewCreateSerializer(
            data=request.data,
        )

        serializer.is_valid(raise_exception=True)

        review = ReviewService.create_review(
            customer=request.user,
            product=product,
            data=serializer.validated_data,
        )

        return success_response(
            data=ReviewListSerializer(review).data,
            message="Review submitted successfully.",
            status_code=status.HTTP_201_CREATED,
        )


class ReviewDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        review = get_object_or_404(
            Review,
            pk=pk,
            customer=request.user,
            is_deleted=False,
        )

        serializer = ReviewDetailSerializer(
            review,
            context={
                "request": request,
            },
        )

        return success_response(
            data=serializer.data,
        )
    def put(self, request, pk):
        review = get_object_or_404(
            Review,
            pk=pk,
            customer=request.user,
            is_deleted=False,
        )

        serializer = ReviewUpdateSerializer(
            review,
            data=request.data,
        )

        serializer.is_valid(raise_exception=True)

        review = ReviewService.update_review(
            review=review,
            customer=request.user,
            data=serializer.validated_data,
        )

        return success_response(
            data=ReviewListSerializer(review).data,
            message="Review updated successfully.",
        )

    def delete(self, request, pk):
        review = get_object_or_404(
            Review,
            pk=pk,
            customer=request.user,
            is_deleted=False,
        )

        ReviewService.delete_review(
            review=review,
            customer=request.user,
        )

        return success_response(
            message="Review deleted successfully.",
        )


class AdminReviewListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        reviews = ReviewSelector.get_admin_reviews(
            request.query_params,
        )

        serializer = AdminReviewSerializer(
            reviews,
            many=True,
        )

        return success_response(
            data=serializer.data,
        )


class AdminReviewDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        review = ReviewSelector.get_review(pk)

        return success_response(
            data=AdminReviewSerializer(review).data,
        )

    def put(self, request, pk):
        review = ReviewSelector.get_review(pk)

        action = request.data.get("action")

        if action == "approve":
            ReviewService.approve_review(review)

        elif action == "reject":
            ReviewService.reject_review(review)

        elif action == "feature":
            ReviewService.feature_review(review)

        elif action == "unfeature":
            ReviewService.unfeature_review(review)

        elif action == "reply":
            ReviewService.reply_review(
                review,
                request.data.get("admin_reply", ""),
            )

        return success_response(
            data=AdminReviewSerializer(review).data,
            message="Review updated successfully.",
        )