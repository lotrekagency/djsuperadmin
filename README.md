# djSuperAdmin

**In your settings.py**
```py
INSTALLED_APPS = [
    'rest_framework',
    'hvad',
    'djsuperadmin'
    # Django modules
    ...
]



context_processors = [
    ...
    'djsuperadmin.context_processors.djsuperadmin'
    ...
]
```

**In your project/urls.py**
```py
urlpatterns = [
    ...
    url(r'^djsuperadmin/', include('djsuperadmin.urls'))
]
```

**In your template.html**
```html
{% load djsuperadmin %}
```
If you want use CKEditor
```html
<body>
    <div>
        {% content 'customcontent_id' %}
    </div>
</body>
```
If you want a raw content (no html needed)
```html
<body>
    <p>
        {% content_raw 'customcontent_id' %}
    </p>
</body>
```
```html
<footer>
    {{djsuperadminjs}}
</footer>
```
