# django-react-boilerplate

This repo is a boilerplate project for setting up fast progressive web apps with django and react/redux
it has been cobbled together and built on top of the following projects
* [Seedstars Django Base](https://github.com/Seedstars/django-react-redux-base)
* [React hmr srr](https://github.com/Alex-ray/v2-universal-js-hmr-ssr-react-redux)

**Server Side Rendering + gzip = speed**
* 1s initial page load on regular 3g network
* 4s meaningful paint on regular 3g network

**How?**
* request is sent to django on localhost:8000
* django sends POST request to intermediate express server on port:3000
* express returns with page html as a string
* django serves that html
* once the app.js is finished downloading, application state is handed over

## Retrieve code

* `$ git clone https://github.com/ruffers9/django-react-boilerplate.git`
* `$ cd django-react-boilerplate`

## Installation

* `$ docker-compose build`

## Start development

* `$ docker-compose up`
* browse to `localhost:8000`

## Stopping

Stop Docker development server

* `$ docker-compose stop`

## Resetting

Stop Docker development server and remove containers, networks, volumes, and images created by up.

* `$ docker-compose down`

### Accessing a container

You can access shell in a container

* `$ docker exec -i -t <CONTAINER_NAME_OR_ID> /bin/bash`

## Screenshots
![Home](/screenshots/home.png "home")
![Login](/screenshots/login.png "login")
![Menu](/screenshots/menu.png "menu")
