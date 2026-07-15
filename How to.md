---
url: /djsuperadmin/How to.md
---
# How to

Practical recipes for the everyday uses of DjSuperAdmin. Every template needs
the tag library loaded once at the top:

```html
{% load djsuperadmintag %}
```

And every page that should be editable needs the JS injected once in the footer —
see [The `{% djsuperadminjs %}` tag](#the-djsuperadminjs-tag) at the bottom.

## Bare-string content (built-in Content model)

The one-argument form of `superadmin_content` uses DjSuperAdmin's **built-in
`Content` model**. You pass a default string; it is keyed by a hash of that
string and auto-created the first time the page renders. No model of your own,
no migration to write.

```html
{% load djsuperadmintag %}

<h1>{% superadmin_content 'Welcome to our site' %}</h1>
```

There is a raw variant that gives a plain textarea instead of the WYSIWYG editor:

```html
<p>{% superadmin_raw_content 'A short plain-text tagline' %}</p>
```

::: warning The tag is `superadmin_raw_content`
Not `superadmin_content_raw`. Mind the word order.
:::

Because this form is backed by the built-in model and its API view, you **must
include the DjSuperAdmin URLs** in your project's `urls.py`:

```python
from django.urls import path, include

urlpatterns = [
    # ...
    path('', include('djsuperadmin.urls')),
]
```

Without those URLs the editor has no endpoint to read from or save to. (The URLs
are only required for the bare-string form and the built-in model — the
model-field form below does not need them.)

## Editing a model field

The two-argument form binds the editor to `obj.<attribute>` on an object you
already have in the template context. This is the common case: an editable field
on one of your own models.

```html
{% load djsuperadmintag %}

<article>
  <h1>{% superadmin_content page 'title' %}</h1>
  <div>{% superadmin_content page 'body' %}</div>
</article>
```

Superusers see an editable element with class `djsuperadmin` (a `<div>` for
WYSIWYG, a `<span>` for raw); everyone else sees the plain field value.

For a WYSIWYG (SunEditor) editor use `superadmin_content`. For a plain textarea —
good for snippets, code, or anything where you don't want markup — use the raw
variant:

```html
<pre>{% superadmin_raw_content page 'code_snippet' %}</pre>
```

Note that for the model-field form to actually save, your model must expose the
`superadmin_get_url` / `superadmin_patch_url` properties via the
`DjSuperAdminMixin` — see [Bring your own content model](#bring-your-own-content-model).

## In-place editing

By default, contents open in a small modal for editing. Set the `INPLACE_EDIT`
option to edit **directly on the page** instead:

```python
# settings.py
DJSUPERADMIN = {"INPLACE_EDIT": True}
```

The default is `False`. When on:

* **raw** contents (`superadmin_raw_content`) become `contenteditable`;
* **WYSIWYG** contents (`superadmin_content`) become an inline SunEditor — its
  toolbar docks above the content while editing. **Commit** by clicking anywhere
  outside the editor, or with the toolbar's save button; **cancel** with
  Esc. The editor grows to fit its content.

::: tip WYSIWYG renders as a `<div>`
`superadmin_content` produces block HTML (paragraphs, images), so it is wrapped
in a `<div>`, not a `<span>`. Place it in a **block context** — e.g.
`<div>{% superadmin_content ... %}</div>` — not inside a `<p>`, `<h1>`, or other
inline context, or the browser will eject the block content from the wrapper.
`superadmin_raw_content` stays an inline `<span>`.
:::

## Insert images from a media gallery

Give the WYSIWYG editor an image-gallery endpoint and its toolbar gains an
"insert image from gallery" button:

```python
# settings.py
DJSUPERADMIN = {
    "INPLACE_EDIT": True,
    "IMAGE_GALLERY_URL": "/api/camomilla/media/",  # your media list endpoint
    # "IMAGE_UPLOAD_URL": "/api/camomilla/media/upload/",  # optional, for uploads
}
```

The endpoint must return JSON in the shape SunEditor expects:

```json
{
  "result": [
    { "src": "https://.../photo-1.jpg", "name": "Photo 1" },
    { "src": "https://.../photo-2.jpg", "name": "Photo 2" }
  ]
}
```

This is meant to plug into a CMS media library — e.g.
[camomilla](https://github.com/camomillacms/camomilla-core)'s media gallery: point
`IMAGE_GALLERY_URL` at its media API and editors can drop existing media straight
into the content. (See the `example/` project for a working demo endpoint.)

## Version history & revert

Every save keeps the previous value, so editors can roll back a change. Hovering
the content shows a toolbar with a **⟲ history** icon (next to the ✏️ edit icon);
it lists the past versions with a timestamp and preview, and clicking one restores
it — you can review or revert without even opening the editor.

Reverting is just another save — the value you revert *away from* is snapshotted
too, so a revert is itself undoable.

For the built-in `Content` model this works out of the box (nothing to
configure). History is capped to the last 20 versions per content; change that
with:

```python
# settings.py
DJSUPERADMIN = {"INPLACE_EDIT": True, "MAX_VERSIONS": 50}
```

::: tip Your own model opts in
The history button only shows when the content exposes a `superadmin_history_url`
(see [Bring your own content model](#bring-your-own-content-model)). The built-in
model provides it automatically; your own models add it when you want the
feature.
:::

## Bring your own content model

You don't have to use the built-in `Content` model. Any of your models can be
made editable by mixing in `DjSuperAdminMixin` and pointing it at your own API
endpoint.

The mixin requires two properties — `superadmin_get_url` and
`superadmin_patch_url`. If they are not defined, the mixin raises
`NotImplementedError`.

```python
from django.db import models
from djsuperadmin.mixins import DjSuperAdminMixin


class MyContent(models.Model, DjSuperAdminMixin):
    body = models.TextField()

    @property
    def superadmin_get_url(self):
        return f"/api/mycontent/{self.pk}"

    @property
    def superadmin_patch_url(self):
        return f"/api/mycontent/{self.pk}"
```

Use it in a template exactly like any other model field:

```html
{% load djsuperadmintag %}

<div>{% superadmin_content mycontent 'body' %}</div>
```

Now provide the endpoint those two URLs point at. The contract is minimal — no
DRF required:

* **GET** returns JSON `{"content": <value>}`.
* **PATCH** receives a body of `{"content": <value>}` and saves it.

```python
import json

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views import View

from .models import MyContent


class MyContentApiView(View):
    def get(self, request, pk):
        obj = get_object_or_404(MyContent, pk=pk)
        return JsonResponse({"content": obj.body})

    def patch(self, request, pk):
        obj = get_object_or_404(MyContent, pk=pk)
        payload = json.loads(request.body)
        obj.body = payload["content"]
        obj.save()
        return JsonResponse({"content": obj.body})
```

```python
# urls.py
from django.urls import path

from .views import MyContentApiView

urlpatterns = [
    path("api/mycontent/<int:pk>", MyContentApiView.as_view()),
]
```

That's the whole contract. As long as GET returns `{"content": …}` and PATCH
accepts `{"content": …}`, the editor works against your model.

### Optional: version history for your model

To light up the **⟲ History** button on your own model, add a third property,
`superadmin_history_url`, and an endpoint that returns past versions:

```python
class MyContent(models.Model, DjSuperAdminMixin):
    body = models.TextField()

    # ...get/patch urls as above...

    @property
    def superadmin_history_url(self):
        return f"/api/mycontent/{self.pk}/history"
```

That endpoint's `GET` must return the versions newest-first:

```json
{
  "versions": [
    { "id": 12, "data": "<p>previous value</p>", "created_at": "2026-07-13T10:00:00" },
    { "id": 11, "data": "<p>older value</p>",    "created_at": "2026-07-12T09:00:00" }
  ]
}
```

Revert needs no extra endpoint — the editor restores a version by `PATCH`-ing its
`data` back through your normal save url. You only have to *record* the snapshots
(e.g. in your PATCH handler, or with `django-reversion`) and expose this list.
The mixin's default is `None`, so models that don't define it simply show no
history button.

## Headless usage (SPA / SSR frontends)

The template tags are a convenience for Django-rendered pages, but the editor
itself is framework-agnostic. Any frontend can drive it by reproducing what the
tags emit:

1. Render an element with class `djsuperadmin` carrying the same data attributes
   — `data-djsa-mode` (`1` WYSIWYG / `0` raw), `data-djsa-id`,
   `data-djsa-getcontenturl`, `data-djsa-patchcontenturl`, and optionally
   `data-djsa-historyurl` — around the current HTML value.
2. Load the built bundle and set its config globals (`inplace_edit_enabled`,
   `djsa_suneditor_js/css`, `djsa_image_gallery_url`, …) before it, exactly as
   `{% djsuperadminjs %}` does. Because the bundle lives under the app's `static/`
   directory, Django serves it at `/static/djsuperadmin/djsuperadmin.bundle.js`
   (run `collectstatic`), so a frontend can just
   `<script src="/static/djsuperadmin/djsuperadmin.bundle.js">` it.

Only render the markup and load the bundle for users allowed to edit. The bundle
saves by `fetch`ing your endpoints with the Django **session cookie +
`X-CSRFToken`**, so the browser must be **same-origin** with the backend (e.g.
reverse-proxy `/api`, `/admin`, `/static` to Django).

> A ready-made binding for **Astro + camomilla** lives in its own
> [astro-camomilla-integration](https://github.com/camomillacms/astro-camomilla-integration)
> project — this repo stays framework-agnostic.

## The `{% djsuperadminjs %}` tag

This tag wires everything together. Place it **once**, in your page footer:

```html
{% load djsuperadmintag %}

<body>
  <!-- your page … -->

  {% djsuperadminjs %}
</body>
```

It injects the DjSuperAdmin JS bundle that turns the wrapped spans into editors.
The bundle **lazy-loads [SunEditor](https://github.com/JiHong88/SunEditor) from a
CDN the first time** a WYSIWYG editor is opened, so pages stay light until you
actually edit. To self-host the editor (e.g. under a strict CSP), point it at
your own copy:

```python
# settings.py
DJSUPERADMIN = {
    "SUNEDITOR_JS": "/static/vendor/suneditor.min.js",
    "SUNEDITOR_CSS": "/static/vendor/suneditor.min.css",
}
```

It renders **only for authenticated superusers** — for every other visitor
(anonymous users, non-superuser staff) it outputs an empty string, so there is
no extra markup or JS on public page loads. You can leave it in your base
template unconditionally.
