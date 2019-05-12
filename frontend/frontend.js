const ipc = require('electron').ipcRenderer;
let output;
let errorHeader;

function sendData(dataName, value) {
    hideError();
    if (value) {
        ipc.send(dataName, value);
    } else {
        ipc.send(dataName);
    }
}
function addLi(text) {
    const liElem = document.createElement('li');
    liElem.textContent = text;
    output.appendChild(liElem);
}

function writeError(msg) {
    errorHeader.textContent = msg;
    if (msg === '') {
        hideError();
    } else {
        showError();
    }
}

function showError() {
    errorHeader.classList.remove('hidden');
}

function hideError() {
    errorHeader.classList.add('hidden');
}


let elementConnect;
let elementRead;
let elementDisconnect;
let elementTest;
let elementTextEntry;

document.addEventListener('DOMContentLoaded', function() {

    output = document.getElementById('output');
    errorHeader = document.getElementById('error');

    elementConnect = document.getElementById('connect');
    elementRead = document.getElementById('read');
    elementSend = document.getElementById('send');
    elementDisconnect = document.getElementById('disconnect');
    elementTest = document.getElementById('test');
    elementTextEntry = document.getElementById('textentry');
    elementTextEntry.value = "Greetings~";

    addConnect();
    addTalk();
});

function addConnect() {
    elementConnect.addEventListener('click', () => sendData('connect') );
    ipc.on('connect-response', (_ ,data) => addLi(data) );
    elementDisconnect.addEventListener('click', () => sendData('disconnect') );
    ipc.on('disconnect-response', (_ ,data) => addLi(data) );
}


function addTalk() {
    elementRead.addEventListener('click', () => sendData('read') );
    ipc.on('read-response', (_ ,data) => addLi(data) );
    elementSend.addEventListener('click', () => sendData('send', elementTextEntry.value) );
    ipc.on('send-response', (_ ,data) => addLi(data) );
    elementTest.addEventListener('click', () => sendData('test') );
    ipc.on('test-response', (_, data) => addLi(`${data.constructor.name} - ${JSON.stringify(data)}`));
}
