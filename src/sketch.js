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
const smisSpeed = 4;
const dungeonCorridorWidth = Math.ceil(characterSize / dungeonTileSize);
const dungeonExitCount = 1;
let titleScreen;
let mageSelectScreen;
let smiskiGarden;
let whichSmiski;
// variable for checking if smiski has spawned in the dungeon
let hasSpawned;

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
  dungeonFloorImage = await loadImg('./src/assets/DunegonWallsAndFloors/dungeon-floor.svg');
  dungeonWallImage = await loadImg('./src/assets/DunegonWallsAndFloors/dungeon-wall.svg');

  dungeon = new RandomDungeon(
    canvasWidth / dungeonTileSize,
    canvasHeight / dungeonTileSize
  );
  dungeon.corridorWidth = dungeonCorridorWidth;
  dungeon.exitCount = dungeonExitCount;
  dungeon.generate();
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

  smis = new character(450, 550, characterSize, characterSize, smisSpeed, SmisMap);

  fireFlower = await loadImg('./src/assets/sprites/Smiski-Flower-Fire.png');
  iceFlower = await loadImg('./src/assets/sprites/Smiski-Flower-Ice.png');
  mindFlower = await loadImg('./src/assets/sprites/Smiski-Flower-Mind.png');

  smiskiGarden = await loadImg('./src/assets/environment/Smiski-Garden.png');

  playerHealth = new HealthBar(100, 50, 50, 200, 20);
  overWorld = new OverWorld(backgroundImage);
  titleScreen = new TitleScreen(fireFlower, iceFlower, mindFlower);
  mageSelectScreen = new MageSelectScreen(smiskiGarden, smis);
  whichSmiski = new WhichSmiski();
}

function draw() {
  if (!titleScreen) return; // setup() is async, so wait for it to finish

  if (titleScreen.title) {
    titleScreen.drawTitleScreen();
  } else if (mageSelectScreen.gardenBoolean) {
    // reset smiski spawn params
    hasSpawned = false;
    mageSelectScreen.drawSmiskiGarden();
    smis.update();
    smis.drawCharacter();
  }
  else if (whichSmiski.selectedSmiski) {
    whichSmiski.setFlower(mageSelectScreen.fChoice);
    whichSmiski.drawWhichSmiski();
  } else {
    cursor(ARROW);
    background(0);

    if (showDungeon && dungeon && dungeonFloorImage && dungeonWallImage) {
      // updates smiski upon entering the dungeon
      if (!hasSpawned) {
        safeStart = dungeon.getSafeStartPosition();
        smis.setPos(safeStart.x * dungeonTileSize, safeStart.y * dungeonTileSize);
        smis.setDungeon(dungeon, dungeonTileSize);
        hasSpawned = true;
      }
      // draws dungeon
      drawDungeon(dungeon, (tile, x, y, size) => {
        drawImg(tile === 1 ? dungeonWallImage : dungeonFloorImage, x, y, size, size);
      }, dungeonTileSize);
    } else {
      overWorld.drawOverWorld();
      // reset smiski spawn params
      hasSpawned = false;
    }

    playerHealth.draw();
    smis.update();
    smis.drawCharacter();
  }
}

function mousePressed() {
  if (titleScreen) titleScreen.mousePressed();
}
