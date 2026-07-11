import uuid

from django.db import models
from django.utils import timezone

from .managers import ActiveManager, AllObjectsManager


class BaseModel(models.Model):
    """
    Abstract base model used by all models.
    """

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    is_active = models.BooleanField(
        default=True
    )

    is_deleted = models.BooleanField(
        default=False
    )

    deleted_at = models.DateTimeField(
        blank=True,
        null=True
    )

    objects = ActiveManager()
    all_objects = AllObjectsManager()

    class Meta:
        abstract = True
        ordering = ["-created_at"]

    def soft_delete(self):
        """
        Soft delete the record.
        """
        self.is_deleted = True
        self.is_active = False
        self.deleted_at = timezone.now()

        self.save(
            update_fields=[
                "is_deleted",
                "is_active",
                "deleted_at",
            ]
        )

    def restore(self):
        """
        Restore a soft deleted record.
        """
        self.is_deleted = False
        self.is_active = True
        self.deleted_at = None

        self.save(
            update_fields=[
                "is_deleted",
                "is_active",
                "deleted_at",
            ]
        )

    def __str__(self):
        return str(self.id)