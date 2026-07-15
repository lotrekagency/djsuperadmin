---
url: /djsuperadmin/QuickStart.md
---
# QuickStart

Get from zero to a first editable content in a few minutes. DjSuperAdmin is a
tiny Django app (no runtime dependencies beyond Django) that lets **superusers**
edit page contents inline, right in the browser.

Compatible with Django 2.0 → 6.0 and Python 3.6+.

## 1. Install

```bash
pip install djsuperadmin
```

Using [uv](https://docs.astral.sh/uv/)? `uv add djsuperadmin`.

## 2. Add it to `INSTALLED_APPS`

```python
# settings.py
INSTALLED_APPS = [
    # ...
    "djsuperadmin",
]
```

## 3. Include the urls

Needed for the one-argument tag form used below (it stores contents in
DjSuperAdmin's built-in `Content` model). Add the urls to your root URLconf:

```python
# urls.py
from django.urls import path, include

urlpatterns = [
    # ...
    path("", include("djsuperadmin.urls")),
]
```

> If you only ever use the two-argument form with your own model, you can skip
> this step — see [How to](/How%20to/).

Then apply the migration for the built-in model:

```bash
python manage.py migrate
```

## 4. Load the tags and inject the JS

In your base template, load the template tag library and drop
`{% djsuperadminjs %}` **once** in the footer, just before `</body>`:

```html
{% load djsuperadmintag %}
<!DOCTYPE html>
<html>
  <body>
    <!-- your page -->

    {% djsuperadminjs %}
  </body>
</html>
```

`{% djsuperadminjs %}` injects the DjSuperAdmin bundle (which lazy-loads SunEditor from a CDN on first edit).
It renders **only for authenticated superusers** — for everyone else it outputs
nothing.

## 5. Add your first editable content

Anywhere in the page body, add:

```html
{% superadmin_content 'Hello world' %}
```

The one-argument form uses the built-in `Content` model, keyed by a hash of the
default text. The content row is created automatically the first time the tag is
rendered, starting with `Hello world` as its value.

## 6. Edit it

1. Log in at `/admin/` as a **superuser**.
2. Open the page. Superusers see the content wrapped in an editable element
   (class `djsuperadmin`); everyone else just sees the plain value.
3. Hover the content — a small toolbar appears with a **✏️ edit** icon (and a
   **⟲ history** icon if versioning is on). Click edit (or double-click the text)
   to open the WYSIWYG editor, make your changes, then click outside (or the save
   button) to store them — shown to all visitors.

That's it — you have a content your editors can change without touching code or
the admin.

## Next steps

* **[How to →](/How%20to/)** — bind the editor to your own model with
  `DjSuperAdminMixin`, use the raw (plain-text) editor with
  `{% superadmin_raw_content %}`, and enable in-place editing.
