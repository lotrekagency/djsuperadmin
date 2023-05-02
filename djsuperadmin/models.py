import hashlib
import os

from django.db import models
from django.urls import reverse

from djsuperadmin.mixins import DjSuperAdminMixin


def make_random_id():
    return hashlib.sha256(os.urandom(56)).hexdigest()


class Content(models.Model, DjSuperAdminMixin):
    id = models.CharField(
        max_length=64,
        default=make_random_id,
        primary_key=True,
        unique=True,
        editable=False,
    )
    data = models.TextField(null=True, blank=True)

    @property
    def superadmin_get_url(self):
        return reverse("djsuperadmin-content-api", kwargs={"uuid": self.id})

    @property
    def superadmin_patch_url(self):
        return reverse("djsuperadmin-content-api", kwargs={"uuid": self.id})

    @staticmethod
    def get_from_default_data(data, *args, **kwargs):
        content = None
        digest = hashlib.sha256(data.encode("utf-8")).hexdigest()
        if "context" in kwargs:
            content_cache = dict(kwargs["context"]).get("_djsuperadmin_content_prefetch", [])
            content = next((c for c in content_cache if getattr(c, "id", None) == digest), None)
        if content is None:
            content, _ = Content.objects.get_or_create(id=digest)
        if content.data is None:
            content.data = data
            content.save()
        return content
