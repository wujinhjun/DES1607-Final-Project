class Particle {

    constructor(x, y) {
        // move and direction
        this.location = createVector(x, y);
        this.velocity = createVector(random(-1, 1), random(-1, 1));
        this.acceleration = createVector(0, 0);
        this.target = createVector(0, 0);
        this.maxForce = 0.1;
        this.maxSpeed = 4.0;
        this.distanceTarget = 50;

        this.lifeLength = 255;

        // color and blend
        this.startColor = color(0, 0, 0);
        this.targetColor = color(0, 0, 0);
        this.colorWeight = 0;
        this.colorBlenderRate = 0.025;

        // size
        this.particleSize = 5;

        // living
        this.dead = false;
    }

    move = () => {
        let velocityParameter = 1.0;
        // let towardsTarget 
        let distance = dist(this.location.x, this.location.y, this.target.x, this.target.y);
        if (distance < this.distanceTarget) {
            velocityParameter = distance / this.distanceTarget;
        }

        let towardsTarget = createVector(this.target.x, this.target.y);
        towardsTarget.sub(this.location);
        towardsTarget.normalize();
        towardsTarget.mult(this.maxSpeed * velocityParameter);

        let steer = createVector(towardsTarget.x, towardsTarget.y);
        steer.sub(this.velocity);
        steer.normalize();
        steer.mult(this.maxForce);
        this.acceleration.add(steer);

        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
    }

    display() {
        push();

        // let currentColor = lerpColor(this.startColor, this.targetColor, this.colorWeight)
        let currentColor = color(255, 127, 255);
        // fill(127, 255, 127, this.lifeLength);
        // this.lifeLength--;
        // ellipse(this.location.x, this.location.y, 50);
        // console.log("dis");
        if (asPoints) {
            stroke(currentColor);
            point(this.location.x, this.location.y);
        } else {
            noStroke();
            fill(currentColor);
            ellipse(this.location.x, this.location.y, this.particleSize);
        }

        if (this.colorWeight < 1) {
            this.colorWeight = min(this.colorWeight + this.colorBlenderRate, 1.0);
        }

        pop();
    }

    isInside = () => {
        return (this.location.x < width && this.location.x > 0 && this.location.y < height && this.location.y > 0);
    }

    kill = () => {
        if (!this.dead) {
            let randomLocation = generateRandomLocation(width / 2, height / 2, (width + height) / 2);
            this.target.x = randomLocation.x;
            this.target.y = randomLocation.y;

            this.startColor = lerp(this.startColor, this.targetColor, this.colorWeight);
            this.targetColor = color(0);

            this.dead = true;
        }
    }

    isDead = () => {
        // if (this.lifeLength <= 0 || !this.isInside() || this.dead) {
        //     return true;
        // }
        return (this.lifeLength <= 0 || !this.isInside() || this.dead);
    }

    run = () => {
        this.move();
        this.display();
    }
}

function generateRandomLocation(x, y, mag) {
    let randomDirection = createVector(random(0, width), random(0, height));

    let location = createVector(x, y);
    location.sub(randomDirection);
    location.mult(mag);
    location.add(x, y);

    return location;
}

function displayWord(word) {
    let pixelSteps = 9;
    let pg = createGraphics(width, height);
    pg.fill(0, 0, 0);
    pg.textSize(100);
    pg.textAlign(CENTER, CENTER);
    pg.textFont(fontName);
    pg.text(word, width / 2, height / 2);
    pg.loadPixels();

    let newColor = color(random(0, 255), random(0, 255), random(0, 255));
    // particleCount = particleSystem.particles.size();
    let particleCount = particleSystem.particles.length;
    let particleIndex = 0;
    let coordsIndexes = [];

    for (let i = 0; i < (width * height) - 1; i += pixelSteps) {
        coordsIndexes.push(i);
    }

    for (let i = coordsIndexes.length - 1; i >= 0; i--) {
        let randomIndex = Math.round(random(0, coordsIndexes.length));
        let coordIndex = coordsIndexes[i];
        coordsIndexes.slice(randomIndex, 1);

        if (pg.pixels[i] != 0) {
            let x = coordIndex % width;
            let y = coordIndex / height;

            let newParticle;// : Particle

            if (particleIndex < particleIndex) {
                newParticle = particleSystem.particles[particleIndex];
                newParticle.dead = false;
                particleIndex += 1;
            } else {
                newParticle = new Particle(0, 0);
                let randomLocation = generateRandomLocation(width / 2, height / 2, (width + height) / 2);
                newParticle.location.x = randomLocation.x;
                newParticle.location.y = randomLocation.y;

                newParticle.maxSpeed = random(2, 5);
                newParticle.maxForce = newParticle.maxSpeed * 0.025;
                newParticle.particleSize = random(3, 6);
                newParticle.colorBlenderRate = random(0.0025, 0.03);

                particleSystem.particles.push(newParticle);
                // particleSystem.addParticle(newParticle.location.x, newParticle.location.y);
            }
            newParticle.startColor = lerp(newParticle.startColor, newParticle.targetColor, newParticle.colorWeight);
            newParticle.targetColor = newColor;
            newParticle.colorWeight = 0;

            newParticle.target.x = x;
            newParticle.target.y = y;
        }
    }
    if (particleIndex < particleCount) {
        for (let i = particleIndex; i < particleCount; i++) {
            let particle = particleSystem.particles[i];
            particle.kill();
        }
    }
}