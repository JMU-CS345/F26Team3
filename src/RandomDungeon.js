class RandomDungeon {
  constructor(width, height, random = Math.random, wallProbability = 0.35) {
    if (!Number.isInteger(width) || width < 3) {
      throw new RangeError("Dungeon width must be an integer of at least 3.");
    }
    if (!Number.isInteger(height) || height < 3) {
      throw new RangeError("Dungeon height must be an integer of at least 3.");
    }
    if (typeof random !== "function") {
      throw new TypeError("Random source must be a function.");
    }
    if (
      !Number.isFinite(wallProbability) ||
      wallProbability < 0 ||
      wallProbability > 1
    ) {
      throw new RangeError("Wall probability must be between 0 and 1.");
    }

    this.width = width;
    this.height = height;
    this.random = random;
    this.wallProbability = wallProbability;
    this.tiles = [];
    this.safeStart = null;
  }

  generate() {
    this.tiles = Array.from({ length: this.height }, () =>
      Array.from({ length: this.width }, () =>
        this.random() < this.wallProbability ? 1 : 0
      )
    );

    const startX = Math.floor(this.width / 2);
    const startY = Math.floor(this.height / 2);

    for (let y = startY - 1; y <= startY + 1; y++) {
      for (let x = startX - 1; x <= startX + 1; x++) {
        this.tiles[y][x] = 0;
      }
    }

    this.safeStart = { x: startX, y: startY };
    return this.tiles;
  }

  getSafeStartPosition() {
    if (!this.safeStart) {
      return null;
    }
    return { x: this.safeStart.x, y: this.safeStart.y };
  }

  isWall(x, y) {
    if (
      !Number.isInteger(x) ||
      !Number.isInteger(y) ||
      x < 0 ||
      y < 0 ||
      x >= this.width ||
      y >= this.height ||
      this.tiles.length === 0
    ) {
      return true;
    }
    return this.tiles[y][x] === 1;
  }
}

function drawDungeon(dungeon, drawTile, tileSize) {
  if (!dungeon || !Array.isArray(dungeon.tiles)) {
    throw new TypeError("A generated dungeon is required.");
  }
  if (typeof drawTile !== "function") {
    throw new TypeError("A tile drawing function is required.");
  }
  if (!Number.isFinite(tileSize) || tileSize <= 0) {
    throw new RangeError("Tile size must be a positive number.");
  }

  dungeon.tiles.forEach((row, y) => {
    row.forEach((tile, x) => {
      drawTile(tile, x * tileSize, y * tileSize, tileSize);
    });
  });
}

if (typeof window !== "undefined") {
  window.RandomDungeon = RandomDungeon;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = RandomDungeon;
}
