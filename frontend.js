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

document.addEventListener('DOMContentLoaded', function() {

    output = document.getElementById('output');
    errorHeader = document.getElementById('error');

    const sayHello = document.getElementById('sayHello');
    const getObject = document.getElementById('getObject');
    const addFriend = document.getElementById('addFriend');

    sayHello.addEventListener('click', txHello);
    getObject.addEventListener('click', txObject);
    addFriend.addEventListener('click', txFriend);

    addListeners();
});


function addListeners() {
    ipc.on('hello-response', rxHello);
    ipc.on('object-response', (_, data) => addLi(`${data.constructor.name} - ${JSON.stringify(data)}`));
}

function txHello() {
    console.log("clicked hello")
    sendData('hello')
}

function txObject() {
    console.log("clicked object")
    sendData('object')
}
function txFriend() {
    console.log("clicked friend")
}
function rxHello(a, data) {
    console.log("respond hello")
    console.log(a)
    console.log(data)
    addLi(data)
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