#!/bin/bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER djangorest WITH PASSWORD 'password' CREATEDB;
    CREATE DATABASE djangorest_dev;
    GRANT ALL PRIVILEGES ON DATABASE djangorest_dev TO djangorest;
EOSQL
