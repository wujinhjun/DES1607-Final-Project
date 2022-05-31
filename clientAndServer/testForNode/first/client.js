
// const sendButton = document.getElementById('send-btn');
// 打开一个 web socket
const ws = new WebSocket("ws://localhost:8888");
require("server.js");

function verify() {
    ws.onopen = function () {
        ws.send("client:1");
        console.log("正在验证");
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
            console.log("收到信息： " + received_msg);
        }
        console.log("receive");
    }
}

function closeCon() {
    ws.onclose = function () {
        console.log("连接已关闭...");
    }
}

function webSocketTest() {
    if ("WebSocket" in window) {

        // 连接建立后的回调函数
        verify();

        // 接收到服务器消息后的回调函数
        receive();

        // 连接关闭后的回调函数
        closeCon();
        // receive();



        // //发送信息
        // const msg = textArea();
        // controlMessage(msg);
        console.log("websocket");
    } else {
        // 浏览器不支持 WebSocket
        console.log("您的浏览器不支持 WebSocket!");
    }
}