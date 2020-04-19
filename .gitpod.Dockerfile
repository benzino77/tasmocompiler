FROM node:10.15.3-stretch-slim
RUN apt-get update && apt-get install -y python3 python3-pip git
ENV LC_ALL=C.UTF-8 LANG=C.UTF-8