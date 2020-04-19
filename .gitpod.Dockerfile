FROM node:10.15.3-stretch-slim
ADD public /tasmocompiler/public/
ADD src /tasmocompiler/src/
ADD server /tasmocompiler/server/
ADD package.json yarn.lock .yarnrc /tasmocompiler/
RUN apt-get update && apt-get install -y python3 python3-pip git && \
  pip3 install --no-cache-dir platformio
ENV LC_ALL=C.UTF-8 LANG=C.UTF-8