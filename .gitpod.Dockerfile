FROM node:16-bookworm-slim
RUN apt-get update && apt-get install -y python3 python3-pip python3-venv git

USER gitpod
RUN python3 -m venv /home/gitpod/.platformio/penv && \
    . /home/gitpod/.platformio/penv/bin/activate && \
    pip install uv platformio

ENV LC_ALL=C.UTF-8 LANG=C.UTF-8 PATH=/home/gitpod/.platformio/penv/bin:/home/gitpod/.local/bin:$PATH