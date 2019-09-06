ARG BASE_IMAGE=node:10.15.3-stretch-slim
FROM $BASE_IMAGE
MAINTAINER Piotr Antczak <antczak.piotr@gmail.com>

COPY qemu-arm-static /usr/bin
COPY qemu-aarch64-static /usr/bin
ADD public /tasmocompiler/public/
ADD src /tasmocompiler/src/
ADD server /tasmocompiler/server/
ADD package.json yarn.lock .yarnrc /tasmocompiler/
RUN apt-get update && apt-get install -y python python-pip git && \
  pip install --no-cache-dir platformio==3.6.7 && \
  cd /tmp && \
  git clone https://github.com/arendst/Sonoff-Tasmota.git && \
  cd /tasmocompiler && \
  yarn install && \
  yarn global add nodemon && \
  yarn build && \
  yarn cache clean && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /tasmocompiler
ENTRYPOINT ["nodemon", "server/server.js"]
