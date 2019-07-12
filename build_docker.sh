#!/bin/bash
# there has to be installed  qemu-user and quemu-user-static to build images for other architectures: sudo apt install qemu-user qemu-user-static
# to create manifest experimental features have to be enabled in $HOME/.docker/config.json 

VERSION=`jq -r '.version' package.json`
# STEP 1 - get QEMU for arm and arm64 architecture
 wget https://github.com/multiarch/qemu-user-static/releases/download/v4.0.0-2/qemu-arm-static -O qemu-arm-static
 wget https://github.com/multiarch/qemu-user-static/releases/download/v4.0.0-2/qemu-aarch64-static -O qemu-aarch64-static
 chmod +x qemu-arm-static
 chmod +x qemu-aarch64-static

# STEP 2 - build images for three architectures
 docker build -t benzino77/tasmocompiler-x86_64 -t benzino77/tasmocompiler-x86_64:${VERSION} .
 docker build --build-arg BASE_IMAGE=arm32v7/node:10.15.3-stretch-slim -t benzino77/tasmocompiler-arm32v7 -t benzino77/tasmocompiler-arm32v7:${VERSION} .
 docker build --build-arg BASE_IMAGE=arm64v8/node:10.15.3-stretch-slim -t benzino77/tasmocompiler-arm64v8 -t benzino77/tasmocompiler-arm64v8:${VERSION} .

# STEP 3 push images to registry
 docker push benzino77/tasmocompiler-x86_64
 docker push benzino77/tasmocompiler-arm32v7
 docker push benzino77/tasmocompiler-arm64v8

# STEP 4 - create and push manifest
 docker manifest create benzino77/tasmocompiler:latest benzino77/tasmocompiler-x86_64:latest benzino77/tasmocompiler-arm32v7:latest benzino77/tasmocompiler-arm64v8:latest
 docker manifest annotate benzino77/tasmocompiler:latest benzino77/tasmocompiler-x86_64:latest --os linux --arch amd64
 docker manifest annotate benzino77/tasmocompiler:latest benzino77/tasmocompiler-arm32v7:latest --os linux --arch arm
 docker manifest annotate benzino77/tasmocompiler:latest benzino77/tasmocompiler-arm64v8:latest --os linux --arch arm64 --variant armv8
 docker manifest push --purge benzino77/tasmocompiler:latest
rm -rf qemu-arm-static
rm -rf qemu-aarch64-static
