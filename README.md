#### What it is?
TasmotaCompiler is a simple web GUI which allows you to compile fantastic [Tasmota](https://github.com/arendst/Sonoff-Tasmota) firmware with your own settings:
- You can select which features/sensors of Tasmota firmware you want to use
- Credentials for your IOT WiFi network, so even after unexpected problems with the device (complete lost of configuration), credentials for your network will still be there, but mainly you don't have to connect to AP, served by Tasmota to configure your Home WiFi
- You can select Tasmota version you want to compile. You can select `development` bleading edge version, or ie. previous stable release `6.4.1` or `6.2.1` if this is the one you like
- You can also select with what Core version you want to compile your custom firmware: 2.3.0, 2.4.2 or maybe 2.5.0
- Hardware version (Sonoffs, Wemos, NodeMCU).
- Language version
- You can also provide custom `#defines` if you want to build even more suitable firmaware for your needs

#### Why?
Well, there are two reasons. First is that I want to build my first application written in NodeJS/React. The second one is based on the observation that everytime I prepare a new device I have to start atom with platformio installed, configure all `#defines` (well, I have template which I copy) and prepare `platformio.ini`, create a branch from version I like to use, etc..

That's why I decided to prepare a solution which is easier to use (just a few clicks) and does not require knowledge how to install dev environment to build custom firmware.


#### How it works?
The easiest way is to look at the screenshots (the whole process is five steps only). After compilation you will be able to download three files:
1. Your new `firmware.bin` file, which can be uploaded to your device via Tasmota WebGUI, espotool, ESPEasy flasher or any other tool you used to use to flash your device
2. `platformio.ini` file, to check what options for platformio were used to compile the custom firmware file
3. `user_config_override.h` file to check what features are included/excluded from resulting firmware

You have to upload only the first `firmware.bin` file to your device. How to do that is perfeclty described on [Tasmota wiki](https://github.com/arendst/Sonoff-Tasmota/wiki/Flashing).

![Step01](./docs/images/step01.png)
![Step02](./docs/images/step02.png)
![Step03](./docs/images/step03.png)
![Step04](./docs/images/step04.png)
![Step05](./docs/images/step05.png)
![Compile01](./docs/images/compile01.png)

#### How to start using TasmoCompiler?
##### Easy way
Start TasmoCompiler in docker:

`docker pull benzino77/tasmocompiler`
`docker run --rm --name tasmocompiler -p 3000:3000 benzino77/tasmocompiler`

Then point your browser to http://localhost:3000

If you want to see debug messages on docker console you can run a container with env variable:

`docker run --rm --name tasmocompiler -p 3000:3000 -e DEBUG=server,git,compile benzino77/tasmocompiler`

- `server` to see http server messages
- `git` to see git operation messages
- `compile` to see messages during compilation

You can also specify different port on which TasmoCompiler will be available on the host:

`docker run --rm --name tasmocompiler -p 8080:3000 benzino77/tasmocompiler`

Then point your browser to http://localhost:8080

##### Less easy way
1. Install `NodeJS` and `Python 2.7.x`
2. Install [`yarn`](https://yarnpkg.com/en/docs/install)
3. Install [`platformio`](https://docs.platformio.org/en/latest/installation.html)
4. Clone/download the repository from github and change directory to the cloned repo
5. run `yarn install`
6. run `yarn build`
7. run `node server/server.js`
8. point your browser to http://localhost:3000

#### Disclaimer
Everything you do, you do on your own responsibility. I do not take any responsibility for damages or problems, that may arise as a result of using this solution or its products.

##### Credits
Thanks to [The Arends](https://github.com/arendst) and the entire Tasmota Dev Team for fantastic work!
