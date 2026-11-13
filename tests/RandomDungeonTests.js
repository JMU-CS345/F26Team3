describe("RandomDungeon", function() {
  it("generates a rectangular grid containing only wall and floor values", function() {
    const dungeon = new RandomDungeon(5, 4, () => 0.9, 0.5);
    const tiles = dungeon.generate();

    expect(tiles.length).toBe(4);
    expect(tiles[0].length).toBe(5);
    tiles.forEach(function(row) {
      row.forEach(function(tile) {
        expect([0, 1]).toContain(tile);
      });
    });
    expect(tiles[0][0]).toBe(0);
    expect(tiles[3][4]).toBe(0);
  });

  it("returns a safe floor position after generation", function() {
    const dungeon = new RandomDungeon(8, 6, () => 0, 1);
    expect(dungeon.getSafeStartPosition()).toBeNull();

    dungeon.generate();
    const start = dungeon.getSafeStartPosition();

    expect(dungeon.isWall(start.x, start.y)).toBe(false);
    expect(dungeon.isWall(start.x - 1, start.y)).toBe(false);
    expect(dungeon.isWall(start.x + 1, start.y)).toBe(false);
    expect(dungeon.isWall(start.x, start.y - 1)).toBe(false);
    expect(dungeon.isWall(start.x, start.y + 1)).toBe(false);
  });

  it("checks wall tiles and treats out-of-bounds positions as walls", function() {
    const dungeon = new RandomDungeon(5, 5, () => 0, 1);
    dungeon.generate();

    expect(dungeon.isWall(0, 0)).toBe(true);
    expect(dungeon.isWall(2, 2)).toBe(false);
    expect(dungeon.isWall(-1, 0)).toBe(true);
    expect(dungeon.isWall(1.5, 1)).toBe(true);
  });

  it("rejects a wall probability outside the valid range", function() {
    expect(function() {
      new RandomDungeon(3, 3, Math.random, NaN);
    }).toThrowError(RangeError);
  });

  it("uses the supplied random source to create different layouts", function() {
    const openDungeon = new RandomDungeon(5, 5, () => 0, 0);
    const walledDungeon = new RandomDungeon(5, 5, () => 0.1, 0.5);

    openDungeon.generate();
    walledDungeon.generate();

    expect(openDungeon.isWall(0, 0)).toBe(false);
    expect(walledDungeon.isWall(0, 0)).toBe(true);
  });

  it("renders tiles through a mock callback without p5 calls", function() {
    const dungeon = new RandomDungeon(3, 3, () => 0, 0);
    const mockRenderer = {
      calls: [],
      drawTile: function(tile, x, y, size) {
        this.calls.push({ tile: tile, x: x, y: y, size: size });
      }
    };
    dungeon.generate();

    drawDungeon(dungeon, mockRenderer.drawTile.bind(mockRenderer), 16);

    expect(mockRenderer.calls.length).toBe(9);
    expect(mockRenderer.calls[0]).toEqual({ tile: 0, x: 0, y: 0, size: 16 });
    expect(mockRenderer.calls[8]).toEqual({ tile: 0, x: 32, y: 32, size: 16 });
  });

  it("rejects a missing draw callback", function() {
    const dungeon = new RandomDungeon(3, 3);
    dungeon.generate();

    expect(function() {
      drawDungeon(dungeon, null, 16);
    }).toThrowError(TypeError);
  });
});