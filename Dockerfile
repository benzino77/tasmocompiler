ARG BASE_IMAGE=node:12.16.2-buster-slim
FROM $BASE_IMAGE
LABEL maintainer="Piotr Antczak <antczak.piotr@gmail.com>"

COPY qemu-arm-static /usr/bin
COPY qemu-aarch64-static /usr/bin
ADD public /tasmocompiler/public/
ADD src /tasmocompiler/src/
ADD server /tasmocompiler/server/
ADD package.json yarn.lock .yarnrc /tasmocompiler/
RUN apt-get update && apt-get install -y python3 python3-pip git && \
  pip3 install --no-cache-dir platformio && \
  cd /tmp && \
  git clone https://github.com/arendst/Tasmota.git && \
  cd /tasmocompiler && \
  yarn install && \
  yarn global add nodemon && \
  yarn build && \
  yarn cache clean && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*
ENV LC_ALL=C.UTF-8 LANG=C.UTF-8
WORKDIR /tasmocompiler
ENTRYPOINT ["nodemon", "server/server.js"]
