#!/usr/bin/env bash

until cd src/djangorest
do
    echo "Waiting for django volume..."
done

until python manage.py migrate --settings=djangorest.settings.dev
do
    echo "Waiting for postgres ready..."
    sleep 2
done

python manage.py runserver 0.0.0.0:8000 --settings=djangorest.settings.dev
