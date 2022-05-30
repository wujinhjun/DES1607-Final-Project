new p5();

let particles = [];
let pixelSteps = 9;
let drawAsPoint = false;
let words = [];
let wordIndex = 0;
let bgColor = color(220, 100);
let fontName = "Arial";

function setup() {
    createCanvas(700, 300);
    background(220);

    words.push("hello world");
    words.push("Wujinhjun");
    displayWord(words[wordIndex]);
}

function draw() {
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