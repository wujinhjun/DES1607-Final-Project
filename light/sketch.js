new p5();

let particles = [];
let pixelSteps = 9;
let drawAsPoint = false;
let words = [];
let wordIndex = 0;
let bgColor = color(220, 100);
let fontName = "Arial";

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
    pg.fill(255);
    pg.textSize(150);
    pg.textAlign(CENTER, CENTER);
    pg.textFont(fontName);
    pg.text(word, width / 2, height / 2);
    pg.loadPixels();
    // let d = pg.pixelDensity();
    image(pg, 0, 0);

    let newColor = color(random(255), random(255), random(255));

    let particleCount = particles.length;
    let particleIndex = 0;

    // let d = pixelDensity();
    let coordsIndexes = [];
    // let unit = d * 2;
    // for (let i = 0; i < (width * height * unit * unit); i += (unit ** 2) * pixelSteps) {
    //     coordsIndexes.push(i);
    // }
    for (let i = 0; i < (width * height); i += pixelSteps) {
        coordsIndexes.push(i);
    }
    console.log(`px: ${pg.pixels.length}`);
    console.log(`cx: ${coordsIndexes.length}`);
    // for (let ci of coordsIndexes) 
    // console.log(pg.pixels);
    for (let i = 0; i < coordsIndexes.length; i++) {
        let randomIndex = int(random(0, coordsIndexes.length));
        let coordIndex = coordsIndexes[randomIndex];
        coordsIndexes.splice(randomIndex, 1);
        if (pg.pixels[coordIndex * 4] !== 0) {
            // console.log(pg.pixels[coordIndex]);
            // console.log(coordIndex);
            let x = coordIndex % width;
            // console.log(x);
            let y = coordIndex / width;
            // console.log(`x:${x} + y:${y}`);

            let newParticle = new Particle();

            // console.log(particleCount);
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


                // fill(255, 127, 0);
                // noStroke();
                // ellipse(x, y, 3);

                particles.push(newParticle);
            }
            newParticle.startColor = lerpColor(newParticle.startColor, newParticle.targetColor, newParticle.colorWeight);
            newParticle.targetColor = newColor;
            newParticle.colorWeight = 0;

            newParticle.target.x = x;
            newParticle.target.y = y;
        }
    }
    if (particleIndex < particleCount) {
        // console.log("yes");
        for (let i = particleIndex; i < particleCount; i++) {
            let p = particles[i];
            p.kill();
        }
    }
    updatePixels();
}

function setup() {
    createCanvas(700, 300);
    // createCanvas(70, 30);
    background(220);

    words.push("hello world");
    words.push("Wujinhjun");
    displayWord("hello");

}

function draw() {
    // background(220);
    fill(bgColor);
    noStroke();
    rect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
        let particle = particles[i];
        // particle.move();
        // particle.display();
        particle.run();

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