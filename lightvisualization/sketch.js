new p5();

let particles = [];
let pixelSteps = 9;
let drawAsPoint = false;
let words = [];
let wordIndex = 0;
let bgColor = color(20, 100);
let fontName = "Arial";
let back = loadImage("./pic/back1.jpeg");
// 打开一个 web socket
const ws = new WebSocket("ws://localhost:5678");

function setup() {
    createCanvas(1200, 300);
    background(220);

    words.push("东风夜放花千树");
    words.push("更吹落 星如雨");
    words.push("宝马雕车香满路");
    words.push("凤箫声动");
    words.push("玉壶光转");
    words.push("一夜鱼龙舞");

    words.push("蛾儿雪柳黄金缕");
    words.push("笑语盈盈暗香去");
    words.push("众里寻他千百度");
    words.push("蓦然回首");
    words.push("那人却在");
    words.push("灯火阑珊处");

    displayWord(words[wordIndex]);
}

function draw() {
    // background(back);
    fill(bgColor);
    noStroke();
    rect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
        let particle = particles[i];
        particle.run();

        if (particle.isKilled) {
            if (particle.location.x < 0 || particle.location > width || particle.location.y < 0 || particle.location.y > height) {
                particles.splice(i, 1);
            }
        }
    }
    // receive();

}

function mouseClicked() {

    console.log(particles);
    if (mouseButton === LEFT) {
        wordIndex += 1;
        if (wordIndex > words.length - 1) {
            wordIndex = 0;
        }
        displayWord(words[wordIndex]);
    }

}

// webSocketTest();