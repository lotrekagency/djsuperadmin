from setuptools import setup, find_packages

with open("README.md", "r") as fh:
    long_description = fh.read()

setup(
    name='djsuperadmin',
    version='0.0.1',
    url='https://github.com/bnznamco/djsuperadmin',
    install_requires=[
        'django-hvad @ https://github.com/lotrekagency/django-hvad/archive/master.zip',
        'djangorestframework>=3.9.2',
    ],
    dependency_links=[
        # Make sure to include the `#egg` portion so the `install_requires` recognizes the package
        'git+ssh://git@github.com/lotrekagency/django-hvad.git@master#egg=django-hvad-lotrek-1.8.0'
    ],
    long_description=long_description,
    description="Insuperable content editing",
    license="MIT",
    author="Gabriele Baldi",
    author_email="gabriele.baldi.01@gmail.com",
    packages=find_packages(),
    include_package_data=True,
    classifiers=[
        'Environment :: Web Environment',
        'Framework :: Django',
        'Intended Audience :: Developers',
        'Programming Language :: Python',
        'Programming Language :: Python :: 3'
    ]
)
