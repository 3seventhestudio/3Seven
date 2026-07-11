from accounts.models import User


class ProfileSelector:

    @staticmethod
    def get_profile(user):
        return User.objects.get(pk=user.pk)