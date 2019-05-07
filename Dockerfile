FROM node:10.15.3-stretch-slim
MAINTAINER Piotr Antczak <antczak.piotr@gmail.com>


ADD public /tasmocompiler/public/
ADD src /tasmocompiler/src/
ADD server /tasmocompiler/server/
ADD package.json yarn.lock /tasmocompiler/
RUN apt-get update && apt-get install -y python python-pip git && \
  pip install --no-cache-dir -U platformio && \
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
