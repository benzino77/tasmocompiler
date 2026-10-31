FROM node:22-bookworm-slim
LABEL maintainer="Piotr Antczak <antczak.piotr@gmail.com>"

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y python3 git python3-setuptools && \
  DEBIAN_FRONTEND=noninteractive apt-get install -y python3-pip python3-venv && \
  DEBIAN_FRONTEND=noninteractive apt-get clean && \
  npm install -g nodemon && \
  rm -rf /var/lib/apt/lists/*

ADD public /tasmocompiler/public/
ADD server /tasmocompiler/server/
ADD src /tasmocompiler/src/
ADD package.json package-lock.json /tasmocompiler/
# Uninstalling react and related packages to reduce image size is a rather dirty hack to make image smaller.
# These packages are not used in the server code, but they are required during the build.
# Having multistage build would be probably better, but it would require more complex Dockerfile.
RUN cd /tasmocompiler && npm ci && npm run build && \
  chown -R node:node /tasmocompiler && \
  npm uninstall react react-dom react-intl react-scripts @mui/styles @mui/material @mui/icons-material @emotion/styled @emotion/react

USER node
RUN python3 -m venv /home/node/.platformio/penv && \
  . /home/node/.platformio/penv/bin/activate && \
  pip install uv platformio
ENV LC_ALL=C.UTF-8 LANG=C.UTF-8 PATH=/home/node/.platformio/penv/bin:/home/node/.local/bin:$PATH
WORKDIR /tasmocompiler
ENTRYPOINT ["nodemon", "server/app.js"]
EXPOSE 3000/tcp
