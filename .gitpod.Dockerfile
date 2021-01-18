FROM node:12.16.2-buster-slim
RUN apt-get update && apt-get install -y python3 python3-pip git
ENV LC_ALL=C.UTF-8 LANG=C.UTF-8