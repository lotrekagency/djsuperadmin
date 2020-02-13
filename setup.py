from setuptools import setup


setup(
    name='djsuperadmin',
    version='0.9.0',
    url='https://github.com/lotrekagency/djsuperadmin',
    install_requires=[],
    dependency_links=[],
    long_description=open("README.rst", "r").read(),
    description="Edit contents directly on your page with Django",
    license="MIT",
    author="Lotrèk",
    author_email="dimmitutto@lotrek.it",
    packages=['djsuperadmin', 'djsuperadmin.templatetags'],
    include_package_data=True,
    classifiers=[
        'Environment :: Web Environment',
        'Framework :: Django',
        'Intended Audience :: Developers',
        'Programming Language :: Python',
        'Programming Language :: Python :: 3'
    ]
)
