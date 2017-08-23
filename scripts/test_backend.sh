#!/usr/bin/env bash

# Make sure you migrate before testing
# Add new apps to this line so that django can find the tests

docker exec -ti djangoreactboilerplate_django_1 /usr/local/bin/python src/djangorest/manage.py test accounts base  --settings=djangorest.settings.dev
