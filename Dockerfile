FROM node:14-buster-slim
LABEL maintainer="Piotr Antczak <antczak.piotr@gmail.com>"

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get --no-install-recommends install -y python3 git python3-setuptools && \
  DEBIAN_FRONTEND=noninteractive apt-get --no-install-recommends install -y python3-pip && pip3 install --no-cache-dir platformio && \
  DEBIAN_FRONTEND=noninteractive apt-get clean && \
  npm install -g nodemon && \
  cd /tmp && git clone https://github.com/arendst/Tasmota.git && \
  rm -rf /var/lib/apt/lists/*
ADD public /tasmocompiler/public/
ADD server /tasmocompiler/server/
ADD src /tasmocompiler/src/
ADD package.json package-lock.json /tasmocompiler/
RUN cd /tasmocompiler && npm ci && npm run build
ENV LC_ALL=C.UTF-8 LANG=C.UTF-8
WORKDIR /tasmocompiler
ENTRYPOINT ["nodemon", "server/app.js"]
EXPOSE 3000/tcp
