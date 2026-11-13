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
