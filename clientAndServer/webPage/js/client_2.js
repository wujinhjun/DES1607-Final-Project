// let socket;
// if ("WebSocket" in window) {
//     const ws = new WebSocket("ws://127.0.0.1:8181/test");
//     socket = ws;
//     ws.onopen = function () {
//         console.log('连接成功');
//         alert("连接成功, 请输入账号和密码");
//     };
//     ws.onmessage = function (evt) {
//         const received_msg = evt.data;
//         // document.getElementById("showMes").value += received_msg + "\n";
//     };
//     ws.onclose = function () {
//         alert("断开了连接");
//     };
// } else {
//     alert("浏览器不支持WebSocket");
// }
//
// // function sendMeg() {
// //     const message = document.getElementById("name").value + ":" + document.getElementById("mes").value;
// //     document.getElementById("showMes").value += message + "\n\n";
// //     socket.send(message);
// // }
// 打开一个 web socket
const ws = new WebSocket("ws://localhost:8181");
// const sock = new WebSocket
const sendButton = document.getElementById('send-btn');
// const wss = require("nodejs-websocket");

// const port = 8001;
// let mess = "";
function verify() {
    ws.onopen = function () {
        ws.send("syqj:kyyjm");
        alert("正在验证");
    }
}

function sendMessage(message) {
    ws.onopen = function () {
        ws.send(`${message}`);
        console.log('send successful');
    }
}

function receive() {
    ws.onmessage = function (evt) {
        let received_msg = evt.data;
        if (received_msg.indexOf("sorry") === -1) {
            alert("收到信息： " + received_msg);
            // breadCast(received_msg);
            // mess = received_msg;
        }
    }
}

function closeCon() {
    ws.onclose = function () {
        alert("连接已关闭...");
    }
}

function webSocketTest() {
    if ("WebSocket" in window) {

        // // 连接建立后的回调函数
        verify();

        // 接收到服务器消息后的回调函数
        receive();

        // 连接关闭后的回调函数
        closeCon();

        // //发送信息
        const msg = textArea();
        controlMessage(msg);
    } else {
        // 浏览器不支持 WebSocket
        alert("您的浏览器不支持 WebSocket!");
    }
}

function textArea() {
    const theTextContent = document.getElementById('text-scope');
    const msg = theTextContent.value;
    // console.log(msg);
    return msg;
}

function clearText() {
    const theTextContent = document.getElementById('text-scope');
    // console.log(theTextContent);
    theTextContent.value = '';
    // theTextContent.textContent = " ";
    // console.log('clear');
}


function controlMessage(message) {
    sendButton.onclick = () => {
        const msg = textArea();
        // sendMessage(msg);
        ws.send(msg);
        clearText();
    }
}
// WebSocketTest();
webSocketTest();