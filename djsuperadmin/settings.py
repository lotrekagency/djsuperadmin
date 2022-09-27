from django.conf import settings

DJSUPERADMIN_SETTINGS = getattr(settings, "DJSUPERADMIN", {})
