from django.db import models


class ActiveManager(models.Manager):
    """
    Returns only active records.
    """

    def get_queryset(self):
        return super().get_queryset().filter(is_active=True, is_deleted=False)


class AllObjectsManager(models.Manager):
    """
    Returns all records including inactive and soft deleted.
    """

    def get_queryset(self):
        return super().get_queryset()