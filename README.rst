DjSuperAdmin
============

✍🏻 Edit contents directly on your page with Django

|Latest Version| |codecov| |Build Status| |License: MIT|

Installation
------------

.. code:: sh

    pip install djsuperadmin

Setup
-----

Add ``djsuperadmin`` to your ``INSTALLED_APPS`` in ``settings.py``

.. code:: py

    INSTALLED_APPS = [
        # ...
        'djsuperadmin'
    ]

And import all the required js files in the footer

.. code:: html

    {% load djsuperadmintag %}

    {% djsuperadminjs %}

Usage
-----

Define your ``custom Content`` model using ``DjSuperAdminMixin``

.. code:: py

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

Then in your template

.. code:: html

    {% load djsuperadmintag %}

    ...

    <body>
        <p>
            {% superadmin_content your_object 'your_object_attribute' %}
        </p>
    </body>

.. |Latest Version| image:: https://img.shields.io/pypi/v/djsuperadmin.svg
   :target: https://pypi.python.org/pypi/djsuperadmin/
.. |codecov| image:: https://codecov.io/gh/lotrekagency/djsuperadmin/branch/master/graph/badge.svg
   :target: https://codecov.io/gh/lotrekagency/djsuperadmin
.. |Build Status| image:: https://travis-ci.org/lotrekagency/djsuperadmin.svg?branch=master
   :target: https://travis-ci.org/lotrekagency/djsuperadmin
.. |License: MIT| image:: https://img.shields.io/badge/License-MIT-blue.svg
   :target: https://github.com/lotrekagency/djsuperadmin/blob/master/LICENSE
