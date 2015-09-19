###########################################################
# Image that runs a status collection service for scrapers.
# Receives link from a MongoDB container and links to the
# hdx-monitor-server.
###########################################################

FROM node:latest

MAINTAINER Luis Capelo <luiscape@gmail.com>

#
# Install the MongoDB shell
# for configuring the database.
#
RUN \
  apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10 \
  && echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.0 main" | tee /etc/apt/sources.list.d/mongodb-org-3.0.list \
  && apt-get update \
  && apt-get install -y mongodb-org-shell

#
# Installing application.
#
RUN \
  git clone https://github.com/bibliotek/bibliotek-api \
  && cd bibliotek-api \
  && make setup


WORKDIR '/bibliotek-api'

EXPOSE 3000

CMD ["make", "run"]
