import os
from django import template
from django.utils.safestring import mark_safe


def _get_obj_span(obj, attribute, placeholder, editor_mode):
    span = '<span class="djsuperadmin"'
    span += ' data-djsa-mode="%s"' % editor_mode
    span += ' data-djsa-id="%s"' % str(obj.id)
    span += ' data-djsa-getcontenturl="%s"' % str(obj.superadmin_get_url)
    span += ' data-djsa-patchcontenturl="%s"' % str(obj.superadmin_patch_url)
    span += ">%s</span>" % getattr(obj, attribute, placeholder)
    return span


def _get_obj_content(context, obj, attribute, placeholder="New content", editor_mode=1):
    if context["request"].user.is_superuser:
        return mark_safe(_get_obj_span(obj, attribute, placeholder, editor_mode))
    else:
        return mark_safe(getattr(obj, attribute, placeholder))


register = template.Library()


@register.simple_tag(takes_context=True)
def superadmin_content(context, obj, attribute):
    return _get_obj_content(context, obj, attribute)


@register.simple_tag(takes_context=True)
def superadmin_raw_content(context, obj, attribute):
    return _get_obj_content(context, obj, attribute, editor_mode=0)


@register.simple_tag(takes_context=True)
def djsuperadminjs(context):
    if (
        context["request"].user.is_authenticated
        and context["request"].user.is_superuser
    ):
        superadmin_basedir = os.path.abspath(os.path.dirname(__file__))
        with open(
            os.path.join(superadmin_basedir, "..", "dist", "djsuperadmin.bundle.js"),
            "r",
        ) as js_file:
            js = '<script src="https://cdn.ckeditor.com/4.12.1/standard/ckeditor.js"></script>'
            js += '<script>var djsa_logout_url="%s";%s</script>' % ("", js_file.read())
        return mark_safe(js)
    return ""
