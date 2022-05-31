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
    // image(pg, 0, 0);

    let newColor = color(random(255), random(255), random(255));

    let particleCount = particles.length;
    let particleIndex = 0;

    let coordsIndexes = [];
    for (let i = 0; i < (width * height); i += pixelSteps) {
        coordsIndexes.push(i);
    }
    // console.log(`px: ${pg.pixels.length}`);
    // console.log(`cx: ${coordsIndexes.length}`);

    for (let i = 0; i < coordsIndexes.length; i++) {
        let randomIndex = int(random(0, coordsIndexes.length));
        let coordIndex = coordsIndexes[randomIndex];
        coordsIndexes.splice(randomIndex, 1);
        if (pg.pixels[coordIndex * 4] !== 0) {
            let x = coordIndex % width;
            let y = coordIndex / width;
            let newParticle = new Particle();

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
        for (let i = particleIndex; i < particleCount; i++) {
            let p = particles[i];
            p.kill();
        }
    }
}
