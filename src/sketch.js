let backgroundImage;

async function setup() {
    createCanvas(400, 400);

    backgroundImage = await loadImage('GrassyPlain.png');
}

function draw() {
    if (backgroundImage) {
        for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            image(backgroundImage, col * 133, row * 133, 133, 133);
    }
        }
    }
}