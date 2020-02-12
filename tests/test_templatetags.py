import pytest

from django.db import models
from djsuperadmin.templatetags.djsuperadmintag import superadmin_content, djsuperadminjs

from testapp.models import Content, ContentWithoutUrls


class User():

    def __init__(self, is_superuser):
        self.is_superuser = is_superuser


@pytest.mark.django_db
def test_content_rendering_admin_user(rf, admin_user):
    content = Content.objects.create(identifier='1', content='Try')
    request = rf.get('/customer/details')
    request.user = admin_user
    expected_html = '<span class="djsuperadmin" data-mode="1" data-djsa ="1" data-getcontenturl="/api/content" data-patchcontenturl="/api/content">Try</span>'
    assert superadmin_content({'request' : request}, content, 'content') == expected_html


def test_content_rendering_simple_user(rf, django_user_model):
    user = django_user_model.objects.create(username="someone", password="something")
    content = Content.objects.create(identifier='1', content='Try')
    request = rf.get('/customer/details')
    request.user = user
    assert superadmin_content({'request' : request}, content, 'content') == 'Try'


@pytest.mark.django_db
def test_djsuperadminjs_rendering_admin_user(rf, admin_user):
    request = rf.get('/customer/details')
    request.user = admin_user
    assert '<script src' in djsuperadminjs({'request' : request})


def test_djsuperadminjs_rendering_simple_user(rf, django_user_model):
    user = django_user_model.objects.create(username="someone", password="something")
    request = rf.get('/customer/details')
    request.user = user
    assert '' == djsuperadminjs({'request' : request})


def test_raise_exception_for_not_implemented_urls_in_model(rf, admin_user):
    content = ContentWithoutUrls.objects.create(identifier='1', content='Try')
    request = rf.get('/customer/details')
    request.user = admin_user
    with pytest.raises(NotImplementedError):
        content.superadmin_get_url
    with pytest.raises(NotImplementedError):
        content.superadmin_patch_url
    with pytest.raises(NotImplementedError):
        superadmin_content({'request' : request}, content, 'content')
