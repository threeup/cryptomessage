const {app, BrowserWindow} = require('electron');
const zerorpc = require("zerorpc");
const ipc = require('electron').ipcMain;
const fs = require('fs');
const { spawn } = require('child_process');
const { myConsole } = require('./utils/helpers.js');

let ui;
let spawnedChild;
let zerorpcClient;

app.on('window-all-closed', () => {
    if (spawnedChild) {
        spawnedChild.stdin.pause();
        spawnedChild.kill();
    }
    app.quit();
})

app.on('ready', () => {
    spawnPythonServer();
    ui = new BrowserWindow({
        height: 1024,
        width: 1075,
        resizable: true
    });
    ui.loadURL('file://' + __dirname + '/index.html');

    ui.on('closed', () => {
        app.quit();
    });
});

function spawnPythonServer() {
    spawnedChild = spawn('python3',  ['-i', 'backend.py']);
    spawnedChild.on('close', (code, signal) => {
        console.log(`child error: ${code}, ${signal}`);
    });
    spawnedChild.on('error', (err) => console.error(err));
    spawnedChild.stdout.on('data', serverlog);
    connectToZeroRPC();
}

function serverlog(d) {
    console.log("server log")
    console.log(d)
}

function connectToZeroRPC() {
    zerorpcClient = new zerorpc.Client();
    zerorpcClient.connect('tcp://127.0.0.1:4242');
    ipc.on('hello', () => {
        console.log("rx hello")
        zerorpcClient.invoke('hello', 'RPC', (error, res, more) => {
            ui.webContents.send('hello-response', res);
            myConsole.log("tx hello")
            myConsole.log(res);
        });
    });

    ipc.on('object', () => {
        console.log("rx object")
        zerorpcClient.invoke('get_object', (error, res, more) => {
            ui.webContents.send('object-response', res);
            myConsole.log("tx object")
            myConsole.log(res);
        });
    });

}
