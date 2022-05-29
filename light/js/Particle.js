class Particle {
    constructor() {
        this.location = createVector(0, 0);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.target = createVector(0, 0);

        this.closeEnoughTarget = 20;
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

    run = () => {
        this.move();
        this.display();
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
            // console.log("first kill");
        }
    }
}