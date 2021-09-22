ARG BASE_IMAGE=node:12.16.2-buster-slim
FROM $BASE_IMAGE
LABEL maintainer="Piotr Antczak <antczak.piotr@gmail.com>"

COPY qemu-arm-static /usr/bin
COPY qemu-aarch64-static /usr/bin
RUN apt-get update && apt-get install -y python3 git python3-setuptools && \
  apt-get install -y python3-pip && pip3 install --no-cache-dir platformio && \
  apt-get autoremove -y python3-pip && apt-get clean && \
  yarn global add nodemon && \
  cd /tmp && git clone https://github.com/arendst/Tasmota.git && \
  rm -rf /var/lib/apt/lists/* 
ADD public /tasmocompiler/public/
ADD server /tasmocompiler/server/
ADD src /tasmocompiler/src/
ADD package.json yarn.lock .yarnrc /tasmocompiler/
RUN cd /tasmocompiler && yarn install && \
  yarn build && \
  yarn cache clean
ENV LC_ALL=C.UTF-8 LANG=C.UTF-8
WORKDIR /tasmocompiler
ENTRYPOINT ["nodemon", "server/app.js"]
