# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in pav_propms/__init__.py
from pav_propms import __version__ as version

setup(
	name='pav_propms',
	version=version,
	description='PAV Property Management Solution',
	author='Patrner Team',
	author_email='a.kuhlani@partner-cons.com',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
