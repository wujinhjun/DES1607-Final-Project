// 打开一个 websocket
const ws = new WebSocket("ws://localhost:5678");
const sendButton = document.getElementById('send-btn');

let openIf = false;
let myWindow;

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
            let temp = received_msg.split('#')[0];
            alert("收到信息： \n" + temp);
            console.log("发送给P5");
            let messageToP5 = trimWords(received_msg);
            openNewPage(messageToP5);
            //    现在传给它的还不是最终版本，还需要再处理一次
        }
    }
}

function trimWords(msg) {
    let n = msg.split("#\n");
    return n[2];
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

function openNewPage(msg) {
    if (!openIf) {
        let domain = 'http://127.0.0.1:5500/';
        let thepage = "lightvisualization/index.html";
        let strWindowFeatures = "width=600,height=600,menubar=yes,location=yes,resizable=yes,scrollbars=true,status=true,left=200,top=100";
        myWindow = window.open(domain + "lightvisualization/index.html", 'testWindow', strWindowFeatures);
        openIf = true;
    }

    myWindow.postMessage(msg, 'http://127.0.0.1:5500/lightvisualization/index.html');
    window.addEventListener('message', function (event) {
        console.log("接收成功： " + event.data);
    }, false);
}

webSocketTest();