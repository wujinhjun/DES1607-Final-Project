// 打开一个 web socket
const ws = new WebSocket("ws://localhost:5678");
const sendButton = document.getElementById('send-btn');

function verify() {
    ws.onopen = function () {
        ws.send("wujinhjun:kaimozhenhao");
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

        // 连接建立后的回调函数
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