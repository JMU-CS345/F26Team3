let backgroundImage;
let playerHealth;
let characterImage;
let smis;
let dungeon;
let dungeonFloorImage;
let dungeonWallImage;
let showDungeon = true;
const dungeonTileSize = 20;

async function setup() {
    createCanvas(400, 400);

    backgroundImage = await loadImage('./src/assets/environment/GrassyPlain.png');
    characterImage = await loadImage('./src/assets/tmp/SmiskiTEMP.jpg');
    dungeonFloorImage = await loadImage('./src/assets/DunegonWallsAndFloors/dungeon-floor.svg');
    dungeonWallImage = await loadImage('./src/assets/DunegonWallsAndFloors/dungeon-wall.svg');

    dungeon = new RandomDungeon(20, 20);
    dungeon.generate();
    const safeStart = dungeon.getSafeStartPosition();
    smis = new character(safeStart.x * dungeonTileSize, safeStart.y * dungeonTileSize, 4, characterImage);
    playerHealth = new HealthBar(100, 50, 50, 200, 20);
}

function draw() { 
  if (showDungeon && dungeon && dungeonFloorImage && dungeonWallImage) {
    drawDungeon(dungeon, (tile, x, y, size) => {
      image(tile === 1 ? dungeonWallImage : dungeonFloorImage, x, y, size, size);
    }, dungeonTileSize);
  }

  if (!showDungeon && backgroundImage) {
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