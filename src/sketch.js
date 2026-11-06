let backgroundImage;
let playerHealth;
let characterImage;
let smis;

async function setup() {
    createCanvas(400, 400);
    playerHealth = new HealthBar(100, 50, 50, 200, 20);
async function setup() {
    createCanvas(400, 400);

    backgroundImage = await loadImage('./src/assets/environment/GrassyPlain.png');
    characterImage = await loadImage('./src/assets/tmp/SmiskiTEMP.jpg')
    smis = new character(200, 200, 4, characterImage);
}

function keyPressed() {
    // debugging
    console.log(key);
    return key;
}

function draw() {
  if (backgroundImage) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        image(backgroundImage, col * 133, row * 133, 133, 133);
      }
    }
  }
  playerHealth.draw();
  drawHealthBar(playerHealth);

  // character drawing and movement
  let pressed = keyPressed();
  if (keyIsPressed) {
      smis.move(pressed);
  }
  smis.drawCharacter();

    
}