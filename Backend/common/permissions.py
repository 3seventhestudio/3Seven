from rest_framework.permissions import BasePermission


class IsAdminUserPermission(BasePermission):
    """
    Allows access only to admin users.
    """

    message = "You do not have permission to perform this action."

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.is_staff
        )