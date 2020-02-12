# DjSuperAdmin

✍🏻 Edit contents directly on your page with Django

[![Latest Version](https://img.shields.io/pypi/v/djsuperadmin.svg)](https://pypi.python.org/pypi/djsuperadmin/)
[![codecov](https://codecov.io/gh/lotrekagency/djsuperadmin/branch/master/graph/badge.svg)](https://codecov.io/gh/lotrekagency/djsuperadmin)
[![Build Status](https://travis-ci.org/lotrekagency/djsuperadmin.svg?branch=master)](https://travis-ci.org/lotrekagency/djsuperadmin)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/lotrekagency/djsuperadmin/blob/master/LICENSE)

## Watch the video to see how it works

[![Watch the video](https://img.youtube.com/vi/dunHa2HvoE0/0.jpg)](https://youtu.be/dunHa2HvoE0)

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

## Usage

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
