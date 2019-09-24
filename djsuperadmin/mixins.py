from hvad.models import TranslatableModel, TranslatedFields


class DjSuperAdminMixin(TranslatableModel):

    translations = TranslatedFields()

    @property
    def superadmin_get_url(self):
        raise NotImplementedError("You must define superadmin_get_url!")

    @property
    def superadmin_patch_url(self):
        raise NotImplementedError("You must define superadmin_patch_url!")

    class Meta:
        abstract = True
