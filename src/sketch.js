let backgroundImage;
let overWorld;
let playerHealth;
let characterImage;
let smis;
let titleScreen;

// Native browser image loading: resolves only once the pixels are really there
function loadImg(path) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not load ' + path));
    img.src = path;
  });
}

// Draws a native image onto the p5 canvas (respects push/pop and transforms)
function drawImg(img, x, y, w, h) {
  drawingContext.drawImage(img, x, y, w, h);
}

async function setup() {
  createCanvas(1000, 600);

  backgroundImage = await loadImg('./src/assets/environment/GrassyPlain.png');
  smisFront = await loadImg('./src/assets/sprites/SmiskiFront.png');
  smisBack = await loadImg('./src/assets/sprites/SmiskiBack.png');
  smisLeft = await loadImg('./src/assets/sprites/SmiskiLeft.png');
  smisRight = await loadImg('./src/assets/sprites/SmiskiRight.png');

  SmisMap = {
    front: smisFront,
    back: smisBack,
    left: smisLeft,
    right: smisRight
  };

  smis = new character(200, 200, 4, SmisMap);
  playerHealth = new HealthBar(100, 50, 50, 200, 20);
  overWorld = new OverWorld(backgroundImage);
  titleScreen = new TitleScreen();
}

function draw() {
  if (!titleScreen) return;   // setup() is async, so wait for it to finish

  if (titleScreen.title) {
    titleScreen.drawTitleScreen();
  } else {
    cursor(ARROW);
    background(0);
    overWorld.drawOverWorld();
    playerHealth.draw();
    smis.update();
    smis.drawCharacter();
  }
}

function mousePressed() {
  if (titleScreen) titleScreen.mousePressed();
}
