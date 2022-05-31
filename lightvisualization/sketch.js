new p5();

let particles = [];
let pixelSteps = 9;
// let drawAsPoint = false;
let words = [];
let wordIndex = 0;
let bgColor = color(20, 100);
let fontName = "Arial";
let back = loadImage("./pic/back1.jpeg");
let wordsString = "";

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
    words.push(" ");

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
    // if (!wordsString) {
    //     lis();
    //     console.log("调用");
    // }
    // controlPlay();
}

lis();

function mouseClicked() {

    // console.log(wordsString);
    // if (mouseButton === LEFT) {
    //     if (wordIndex > words.length - 1) {
    //         wordIndex = 0;
    //     }
    //     displayWord(words[wordIndex]);
    //     wordIndex += 1;
    // }
    controlPlay();

}

function controlPlay() {
    for (let i = 0; i < words.length; i++) {
        // console.log(i);
        setTimeout(function () {
            // lll(i);
            displayWord(words[i]);
            console.log(i);
        }, i * 5000);
    }
}

function lll(i) {
    console.log(i);
}

function lis() {
    // console.log("进入监听");
    window.addEventListener('message', function (event) {
        if (event.origin !== "http://127.0.0.1:5500") {
            return;
        }
        console.log('收到' + event.data);
        wordsString = event.data;
        dealListForPoem(wordsString);
        // console.log(event.origin);
        window.opener.postMessage('收到', "http://127.0.0.1:5500")

    }, false);
}

function dealListForPoem(str) {
    // 利用正则表达式对诗词中的符号进行处理
    let n = str.split(/，|。|、|\n/);
    words = [];
    console.log(n);
    for (var i of n) {
        i.trim();

        if (i === "") {
            continue
        }
        words.push(i);
        // console.log(i);
    }
    words.push(" ");
    // return wordTemp;
}