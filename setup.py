from setuptools import setup, find_packages

with open("README.md", "r") as fh:
    long_description = fh.read()

setup(
    name='djsuperadmin',
    version='0.0.1',
    url='https://github.com/lotrekagency/djsuperadmin',
    install_requires=[],
    dependency_links=[],
    long_description=long_description,
    description="Edit contents directly on your page with Django",
    license="MIT",
    author="Lotrèk",
    author_email="dimmitutto@lotrek.it",
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
