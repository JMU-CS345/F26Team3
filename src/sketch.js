let backgroundImage;

function setup() {
  backgroundImage = loadImage('/assets/environment/GrassyPlain.png');

  createCanvas(400, 400);
}

function draw() {
  image(backgroundImage, 0, 0);
}
