let backgroundImage;
let playerHealth;
let smiskiFront, smiskiBack, smiskiLeft, smiskiRight;
let imgMap;
let smis;

function preload() {
  smiskiFront = loadImage("./src/assets/sprites/SmiskiFront.png");
  smiskiBack = loadImage("./src/assets/sprites/SmiskiBack.png");
  smiskiLeft = loadImage("./src/assets/sprites/SmiskiLeft.png");
  smiskiRight = loadImage("./src/assets/sprites/SmiskiRight.png");
  backgroundImage = loadImage("./src/assets/environment/GrassyPlain.png");
}

function setup() {
  createCanvas(400, 400);

  imgMap = {
    front: smiskiFront,
    back: smiskiBack,
    right: smiskiRight,
    left: smiskiLeft,
  };
  smis = new character(200, 200, 4, imgMap);
  playerHealth = new HealthBar(100, 50, 50, 200, 20);
}

function draw() {
  // Image for the background of a grassy plain
  if (backgroundImage) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        image(backgroundImage, col * 133, row * 133, 133, 133);
      }
    }
  }
  playerHealth.draw();

  // character drawing and movement
  smis.update();
  smis.drawCharacter();
}
