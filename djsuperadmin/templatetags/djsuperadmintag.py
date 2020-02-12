import os
from django import template
from django.utils.safestring import mark_safe


def _get_obj_span(obj, attribute):
    return '<span class="djsuperadmin" data-mode="{0}" data-djsa ="{1}" data-getcontenturl="{2}" data-patchcontenturl="{3}">{4}</span>'.format(
        '1', str(obj.id), str(obj.superadmin_get_url), str(obj.superadmin_patch_url), getattr(obj, attribute)
    )


def _get_obj_content(context, obj, attribute, placeholder="New content"):
    if context['request'].user.is_superuser:
        return mark_safe(_get_obj_span(obj, attribute))
    else:
        return mark_safe(getattr(obj, attribute))


register = template.Library()


@register.simple_tag(takes_context=True)
def superadmin_content(context, obj, attribute):
    return _get_obj_content(context, obj, attribute)


@register.simple_tag(takes_context=True)
def djsuperadminjs(context):
    if context['request'].user.is_authenticated and context['request'].user.is_superuser:
        superadmin_basedir = os.path.abspath(os.path.dirname(__file__))
        with open(os.path.join(superadmin_basedir, '..', 'dist', 'djsuperadmin.bundle.js'), 'r') as js_file:
            js = "<script src='https://cdn.ckeditor.com/4.12.1/standard/ckeditor.js'></script><script>var djsa_logout_url='{0}';{1}</script>".format(
                '',
                js_file.read()
            )
        return mark_safe(js)
    return ''
