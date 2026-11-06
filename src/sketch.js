let backgroundImage;
let playerHealth;
let characterImage;
let smis;

async function setup() {
    createCanvas(400, 400);

    backgroundImage = await loadImage('./src/assets/environment/GrassyPlain.png');
    characterImage = await loadImage('./src/assets/tmp/SmiskiTEMP.jpg')

    smis = new character(200, 200, 4, characterImage);
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