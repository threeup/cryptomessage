const {app, BrowserWindow} = require('electron');
const zerorpc = require("zerorpc");
const ipc = require('electron').ipcMain;
const fs = require('fs');
const { spawn } = require('child_process');
const { myConsole } = require('./frontend/helpers.js');
const pythonthree = 'python'
const util = require("util");


let ui;
let core;
let zerorpcClient;

app.on('window-all-closed', () => {
    if (spawnedChild) {
        spawnedChild.stdin.pause();
        spawnedChild.kill();
    }
    app.quit();
})

app.on('ready', () => {
    spawnCore();
    connectToZeroRPC();
    ui = new BrowserWindow({
        height: 1024,
        width: 1075,
        resizable: true
    });
    ui.loadURL('file://' + __dirname + '/frontend/index.html');

    ui.on('closed', () => {
        app.quit();
    });
});


function spawnCore(hookIn, hookOut, hookErr) {
    core = spawn(pythonthree,  ['-i', 'coreclient/core.py']);
    util.log("x")
    core.stdout.on('data',function(chunk){
        var textChunk = chunk.toString('utf8');
        util.log(textChunk);
    });
    core.stderr.on('data',function(chunk){
        var textChunk = chunk.toString('utf8');   
        util.log(textChunk);
    });
    core.on('close', (code, signal) => {
        console.log(`child error: ${code}, ${signal}`);
    });
    core.on('error', (err) => console.error(err));
}

function connectToZeroRPC() {
    zerorpcClient = new zerorpc.Client();
    zerorpcClient.connect('tcp://127.0.0.1:4242');
    ipc.on('connect', () => {
        zerorpcClient.invoke('get_connect', (error, res, more) => {
            ui.webContents.send('connect-response', res);
            myConsole.log("tx connect", res)
        });
    });

    ipc.on('disconnect', () => {
        zerorpcClient.invoke('get_disconnect', (error, res, more) => {
            ui.webContents.send('disconnect-response', res);
            myConsole.log("tx disconnect", res)
        });
    });

    ipc.on('read', () => {
        zerorpcClient.invoke('get_read', (error, res, more) => {
            ui.webContents.send('read-response', res);
            myConsole.log("tx read", res)
        });
    });
    ipc.on('send', (event, val) => {
        zerorpcClient.invoke('get_send', val, (error, res, more) => {
            ui.webContents.send('send-response', res);
            myConsole.log("tx send", res)
        });
    });

    ipc.on('test', () => {
        zerorpcClient.invoke('get_test', (error, res, more) => {
            ui.webContents.send('test-response', res);
            myConsole.log("tx test", res)
        });
    });
}
