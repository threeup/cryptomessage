
## Getting Started

install zmq
* Linux: `sudo apt-get install libzmq3-dev`
* OSX: `brew install zmq`
* Windows: `http://zeromq.org/distro:microsoft-windows`

install zerorpc for python3
`pip install zerorpc`

change zeromq build target
`npm rebuild zeromq --runtime=electron --target=2.0.18`

install dependencies:
`npm install`

run electron 
`npm start`

## Architecture

User Interface is frontend.js aka client
Python logic is backend.py aka rpc server

main.js will launch both client and rpc server.

## Quick Gotchas
1. node-gyp will not build properly on node version 10 right now. Use node version 8.*

## Forked from
based on repo:
`https://github.com/pazrul/electron-zerorpc-example.git`
