import json

from django import template
from django.conf import settings
from django.utils.safestring import mark_safe
from djsuperadmin.models import Content, BreadcrumbContent
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
        return content.content if editor_mode == 0 else mark_safe(content.content)


def _get_breadcrumb_html(content, is_superuser, identifier):
    items_structure = ''.join([f'<li class="breadcrumbs__item">'
                               f'<a href="{item.url}" class="breadcrumbs__item__pill">{item.content}</a>'
                               f'</li>' if item.url else f'<li class="breadcrumbs__item">'
                                                         f'<span class="breadcrumbs__item__pill">{item.content}</span>'
                                                         f'</li>'
                               for item in content])
    base_structure = f'<div class="breadcrumbs__wrapper"><ul class="breadcrumbs__list">{items_structure}</ul></div>'
    if not is_superuser:
        return base_structure
    return f'<span class="djsuperadmin" data-mode="3" data-djsa="{identifier}">{base_structure}</span>'


def _get_breadcrumb_content(context, identifier, placeholder="New breadcrumb"):
    content = BreadcrumbContent.objects.language().fallbacks().filter(identifier=identifier).order_by('position')
    if len(content) == 0:
        content = [BreadcrumbContent.objects.language().fallbacks().create(identifier=identifier,
                                                                           position=1,
                                                                           url="",
                                                                           content=placeholder)]

    return mark_safe(_get_breadcrumb_html(content, context['request'].user.is_superuser, identifier))


def _get_breadcrumb_ld(context, identifier, placeholder="New breadcrumb"):
    content = BreadcrumbContent.objects.language().fallbacks().filter(identifier=identifier).order_by('position')
    if len(content) == 0:
        return ''

    ld = {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": []
    }
    for item in content:
        ld_item = {
            "@type": "ListItem",
            "position": item.position,
            "item": {
                "@id": f"{context['request'].scheme}://{context['request'].META['HTTP_HOST']}{item.url}" if item.url else
                context['request'].build_absolute_uri(),
                "name": item.content
            }
        }
        ld['itemListElement'].append(ld_item)

    return mark_safe(f'<script type="application/ld+json">{json.dumps(ld)}</script>')


def _get_obj_span(editor_mode, obj, attribute):
    if editor_mode == 0:
        setattr(obj, attribute, escape(getattr(obj, attribute)))
    print(getattr(obj, attribute))
    return '<span class="djsuperadmin" data-mode="{0}" data-djsa ="{1}" data-getcontenturl="{2}" data-patchcontenturl="{3}">{4}</span>'.format(
        str(editor_mode), str(obj.id), str(obj.superadmin_get_url), str(obj.superadmin_patch_url),
        getattr(obj, attribute)
    )


def _get_obj_content(context, obj, attribute, editor_mode, placeholder="New content"):
    if context['request'].user.is_superuser:
        return mark_safe(_get_obj_span(editor_mode, obj, attribute))
    else:
        if editor_mode == 0:
            return getattr(obj, attribute)
        else:
            return mark_safe(getattr(obj, attribute))


register = template.Library()


@register.simple_tag(takes_context=True)
def content_obj(context, obj, attribute):
    return _get_obj_content(context, obj, attribute, 1)


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


@register.simple_tag(takes_context=True)
def breadcrumb_content(context):
    if not context['request'].resolver_match:
        return ''
    identifier = context['request'].resolver_match.url_name
    return _get_breadcrumb_content(context, identifier, placeholder="New breadcrumb")


@register.simple_tag(takes_context=True)
def breadcrumb_ld(context):
    if not context['request'].resolver_match:
        return ''
    identifier = context['request'].resolver_match.url_name
    return _get_breadcrumb_ld(context, identifier, placeholder="New breadcrumb")
