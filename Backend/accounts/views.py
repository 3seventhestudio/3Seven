from drf_spectacular.utils import extend_schema
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework_simplejwt.views import TokenRefreshView
from django.contrib.auth.password_validation import validate_password

from common.responses import success_response, error_response
from common.permissions import IsAdminUserPermission

from accounts.selectors.admin_dashboard_selector import AdminDashboardSelector
from accounts.serializers.admin_dashboard_serializer import AdminDashboardSerializer
from accounts.serializers.auth import RegisterSerializer, LoginSerializer
from accounts.serializers.profile import ProfileSerializer, UpdateProfileSerializer
from accounts.selectors.profile_selector import ProfileSelector
from accounts.services.auth_service import AuthService
from accounts.services.profile_service import ProfileService
from accounts.services.user_service import AdminCustomerService
from accounts.models import Address
from accounts.serializers.address import AddressSerializer, CreateUpdateAddressSerializer
from accounts.selectors.address_selector import AddressSelector
from accounts.services.address_service import AddressService
from accounts.selectors.dashboard_selector import DashboardSelector
from accounts.serializers.dashboard_serializer import DashboardSerializer
from accounts.serializers import ChangePasswordSerializer
from accounts.serializers.customer_serializer import AdminCustomerListSerializer, AdminCustomerDetailSerializer, AdminCustomerUpdateSerializer

@extend_schema(tags=["Authentication"], summary="Register User", request=RegisterSerializer)
class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        AuthService.register_user(serializer.validated_data)

        return success_response(message="Registration completed successfully.", status_code=status.HTTP_201_CREATED)


@extend_schema(tags=["Authentication"], summary="Login User", request=LoginSerializer)
class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        result = AuthService.login_user(serializer.validated_data["email"], serializer.validated_data["password"])

        if result is None:
            return Response({"success": False, "message": "Invalid email or password."}, status=status.HTTP_401_UNAUTHORIZED)

        return Response({
            "success": True,
            "message": "Login successful.",
            "data": {
                "access": result["access"],
                "refresh": result["refresh"],
                "user": {
                    "id": result["user"].id,
                    "email": result["user"].email,
                    "first_name": result["user"].first_name,
                    "last_name": result["user"].last_name,
                    "is_staff": result["user"].is_staff,
                }
            }
        }, status=status.HTTP_200_OK)


class RefreshTokenAPIView(TokenRefreshView):
    permission_classes = [AllowAny]


@extend_schema(tags=["Authentication"], summary="Logout User")
class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get("refresh")

        if not refresh_token:
            return Response({"success": False, "message": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"success": True, "message": "Logout successful."}, status=status.HTTP_200_OK)

        except TokenError:
            return Response({"success": False, "message": "Invalid or expired refresh token."}, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(tags=["Profile"], summary="Get Profile")
class ProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = ProfileSelector.get_profile(request.user)
        serializer = ProfileSerializer(user)

        return Response({
            "success": True,
            "message": "Profile fetched successfully.",
            "data": serializer.data,
        }, status=status.HTTP_200_OK)

    @extend_schema(request=UpdateProfileSerializer)
    def put(self, request):
        user = ProfileSelector.get_profile(request.user)

        serializer = UpdateProfileSerializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)

        user = ProfileService.update_profile(user, serializer.validated_data)

        return Response({
            "success": True,
            "message": "Profile updated successfully.",
            "data": ProfileSerializer(user).data,
        }, status=status.HTTP_200_OK)

    @extend_schema(request=UpdateProfileSerializer)
    def patch(self, request):
        user = ProfileSelector.get_profile(request.user)

        serializer = UpdateProfileSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        user = ProfileService.update_profile(user, serializer.validated_data)

        return Response({
            "success": True,
            "message": "Profile updated successfully.",
            "data": ProfileSerializer(user).data,
        }, status=status.HTTP_200_OK)
    
@extend_schema(tags=["Address"], summary="List Addresses")
class AddressListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        addresses = AddressSelector.get_addresses(request.user)
        serializer = AddressSerializer(addresses, many=True)

        return Response({
            "success": True,
            "message": "Addresses fetched successfully.",
            "data": serializer.data,
        }, status=status.HTTP_200_OK)

    @extend_schema(request=CreateUpdateAddressSerializer)
    def post(self, request):
        serializer = CreateUpdateAddressSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        address = AddressService.create_address(request.user, serializer.validated_data)

        return Response({
            "success": True,
            "message": "Address created successfully.",
            "data": AddressSerializer(address).data,
        }, status=status.HTTP_201_CREATED)


@extend_schema(tags=["Address"], summary="Update/Delete Address")
class AddressDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, request, address_id):
        return get_object_or_404(Address, pk=address_id, user=request.user)

    @extend_schema(request=CreateUpdateAddressSerializer)
    def put(self, request, address_id):
        address = self.get_object(request, address_id)

        serializer = CreateUpdateAddressSerializer(address, data=request.data)
        serializer.is_valid(raise_exception=True)

        address = AddressService.update_address(address, serializer.validated_data)

        return Response({
            "success": True,
            "message": "Address updated successfully.",
            "data": AddressSerializer(address).data,
        })

    @extend_schema(request=CreateUpdateAddressSerializer)
    def patch(self, request, address_id):
        address = self.get_object(request, address_id)

        serializer = CreateUpdateAddressSerializer(address, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        address = AddressService.update_address(address, serializer.validated_data)

        return Response({
            "success": True,
            "message": "Address updated successfully.",
            "data": AddressSerializer(address).data,
        })

    def delete(self, request, address_id):
        address = self.get_object(request, address_id)

        AddressService.delete_address(address)

        return Response({
            "success": True,
            "message": "Address deleted successfully.",
        }, status=status.HTTP_200_OK)


@extend_schema(tags=["Address"], summary="Set Default Address")
class AddressDefaultAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, address_id):
        address = get_object_or_404(Address, pk=address_id, user=request.user)

        AddressService.set_default(address)

        return Response({
            "success": True,
            "message": "Default address updated successfully.",
            "data": AddressSerializer(address).data,
        }, status=status.HTTP_200_OK)

class DashboardAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        dashboard = DashboardSelector.get_dashboard(
            request.user
        )

        serializer = DashboardSerializer(dashboard)

        return success_response(
            message="Dashboard fetched successfully.",
            data=serializer.data,
        )
    
class ChangePasswordAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = ChangePasswordSerializer(data=request.data)

        if not serializer.is_valid():
            return error_response(
                message="Validation failed.",
                errors=serializer.errors,
            )

        user = request.user

        if not user.check_password(
            serializer.validated_data["current_password"]
        ):
            return error_response(
                message="Current password is incorrect."
            )

        user.set_password(
            serializer.validated_data["new_password"]
        )

        user.save()

        return success_response(
            message="Password changed successfully."
        )

class AdminCustomerListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        customers = AdminCustomerService.get_customers(
            request.query_params
        )

        serializer = AdminCustomerListSerializer(
            customers,
            many=True,
        )

        return success_response(
            message="Customers fetched successfully.",
            data=serializer.data,
        )


class AdminCustomerDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, customer_id):
        customer = AdminCustomerService.get_customer(customer_id)

        serializer = AdminCustomerDetailSerializer(customer)

        return success_response(
            message="Customer fetched successfully.",
            data=serializer.data,
        )

    def put(self, request, customer_id):
        customer = AdminCustomerService.get_customer(customer_id)

        serializer = AdminCustomerUpdateSerializer(
            customer,
            data=request.data,
            partial=True,
        )

        if not serializer.is_valid():
            return error_response(
                message="Validation failed.",
                errors=serializer.errors,
                status_code=status.HTTP_400_BAD_REQUEST,
            )

        customer = AdminCustomerService.update_customer(
            customer,
            serializer.validated_data,
        )

        return success_response(
            message="Customer updated successfully.",
            data=AdminCustomerDetailSerializer(customer).data,
        )


class AdminDashboardAPIView(APIView):
    permission_classes = [IsAdminUserPermission]

    def get(self, request):
        data = AdminDashboardSelector.get_dashboard_data()
        serializer = AdminDashboardSerializer(data)
        return success_response(
            message="Dashboard data fetched successfully.",
            data=serializer.data,
        )