# -*- coding: utf-8 -*-
"""Install jobcodeai as a package that can be imported.

Typical usage example:

    $ cd path/to/setup.py
    $ pip install -e .
"""

from setuptools import setup, find_packages


MODULE_NAME = "jobcodeai"
MODULE_VERSION = "0.1.0"
MODULE_DESCRIPTION = "Job Code Search with Large Language Models"
MODULE_AUTHOR_NAME = "Richard Abrich"
MODULE_AUTHOR_EMAIL = "richard.abrich@mldsai.com"
MODULE_REPO_URL = "https://github.com/MLDSAI/jobcodeai"
MODULE_README_FNAME = "README.md"
MODULE_LICENSE_FNAME = "LICENSE"


readme = open(MODULE_README_FNAME).read()
license = open(MODULE_LICENSE_FNAME).read()


setup(
    name=MODULE_NAME,
    version=MODULE_VERSION,
    description=MODULE_DESCRIPTION,
    long_description=readme,
    author=MODULE_AUTHOR_NAME,
    author_email=MODULE_AUTHOR_EMAIL,
    url=MODULE_REPO_URL,
    license=license,
    packages=find_packages(exclude=("tests", "docs")),
)
