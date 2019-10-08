from .views import ContentViewSet, BreadcrumbContentViewSet
from django.conf.urls import url, include
from rest_framework import routers


router = routers.DefaultRouter()

router.register(r'contents', ContentViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^breadcrumb_contents/(?P<identifier>.+)/$',  BreadcrumbContentViewSet.as_view()),
]
