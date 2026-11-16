let backgroundImage;
let overWorld;
let playerHealth;
let smis;
let dungeon;
let dungeonFloorImage;
let dungeonWallImage;
let showDungeon = true;
const canvasWidth = 1000;
const canvasHeight = 600;
const dungeonTileSize = 20;
const characterSize = 50;
const dungeonCorridorWidth = Math.ceil(characterSize / dungeonTileSize);
const dungeonExitCount = 1;
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
  createCanvas(canvasWidth, canvasHeight);

  backgroundImage = await loadImg('./src/assets/environment/GrassyPlain.png');
  dungeonFloorImage = await loadImage('./src/assets/DunegonWallsAndFloors/dungeon-floor.svg');
  dungeonWallImage = await loadImage('./src/assets/DunegonWallsAndFloors/dungeon-wall.svg');

  dungeon = new RandomDungeon(
    canvasWidth / dungeonTileSize,
    canvasHeight / dungeonTileSize
  );
  dungeon.corridorWidth = dungeonCorridorWidth;
  dungeon.exitCount = dungeonExitCount;
  dungeon.generate();
  const safeStart = dungeon.getSafeStartPosition();
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

  const startX = showDungeon ? safeStart.x * dungeonTileSize : 200;
  const startY = showDungeon ? safeStart.y * dungeonTileSize : 200;
  smis = new character(startX, startY, 4, SmisMap);
  smis.w = characterSize;
  smis.h = characterSize;
  
  fireFlower = await loadImg('./src/assets/sprites/Smiski-Flower-Fire.png');
  iceFlower = await loadImg('./src/assets/sprites/Smiski-Flower-Ice.png');
  mindFlower = await loadImg('./src/assets/sprites/Smiski-Flower-Mind.png');

  playerHealth = new HealthBar(100, 50, 50, 200, 20);
  overWorld = new OverWorld(backgroundImage);
  titleScreen = new TitleScreen(fireFlower, iceFlower, mindFlower);
}

function draw() {
  if (!titleScreen) return; // setup() is async, so wait for it to finish

  if (titleScreen.title) {
    titleScreen.drawTitleScreen();
  } else {
    cursor(ARROW);
    background(0);

    if (showDungeon && dungeon && dungeonFloorImage && dungeonWallImage) {
      drawDungeon(dungeon, (tile, x, y, size) => {
        image(tile === 1 ? dungeonWallImage : dungeonFloorImage, x, y, size, size);
      }, dungeonTileSize);
    } else {
      overWorld.drawOverWorld();
    }

    playerHealth.draw();
    smis.setDungeon(showDungeon ? dungeon : null, dungeonTileSize);
    smis.update();
    smis.drawCharacter();
  }
}

function mousePressed() {
  if (titleScreen) titleScreen.mousePressed();
}
