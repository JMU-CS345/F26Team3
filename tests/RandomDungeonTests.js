describe("RandomDungeon", function() {
  it("exposes its constructor to external browser callers", function() {
    expect(window.RandomDungeon).toBe(RandomDungeon);
  });

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
    expect(tiles[0][0]).toBe(1);
    expect(tiles[3][4]).toBe(1);
  });

  it("creates connected rooms, corridors, and configured exits", function() {
    const dungeon = new RandomDungeon(50, 30, () => 0, 0);
    dungeon.corridorWidth = 3;
    dungeon.exitCount = 4;
    const tiles = dungeon.generate();
    const start = dungeon.getSafeStartPosition();
    const exits = dungeon.getExitPositions();
    const visited = new Set([start.y * dungeon.width + start.x]);
    const pending = [start];

    while (pending.length > 0) {
      const current = pending.pop();
      [
        { x: current.x + 1, y: current.y },
        { x: current.x - 1, y: current.y },
        { x: current.x, y: current.y + 1 },
        { x: current.x, y: current.y - 1 },
      ].forEach(function(next) {
        const key = next.y * dungeon.width + next.x;
        if (
          !dungeon.isWall(next.x, next.y) &&
          !visited.has(key)
        ) {
          visited.add(key);
          pending.push(next);
        }
      });
    }

    const floorCount = tiles.flat().filter(function(tile) {
      return tile === 0;
    }).length;
    expect(floorCount).toBeGreaterThan(9);
    expect(visited.size).toBe(floorCount);
    expect(exits.length).toBe(4);
    exits.forEach(function(exit) {
      expect(dungeon.isWall(exit.x, exit.y)).toBe(false);
      const offsets = [-1, 0, 1];
      offsets.forEach(function(offset) {
        const x = exit.y === 0 || exit.y === dungeon.height - 1
          ? exit.x + offset
          : exit.x;
        const y = exit.x === 0 || exit.x === dungeon.width - 1
          ? exit.y + offset
          : exit.y;
        expect(dungeon.isWall(x, y)).toBe(false);
      });
    });
    const borderFloorCount = tiles[0].filter((tile) => tile === 0).length +
      tiles[dungeon.height - 1].filter((tile) => tile === 0).length +
      tiles.slice(1, -1).filter((row) => row[0] === 0 || row[dungeon.width - 1] === 0).length;
    expect(borderFloorCount).toBe(12);
  });

  it("rejects corridor widths that cannot fit inside the dungeon", function() {
    const dungeon = new RandomDungeon(5, 5);

    expect(function() {
      dungeon.corridorWidth = 0;
    }).toThrowError(RangeError);
    expect(function() {
      dungeon.corridorWidth = 4;
    }).toThrowError(RangeError);
  });

  it("rejects exit counts outside the available perimeter positions", function() {
    const dungeon = new RandomDungeon(5, 5);

    expect(function() {
      dungeon.exitCount = 0;
    }).toThrowError(RangeError);
    expect(function() {
      dungeon.exitCount = 13;
    }).toThrowError(RangeError);
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
    const openDungeon = new RandomDungeon(50, 30, () => 0, 0);
    const walledDungeon = new RandomDungeon(50, 30, () => 0.1, 0.5);

    const openTiles = openDungeon.generate();
    const walledTiles = walledDungeon.generate();

    expect(openTiles.flat().filter((tile) => tile === 0).length).toBeGreaterThan(
      walledTiles.flat().filter((tile) => tile === 0).length
    );
  });

  it("generates dense, varied layouts for larger dungeons", function() {
    function makeRandom(seed) {
      return function() {
        seed = (seed * 1664525 + 1013904223) >>> 0;
        return seed / 4294967296;
      };
    }

    const firstDungeon = new RandomDungeon(50, 30, makeRandom(1));
    const secondDungeon = new RandomDungeon(50, 30, makeRandom(2));
    firstDungeon.corridorWidth = 3;
    secondDungeon.corridorWidth = 3;

    const firstTiles = firstDungeon.generate();
    const secondTiles = secondDungeon.generate();
    const floorCount = firstTiles.flat().filter((tile) => tile === 0).length;
    const horizontalHalfFloorCounts = [0, 0];
    const verticalHalfFloorCounts = [0, 0];

    firstTiles.forEach(function(row, y) {
      row.forEach(function(tile, x) {
        if (tile === 0) {
          horizontalHalfFloorCounts[x < 25 ? 0 : 1]++;
          verticalHalfFloorCounts[y < 15 ? 0 : 1]++;
        }
      });
    });

    expect(floorCount).toBeGreaterThan(600);
    horizontalHalfFloorCounts.forEach(function(count) {
      expect(count).toBeGreaterThan(100);
    });
    verticalHalfFloorCounts.forEach(function(count) {
      expect(count).toBeGreaterThan(100);
    });
    expect(firstTiles.flat().join("")).not.toBe(secondTiles.flat().join(""));
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
    expect(mockRenderer.calls[0]).toEqual({ tile: 1, x: 0, y: 0, size: 16 });
    expect(mockRenderer.calls[8]).toEqual({ tile: 1, x: 32, y: 32, size: 16 });
  });

  it("rejects a missing draw callback", function() {
    const dungeon = new RandomDungeon(3, 3);
    dungeon.generate();

    expect(function() {
      drawDungeon(dungeon, null, 16);
    }).toThrowError(TypeError);
  });
});