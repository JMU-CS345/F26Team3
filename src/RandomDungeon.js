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
    this.exits = [];
    this._exitCount = 1;
  }

  get exitCount() {
    return this._exitCount;
  }

  set exitCount(count) {
    const maxExits = 2 * (this.width - 2) + 2 * (this.height - 2);
    if (!Number.isInteger(count) || count < 1 || count > maxExits) {
      throw new RangeError(
        `Exit count must be an integer between 1 and ${maxExits}.`
      );
    }
    this._exitCount = count;
  }

  generate() {
    this.tiles = Array.from({ length: this.height }, () =>
      Array(this.width).fill(1)
    );

    const randomInteger = (min, max) =>
      min + Math.floor(this.random() * (max - min + 1));
    const carveRoom = (room) => {
      for (let y = room.y; y < room.y + room.height; y++) {
        for (let x = room.x; x < room.x + room.width; x++) {
          this.tiles[y][x] = 0;
        }
      }
    };
    const carveHorizontalCorridor = (y, startX, endX) => {
      for (let x = Math.min(startX, endX); x <= Math.max(startX, endX); x++) {
        this.tiles[y][x] = 0;
      }
    };
    const carveVerticalCorridor = (x, startY, endY) => {
      for (let y = Math.min(startY, endY); y <= Math.max(startY, endY); y++) {
        this.tiles[y][x] = 0;
      }
    };
    const roomCenter = (room) => ({
      x: room.x + Math.floor(room.width / 2),
      y: room.y + Math.floor(room.height / 2),
    });

    const startRoom = {
      width: Math.min(5, this.width - 2),
      height: Math.min(5, this.height - 2),
    };
    startRoom.x = Math.floor(this.width / 2) - Math.floor(startRoom.width / 2);
    startRoom.y =
      Math.floor(this.height / 2) - Math.floor(startRoom.height / 2);
    const rooms = [startRoom];

    const maxRoomWidth = Math.min(7, this.width - 2);
    const maxRoomHeight = Math.min(7, this.height - 2);
    const minRoomWidth = Math.min(3, maxRoomWidth);
    const minRoomHeight = Math.min(3, maxRoomHeight);
    const maxRooms = Math.min(
      6,
      Math.max(2, Math.floor((this.width * this.height) / 65))
    );
    const placementAttempts = maxRooms * 20;

    for (
      let attempt = 0;
      attempt < placementAttempts && rooms.length < maxRooms;
      attempt++
    ) {
      if (this.random() < this.wallProbability) {
        continue;
      }

      const room = {
        width: randomInteger(minRoomWidth, maxRoomWidth),
        height: randomInteger(minRoomHeight, maxRoomHeight),
      };
      room.x = randomInteger(1, this.width - room.width - 1);
      room.y = randomInteger(1, this.height - room.height - 1);

      const overlapsRoom = rooms.some(
        (existingRoom) =>
          room.x <= existingRoom.x + existingRoom.width &&
          room.x + room.width >= existingRoom.x &&
          room.y <= existingRoom.y + existingRoom.height &&
          room.y + room.height >= existingRoom.y
      );
      if (!overlapsRoom) {
        rooms.push(room);
      }
    }

    rooms.forEach(carveRoom);
    for (let index = 1; index < rooms.length; index++) {
      const previousCenter = roomCenter(rooms[index - 1]);
      const currentCenter = roomCenter(rooms[index]);

      if (this.random() < 0.5) {
        carveHorizontalCorridor(
          previousCenter.y,
          previousCenter.x,
          currentCenter.x
        );
        carveVerticalCorridor(
          currentCenter.x,
          previousCenter.y,
          currentCenter.y
        );
      } else {
        carveVerticalCorridor(
          previousCenter.x,
          previousCenter.y,
          currentCenter.y
        );
        carveHorizontalCorridor(
          currentCenter.y,
          previousCenter.x,
          currentCenter.x
        );
      }
    }

    const exitCandidates = [];
    for (let x = 1; x < this.width - 1; x++) {
      exitCandidates.push({ x, y: 0, insideX: x, insideY: 1 });
      exitCandidates.push({
        x,
        y: this.height - 1,
        insideX: x,
        insideY: this.height - 2,
      });
    }
    for (let y = 1; y < this.height - 1; y++) {
      exitCandidates.push({ x: 0, y, insideX: 1, insideY: y });
      exitCandidates.push({
        x: this.width - 1,
        y,
        insideX: this.width - 2,
        insideY: y,
      });
    }

    for (let index = exitCandidates.length - 1; index > 0; index--) {
      const swapIndex = randomInteger(0, index);
      [exitCandidates[index], exitCandidates[swapIndex]] = [
        exitCandidates[swapIndex],
        exitCandidates[index],
      ];
    }
    const selectedExits = exitCandidates.slice(0, this.exitCount);
    this.exits = selectedExits.map(({ x, y }) => ({ x, y }));

    selectedExits.forEach((exit) => {
      const inside = { x: exit.insideX, y: exit.insideY };
      const nearestRoom = rooms.reduce((nearest, room) => {
        const center = roomCenter(room);
        const nearestCenter = roomCenter(nearest);
        const distance =
          Math.abs(center.x - inside.x) + Math.abs(center.y - inside.y);
        const nearestDistance =
          Math.abs(nearestCenter.x - inside.x) +
          Math.abs(nearestCenter.y - inside.y);
        return distance < nearestDistance ? room : nearest;
      }, rooms[0]);
      const target = roomCenter(nearestRoom);

      if (exit.y === 0 || exit.y === this.height - 1) {
        carveVerticalCorridor(exit.x, exit.y, inside.y);
      } else {
        carveHorizontalCorridor(exit.y, exit.x, inside.x);
      }
      carveHorizontalCorridor(inside.y, inside.x, target.x);
      carveVerticalCorridor(target.x, inside.y, target.y);
    });

    this.safeStart = roomCenter(startRoom);
    return this.tiles;
  }

  getExitPositions() {
    return this.exits.map(({ x, y }) => ({ x, y }));
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
