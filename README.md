# DjSuperAdmin [![PyPI](https://img.shields.io/pypi/v/djsuperadmin?style=flat-square)](https://pypi.org/project/djsuperadmin/) ![Codecov](https://img.shields.io/codecov/c/github/lotrekagency/djsuperadmin?style=flat-square) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/lotrekagency/djsuperadmin/Test,%20Coverage%20and%20Release?style=flat-square) [![GitHub](https://img.shields.io/github/license/lotrekagency/camomilla?style=flat-square)](./LICENSE)

✍🏻 Edit contents directly on your page with Django


## Here how it works!

<img src="https://github.com/lotrekagency/djsuperadmin/raw/master/demo.gif" alt="DjSuperAdmin demo" style="width: 100%;">

## Installation

```sh
pip install djsuperadmin
```

## Setup

Add `djsuperadmin` to your `INSTALLED_APPS` in `settings.py`

```py
INSTALLED_APPS = [
    # ...
    'djsuperadmin'
]
```

And import all the required js files in the footer

```html
{% load djsuperadmintag %}

{% djsuperadminjs %}
```

## Usage:

### Simple:

Djsuperadmin now comes with its own content model. You can use it directly in templates, like this:

```html
{% load djsuperadmintag %}

...

<body>
    <p>
        {% superadmin_content 'Some default content' %}
    </p>
</body>
```

Try also the raw content ```{% superadmin_content_raw 'Some default content' %}``` to edit things without a wysiwyg !

### Advanced:

Define your `custom Content` model using `DjSuperAdminMixin` and provide an endpoint to GET/PATCH your content

```py
from django.db import models
from djsuperadmin.mixins import DjSuperAdminMixin


class GenericContent(models.Model, DjSuperAdminMixin):

    identifier = models.CharField(max_length=200, unique=True)
    content = models.TextField()

    @property
    def superadmin_get_url(self):
        return f'/api/content/{self.pk}'

    @property
    def superadmin_patch_url(self):
        return f'/api/content/{self.pk}'
```

Then in your template

```html
{% load djsuperadmintag %}

...

<body>
    <p>
        {% superadmin_content your_object 'your_object_attribute' %}
    </p>
</body>
```


## Settings:

Try out the new djsuperadmin in_place mode for raw content! Type in your settings.py:

```python
DJSUPERADMIN = {"INPLACE_EDIT": True}
```