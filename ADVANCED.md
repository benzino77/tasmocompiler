#### Advanced usage
If you want to get access to files created before or after compilation form the console you are able to do this. Source code of Tasmota is located in `/tmp/Sonoff-Tasmota`

##### Gitpod
1. press `ctrl+c` at the gitpod console
2. change directory to `/tmp/Sonoff-Tasmota` by typing `cd /tmp/Sonoff-Tasmota`
3. Now you can check from terminal what for example is the content of `platformio.ini` or `user_config_override.h` files.
4. type this command to see last 10 lines of `user_config_override.h` file:  `tail sonoff/user_config_override.h`
5. start TasmoCompiler again: `cd /workspace/tasmocompiler` and `node server/server.js`

![Gitpod Advanced](./docs/images/gitpod_advanced.png)

##### Docker
If you have TasmoCompiler docker running (started by `docker run --rm --name tasmocompiler -p 3000:3000 benzino77/tasmocompiler`) open a new terminal tab/window and:

1. run this command to _get into_ container: `docker exec -it tasmocompiler /bin/bash`
2. change directory to `/tmp/Sonoff-Tasmota` by typing `cd /tmp/Sonoff-Tasmota`
3. Now you can check from terminal what for example is the content of `platformio.ini` or `user_config_override.h` files.
4. type this command to see last 10 lines of `user_config_override.h` file:  `tail sonoff/user_config_override.h`
5. exit docker container shell by pressing `ctrl+d`

![Docker Advanced](./docs/images/docker_advanced.png)
