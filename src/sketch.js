let backgroundImage;
let overWorld;
let playerHealth;
let characterImage;
let smis;

async function setup() {
    createCanvas(1000, 600);

    backgroundImage = await loadImage('./src/assets/environment/GrassyPlain.png');
    characterImage = await loadImage('./src/assets/tmp/SmiskiTEMP.jpg');

    smis = new character(200, 200, 4, characterImage);
    playerHealth = new HealthBar(100, 50, 50, 200, 20);
    overWorld = new OverWorld(backgroundImage);
    titleScreen = new TitleScreen();
}

function draw() { 

  titleScreen.drawTitleScreen();
  //playerHealth.draw();

  // character drawing and movement
  //smis.update();
  //smis.drawCharacter();

}
