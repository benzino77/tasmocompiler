#!/bin/bash
# There has to be installed jq to retrieve VERSION variable: sudo apt install -y jq
# There has to be installed  qemu-user and quemu-user-static to build images for other architectures: sudo apt install -y qemu-user qemu-user-static
# To create manifest experimental features have to be enabled in $HOME/.docker/config.json adding it like:
# "experimental": "enabled"

VERSION=$(jq -r '.version' package.json)
# STEP 1 - get QEMU for arm and arm64 architecture
wget https://github.com/multiarch/qemu-user-static/releases/download/v4.0.0-2/qemu-arm-static -O qemu-arm-static
wget https://github.com/multiarch/qemu-user-static/releases/download/v4.0.0-2/qemu-aarch64-static -O qemu-aarch64-static
chmod +x qemu-arm-static
chmod +x qemu-aarch64-static

# STEP 2 - build images for three architectures
docker build -t benzino77/tasmocompiler -t benzino77/tasmocompiler:x86-64 -t benzino77/tasmocompiler:"${VERSION}"-x86-64 .
docker build --build-arg BASE_IMAGE=arm32v7/node:12.16.2-stretch-slim -t benzino77/tasmocompiler:arm32v7 -t benzino77/tasmocompiler:"${VERSION}"-arm32v7 .
docker build --build-arg BASE_IMAGE=arm64v8/node:12.16.2-stretch-slim -t benzino77/tasmocompiler:arm64v8 -t benzino77/tasmocompiler:"${VERSION}"-arm64v8 .

# STEP 3 push images to registry
docker push benzino77/tasmocompiler

# STEP 4 - create and push manifest
docker manifest create benzino77/tasmocompiler:latest benzino77/tasmocompiler:x86-64 benzino77/tasmocompiler:arm32v7 benzino77/tasmocompiler:arm64v8
docker manifest annotate benzino77/tasmocompiler:latest benzino77/tasmocompiler:x86-64 --os linux --arch amd64
docker manifest annotate benzino77/tasmocompiler:latest benzino77/tasmocompiler:arm32v7 --os linux --arch arm --variant v7
docker manifest annotate benzino77/tasmocompiler:latest benzino77/tasmocompiler:arm64v8 --os linux --arch arm64 --variant v8
docker manifest push --purge benzino77/tasmocompiler:latest
rm -rf qemu-arm-static
rm -rf qemu-aarch64-static
