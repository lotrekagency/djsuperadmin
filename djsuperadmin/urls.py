from django.urls import path

from djsuperadmin.api import ContentApiView

urlpatterns = [
    path(
        "djsuperadmin/content/<slug:uuid>/",
        ContentApiView.as_view(),
        name="djsuperadmin-content-api",
    ),
]
