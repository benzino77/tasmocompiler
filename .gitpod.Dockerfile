FROM node:22-bookworm-slim
RUN apt-get update && apt-get install -y python3 python3-setuptools python3-pip python3-venv git

ENV LC_ALL=C.UTF-8 LANG=C.UTF-8