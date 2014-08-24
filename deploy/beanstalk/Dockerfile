FROM ubuntu:14.04
MAINTAINER Procur Systems, Inc.

RUN apt-get update
RUN apt-get install -y git nodejs npm
RUN ln -s /usr/bin/nodejs /usr/bin/node

RUN mkdir -p /data/keys
ADD deploy_key /data/keys/deploy_key
ADD deploy_key.pub /data/keys/deploy_key.pub
ADD ssh_special.sh /data/keys/ssh_special.sh
RUN chmod 755 /data/keys/ssh_special.sh

RUN mkdir -p /data/app
WORKDIR /data/app
RUN GIT_SSH=/data/keys/ssh_special.sh git clone git@github.com:Procur/Nautilus.git .
RUN git checkout sprint

RUN npm install
RUN npm install sails -g

ADD env.js /data/app/config/env/production.js

EXPOSE 80

CMD MONGOHQ_URL=mongodb://dev:dev@kahana.mongohq.com:10072/nautilus-staging sails lift --prod
