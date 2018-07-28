#! /bin/bash

yarn lerna:api
heroku container:push --app=gentle-tor-29321 web
heroku container:release --app=gentle-tor-29321 web



# Digital Ocean
# yarn api:docker:build
# yarn api:docker:run
# ssh root@ip "docker pull funkstyr/earthbnb:lataest && docker tag funkstyr/earthbnb:lastest dokku/earthbnb:latest && dokku tags:deploy earthbnb latest"