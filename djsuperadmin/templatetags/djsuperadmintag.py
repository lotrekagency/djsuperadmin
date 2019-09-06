from django import template
from django.utils.safestring import mark_safe
from djsuperadmin.models import Content
from django.utils.html import escape


def _get_span(editor_mode, content):
    if editor_mode == 0:
        content.content = escape(content.content)
    return '<span class="djsuperadmin" data-mode="{0}" data-djsa ="{1}">{2}</span>'.format(
            str(editor_mode), str(content.id), content.content)


def _get_content(context, identifier, editor_mode, placeholder="New content"):
    content, created = Content.objects.language().fallbacks().get_or_create(identifier=identifier)
    if created:
        content.content = placeholder
        content.save()
    if context['request'].user.is_superuser:
        return mark_safe(_get_span(editor_mode, content))
    else:
        return content.content if editor_mode==0 else mark_safe(content.content)


register = template.Library()


@register.simple_tag(takes_context=True)
def content(context, identifier):
    return _get_content(context, identifier, 1)


@register.simple_tag(takes_context=True)
def content_lite(context, identifier):
    return _get_content(context, identifier, 2, placeholder="New Lite content")


@register.simple_tag(takes_context=True)
def content_raw(context, identifier):
    return _get_content(context, identifier, 0, placeholder="New RAW content")


@register.simple_tag(takes_context=True)
def safe_content_raw(context, identifier):
    return mark_safe(_get_content(context, identifier, 0, placeholder="New RAW content"))
