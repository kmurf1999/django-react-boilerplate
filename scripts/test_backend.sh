#!/usr/bin/env bash

docker exec -ti djangoreactboilerplate_django_1 /usr/local/bin/python src/djangorest/manage.py test accounts base  --settings=djangorest.settings.dev
