## Bibliotek API
Service designed to store PDF files and preferences for my personal library.

[![Build Status](https://travis-ci.org/bibliotek/bibliotek-api.svg)](https://travis-ci.org/bibliotek/bibliotek-api)

## Usage
The API has the following working methods:

* `/` **GET**: Retrieves a list of PDFs.

Example request:
```shell
$ curl -X POST localhost:3000/ \
  -d 'owner=luis&name="My pdf paper"&path=./foo/bar.pdf'
```


## Docker Setup
[![](https://badge.imagelayers.io/luiscape/bibliotek-api:v.0.1.0.svg)](https://imagelayers.io/?images=luiscape/bibliotek-api:v.0.1.0 'Get your own badge on imagelayers.io')

Review the `Dockerfile` and run it linking to a MongoDB instance. `make setup` will try to setup its own collection in the instance (called `bibliotek`). This image needs the `upload` volume mounted and also the following environment variables in order to work appropriately:

* `MONGODB_DATABASE`: Dedicated database for the application.
* `MONGODB_USER_NAME`: Dedicated user name for manipulating collections.
* `MONGODB_USER_PASSWORD`: Password for the user above.

Those should be passed when running the image.

```shell
$ docker run -d --name bibliotek \
  --link mongo:mongo \
  -v ./uploads:./bibliotek-api/uploads \
  -e MONGODB_DATABASE=bibliotek \
  -e MONGODB_USER_NAME=bibliotek \
  -e MONGODB_USER_PASSWORD=bibliotek \
  bibliotek/bibliotek-api:latest
```
