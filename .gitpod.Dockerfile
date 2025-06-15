FROM node:16-bookworm-slim
RUN apt-get update && apt-get install -y python3 python3-pip git && \
    echo "[global]\nbreak-system-packages = true\nno-warn-script-location = true\nroot-user-action = ignore" > /etc/pip.conf
ENV LC_ALL=C.UTF-8 LANG=C.UTF-8