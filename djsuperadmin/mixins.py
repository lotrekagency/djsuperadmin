class DjSuperAdminMixin:
    @property
    def superadmin_get_url(self):
        raise NotImplementedError("You must define superadmin_get_url!")

    @property
    def superadmin_patch_url(self):
        raise NotImplementedError("You must define superadmin_patch_url!")
