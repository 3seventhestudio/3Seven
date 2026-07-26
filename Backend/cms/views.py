from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from common.responses import success_response, error_response

from .serializers import (
    BannerSerializer,
    FAQSerializer,
    NewsletterSubscriberSerializer,
    PageSerializer,
    SEOSerializer,
    SiteSettingSerializer,
)
from .services import (
    BannerService,
    FAQService,
    NewsletterService,
    PageService,
    SEOService,
    SiteSettingService,
)


class BannerListAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        banners = BannerService.get_active_banners()

        serializer = BannerSerializer(
            banners,
            many=True,
        )

        return success_response(
            message="Banners fetched successfully.",
            data=serializer.data,
        )

    def post(self, request):

        serializer = BannerSerializer(
            data=request.data
        )

        if not serializer.is_valid():

            return error_response(
                message="Validation failed.",
                errors=serializer.errors,
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        banner = BannerService.create_banner(
            serializer.validated_data
        )

        return success_response(
            message="Banner created successfully.",
            data=BannerSerializer(banner).data,
            status_code=status.HTTP_201_CREATED,
        )


class BannerDetailAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def put(self, request, banner_id):

        from .models import Banner

        banner = Banner.objects.get(
            id=banner_id
        )

        serializer = BannerSerializer(
            banner,
            data=request.data,
            partial=True,
        )

        if not serializer.is_valid():

            return error_response(
                message="Validation failed.",
                errors=serializer.errors,
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        banner = BannerService.update_banner(
            banner,
            serializer.validated_data,
        )

        return success_response(
            message="Banner updated successfully.",
            data=BannerSerializer(banner).data,
        )

    def delete(self, request, banner_id):

        from .models import Banner

        banner = Banner.objects.get(
            id=banner_id
        )

        BannerService.delete_banner(
            banner
        )

        return success_response(
            message="Banner deleted successfully.",
        )


class PageListAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        pages = PageService.get_pages()

        serializer = PageSerializer(
            pages,
            many=True,
        )

        return success_response(
            message="Pages fetched successfully.",
            data=serializer.data,
        )

    def post(self, request):

        serializer = PageSerializer(
            data=request.data
        )

        if not serializer.is_valid():

            return error_response(
                message="Validation failed.",
                errors=serializer.errors,
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        page = PageService.create_page(
            serializer.validated_data
        )

        return success_response(
            message="Page created successfully.",
            data=PageSerializer(page).data,
            status_code=status.HTTP_201_CREATED,
        )


class PageDetailAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, slug):

        page = PageService.get_page(
            slug
        )

        serializer = PageSerializer(page)

        return success_response(
            message="Page fetched successfully.",
            data=serializer.data,
        )


class SiteSettingAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        setting = SiteSettingService.get_setting()

        serializer = SiteSettingSerializer(
            setting
        )

        return success_response(
            message="Settings fetched successfully.",
            data=serializer.data,
        )

    def put(self, request):

        setting = SiteSettingService.get_setting()

        serializer = SiteSettingSerializer(
            setting,
            data=request.data,
            partial=True,
        )

        if not serializer.is_valid():

            return error_response(
                message="Validation failed.",
                errors=serializer.errors,
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        setting = SiteSettingService.update_setting(
            setting,
            serializer.validated_data,
        )

        return success_response(
            message="Settings updated successfully.",
            data=SiteSettingSerializer(setting).data,
        )


class FAQListAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        faqs = FAQService.get_faqs()

        serializer = FAQSerializer(
            faqs,
            many=True,
        )

        return success_response(
            message="FAQs fetched successfully.",
            data=serializer.data,
        )

    def post(self, request):

        serializer = FAQSerializer(
            data=request.data
        )

        if not serializer.is_valid():

            return error_response(
                message="Validation failed.",
                errors=serializer.errors,
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        faq = FAQService.create_faq(
            serializer.validated_data
        )

        return success_response(
            message="FAQ created successfully.",
            data=FAQSerializer(faq).data,
            status_code=status.HTTP_201_CREATED,
        )


class NewsletterSubscribeAPIView(APIView):

    def post(self, request):

        email = request.data.get(
            "email"
        )

        if not email:

            return error_response(
                message="Email is required.",
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        subscriber = NewsletterService.subscribe(
            email
        )

        return success_response(
            message="Subscribed successfully.",
            data=NewsletterSubscriberSerializer(
                subscriber
            ).data,
        )