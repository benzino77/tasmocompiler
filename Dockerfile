FROM node:16-bookworm-slim
LABEL maintainer="Piotr Antczak <antczak.piotr@gmail.com>"

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y python3 git python3-setuptools && \
  DEBIAN_FRONTEND=noninteractive apt-get install -y python3-pip && \
  echo "[global]\nbreak-system-packages = true\nno-warn-script-location = true\nroot-user-action = ignore" > /etc/pip.conf && \
  pip3 install platformio && \
  DEBIAN_FRONTEND=noninteractive apt-get clean && \
  npm install -g nodemon && \
  rm -rf /var/lib/apt/lists/* 
ADD public /tasmocompiler/public/
ADD server /tasmocompiler/server/
ADD src /tasmocompiler/src/
ADD package.json package-lock.json /tasmocompiler/
RUN cd /tasmocompiler && npm ci && npm run build && \
  chown -R node:node /tasmocompiler
USER node
ENV LC_ALL=C.UTF-8 LANG=C.UTF-8 PATH=$PATH:/home/node/.local/bin
WORKDIR /tasmocompiler
ENTRYPOINT ["nodemon", "server/app.js"]
EXPOSE 3000/tcp
