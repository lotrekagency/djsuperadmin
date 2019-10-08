from django.core.validators import MinValueValidator
from django.db import models
from hvad.models import TranslatableModel, TranslatedFields
from django.utils.translation import ugettext_lazy as _


class BaseContent(TranslatableModel):
    identifier = models.CharField(max_length=200)
    translations = TranslatedFields(
        permalink=models.CharField(max_length=200, blank=True, null=True),
        content=models.TextField())

    class Meta:
        abstract = True
        permissions = (
            ("read_content", _("Can read content")),
        )

    def __str__(self):
        return self.identifier


class Content(BaseContent):
    translations = TranslatedFields()


class BreadcrumbBaseContent(TranslatableModel):
    identifier = models.CharField(max_length=200)
    position = models.IntegerField(validators=[MinValueValidator(1)])
    translations = TranslatedFields(
        url=models.CharField(max_length=512, blank=True, null=True),
        content=models.CharField(max_length=256, null=False)
    )

    class Meta:
        abstract = True
        permissions = (
            ("read_content", _("Can read content")),
        )


class BreadcrumbContent(BreadcrumbBaseContent):
    translations = TranslatedFields()
