new p5();

let particles = [];
let pixelSteps = 9;
let drawAsPoint = false;
let words = [];
let wordIndex = 0;
let bgColor = color(255, 100);
let fontName = "Arial";

class Particle {
    constructor() {
        this.location = createVector(0, 0);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.target = createVector(0, 0);

        this.closeEnoughTarget = 50;
        this.maxSpeed = 4;
        this.maxForce = 0.1;
        this.particleSize = 5;
        this.isKilled = false;

        this.startColor = color(0);
        this.targetColor = color(0);
        this.colorWeight = 0;
        this.colorBlendRate = 0.025;
    }

    move = () => {
        let proximityMult = 1.0;
        let distance = dist(this.location.x, this.location.y, this.target.x, this.target.y);
        if (distance < this.closeEnoughTarget) {
            proximityMult = distance / this.closeEnoughTarget;
        }

        let towardsTarget = createVector(this.target.x, this.target.y);
        towardsTarget.sub(this.location);
        towardsTarget.normalize();
        towardsTarget.mult(this.maxSpeed * proximityMult);

        let steer = createVector(towardsTarget.x, towardsTarget.y);
        steer.normalize();
        steer.mult(this.maxForce);
        this.acceleration.add(steer);

        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
    }

    display = () => {
        let currentColor = lerpColor(this.startColor, this.targetColor, this.colorWeight);
        if (drawAsPoint) {
            stroke(currentColor);
            point(this.location.x, this.location.y);
        } else {
            noStroke();
            fill(currentColor);
            ellipse(this.location.x, this.location.y, this.particleSize, this.particleSize);
        }

        if (this.colorWeight < 1.0) {
            this.colorWeight = min(this.colorWeight + this.colorBlendRate, 1.0);
        }
    }

    kill = () => {
        if (!this.isKilled) {
            let randomLocation = generateRandomLocation(width / 2, height / 2, (width + height) / 2);
            this.target.x = randomLocation.x;
            this.target.y = randomLocation.y;

            this.startColor = lerpColor(this.startColor, this.targetColor, this.colorWeight);
            this.targetColor = color(0);
            this.colorWeight = 0;

            this.isKilled = true;
            console.log("first kill");
        }
    }
}

function generateRandomLocation(_x, _y, _mag) {
    let randomDirection = createVector(random(0, width), random(0, height));

    let location = createVector(_x, _y);
    location.sub(randomDirection);
    location.normalize();
    location.mult(_mag);
    location.add(_x, _y);

    return location;
}

function displayWord(word) {
    let pg = createGraphics(width, height);
    pg.background(0);
    pg.fill(100);
    pg.textSize(100);
    pg.textAlign(CENTER, CENTER);
    pg.textFont(fontName);
    pg.text(word, width / 2, height / 2);
    pg.loadPixels();

    let newColor = color(random(255), random(255), random(255));

    let particleCount = particles.length;
    let particleIndex = 0;

    let coordsIndexes = [];
    for (let i = 0; i < (width * height) - 1; i += pixelSteps) {
        coordsIndexes.push(i);
    }

    // coordsIndexes.forEach(function (item, index, arr) {
    //     let randomIndex = int(random(0, coordsIndexes.length));
    //     let coordIndex = coordsIndexes[randomIndex];
    //     // if (index === randomIndex) {
    //     //     arr.splice(index, 1);
    //     // }
    //     arr.splice(randomIndex, 1);
    //     if (pg.pixels[coordIndex] !== 0) {
    //         let x = coordIndex % width;
    //         let y = coordIndex / width;
    //         let newParticle = new Particle();

    //         console.log(particleCount);
    //         if (particleIndex < particleCount) {
    //             newParticle = particles[particleIndex];
    //             newParticle.isKilled = false;
    //             particleIndex += 1;
    //         } else {
    //             let randomLocation = generateRandomLocation(width / 2, height / 2, (width + height) / 2);
    //             newParticle.location.x = randomLocation.x;
    //             newParticle.location.y = randomLocation.y;

    //             newParticle.maxSpeed = random(2, 5);
    //             newParticle.maxForce = newParticle.maxSpeed * 0.025;
    //             newParticle.particleSize = random(3, 6);
    //             newParticle.colorBlendRate = random(0.0025, 0.03);

    //             newParticle.startColor = lerpColor(newParticle.startColor, newParticle.targetColor, newParticle.colorWeight);
    //             newParticle.targetColor = newColor;
    //             newParticle.colorWeight = 0;

    //             newParticle.target.x = x;
    //             newParticle.target.y = y;

    //             particles.push(newParticle);
    //         }
    //     }
    // })

    for (let ci of coordsIndexes) {
        let randomIndex = int(random(0, coordsIndexes.length));
        let coordIndex = coordsIndexes[randomIndex];
        coordsIndexes.splice(randomIndex, 1);
        if (pg.pixels[coordIndex] !== 0) {
            let x = coordIndex % width;
            let y = coordIndex / width;
            let newParticle = new Particle();

            console.log(particleCount);
            if (particleIndex < particleCount) {
                newParticle = particles[particleIndex];
                newParticle.isKilled = false;
                particleIndex += 1;
            } else {
                let randomLocation = generateRandomLocation(width / 2, height / 2, (width + height) / 2);
                newParticle.location.x = randomLocation.x;
                newParticle.location.y = randomLocation.y;

                newParticle.maxSpeed = random(2, 5);
                newParticle.maxForce = newParticle.maxSpeed * 0.025;
                newParticle.particleSize = random(3, 6);
                newParticle.colorBlendRate = random(0.0025, 0.03);

                newParticle.startColor = lerpColor(newParticle.startColor, newParticle.targetColor, newParticle.colorWeight);
                newParticle.targetColor = newColor;
                newParticle.colorWeight = 0;

                newParticle.target.x = x;
                newParticle.target.y = y;

                particles.push(newParticle);
            }
        }
    }
    if (particleIndex < particleCount) {
        // console.log("yes");
        for (let i = particleIndex; i < particleCount; i++) {
            let p = particles[i];
            p.kill();
        }
    }
}

function setup() {
    createCanvas(700, 300);
    background(220);

    words.push("hello world");
    words.push("Wujinhjun");
    displayWord(words[wordIndex]);

}

function draw() {
    // background(220);
    fill(bgColor);
    noStroke();
    rect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
        let particle = particles[i];
        particle.move();
        particle.display();

        if (particle.isKilled) {
            if (particle.location.x < 0 || particle.location > width || particle.location.y < 0 || particle.location.y > height) {
                particles.splice(i, 1);
                // console.log("kill");
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