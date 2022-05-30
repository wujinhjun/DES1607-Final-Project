let pg = new p5().createGraphics(400, 400);

function setup() {
    createCanvas(700, 300);
    // background(0);
    pg.background(0);
    pg.fill(255);
    pg.rect(10, 10, 20, 20);
    pg.loadPixels();
    image(pg, 0, 0);
}

function draw() {
    // background(220);

}

function mouseClicked() {
    test();
}

function test() {
    let coordIndexes = [];

    let d = pg.pixelDensity();
    console.log(`pix: ${pg.pixels.length}`);
    console.log(`d:${d}`);
    // for (let i = 0; i < 100 * (4 * width * d * height * d); i += 1) {
    //     coordIndexes.push(i);
    //     // if (i === )
    // }

    for (let i = 0; i < 4 * 100 * (width * d * height * d); i += (20 * 20 * d * d) * 9) {
        coordIndexes.push(i);
        // if (i === )
    }
    console.log(`coord: ${coordIndexes.length}`);

    for (let i = 0; i < coordIndexes.length; i++) {
        let randomIndex = int(random(coordIndexes.length));
        let coordIndex = coordIndexes[randomIndex];
        coordIndexes.splice(randomIndex, 1);
        // console.log(`random:${randomIndex} + cr:${coordIndex
        //     } + pg:${pg.pixels[coordIndex]
        //     }`);
        if (pg.pixels[coordIndex] !== 0) {
            // let x = int((coordIndex / (400 * d * d)) % width);
            // let y = int((coordIndex / (400 * d * d)) / width);
            let x = int(coordIndex % width);
            let y = int((coordIndex / (400 * d * d)) / width);
            console.log(`c:${coordIndex} + x:${x} + y:${y}`);
            console.log(`color: ${pg.pixels[coordIndex]}`);
            noStroke();
            fill(127, 255, 127);
            ellipse(x, y, 2)
            break;
        }
    }

    // for (let i = coordIndexes.length - 1; i >= 0; i--) {
    //     // let randomIndex = int(random(coordIndexes.length));
    //     // let coordIndex = coordIndexes[randomIndex];
    //     let coordIndex = coordIndexes[i];
    //     coordIndexes.splice(i, 1);
    //     console.log("coordIndex:" + coordIndex);
    //     if (pg.pixels[coordIndex] !== 0) {
    //         let x = int((coordIndex / 400 / d * d) % width);
    //         let y = int((coordIndex / 400 / d * d) / width);
    //         console.log(`c:${coordIndex} + x:${x} + y:${y}`);
    //         console.log(`color: ${pg.pixels[coordIndex]}`);
    //         noStroke();
    //         fill(127, 255, 127);
    //         ellipse(x, y, 2)
    //         // break;
    //     }
    // }
}