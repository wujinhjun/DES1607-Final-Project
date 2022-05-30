// new p5(s); // invoke p5
new p5();
let particleSystem = new ParticleSystem();
let asPoints = false;
let fontName = "Arial";
let bgColor = color(255, 100);
let words = ["相望不相闻"];
let wordIndex = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    // createCanvas(400, 400);
    background(220);

    // words.push();

    displayWord(words[wordIndex]);

}

function draw() {
    fill(bgColor);
    noStroke();
    rect(0, 0, width * 2, height * 2);

    for (let i = particleSystem.particles.length - 1; i >= 0; i--) {
        let particleTemp = new Particle(0, 0);
        particleTemp = particleSystem.particles[i];
        // particleTemp.run();
        particleTemp.display();
        particleTemp.move();

        if (particleTemp.dead) {
            particleSystem.particles.slice(i, 1);
        }
    }

    // // ps.display();
    // // // console.log(width);

    // let pg = createGraphics(width, height);
    // // // pg.beginDraw();
    // pg.background(0);
    // pg.fill(255);
    // pg.textAlign(CENTER, CENTER);
    // let font = "Arial Bold";
    // pg.textFont(font);
    // pg.textSize(100);
    // pg.text('晚安', width / 2, height / 2);
    // pg.rect(width, height, 20);
    // // pg.background(51);
    // // pg.noFill();
    // // pg.stroke(255);
    // // pg.ellipse(mouseX - 150, mouseY - 75, 60, 60);
    // // pg.endDraw();

    // image(pg, 0, 0);
}

function mouseClicked() {
    // particleSystem.addParticle(mouseX, mouseY);
    particleSystem.particles.push(mouseX, mouseY);
}

// // 打开一个 web socket
// const ws = new WebSocket("ws://localhost:5678");
// const sendButton = document.getElementById('send-btn');

// function verify() {
//     ws.onopen = function () {
//         ws.send("wujinhjun:kaimozhenhao");
//         // alert("正在验证");
//     }
// }

// function sendMessage(message) {
//     ws.onopen = function () {
//         ws.send(`${message}`);
//         // console.log('send successful');
//     }
// }

// function receive() {
//     ws.onmessage = function (evt) {
//         let received_msg = evt.data;
//         if (received_msg.indexOf("sorry") === -1) {
//             alert("收到信息： " + received_msg);
//         }
//     }
// }

// function closeCon() {
//     ws.onclose = function () {
//         alert("连接已关闭...");
//     }
// }

// function webSocketTest() {
//     if ("WebSocket" in window) {

//         // 连接建立后的回调函数
//         verify();

//         // 接收到服务器消息后的回调函数
//         receive();

//         // 连接关闭后的回调函数
//         closeCon();

//     } else {
//         // 浏览器不支持 WebSocket
//         alert("您的浏览器不支持 WebSocket!");
//     }
// }

// webSocketTest();