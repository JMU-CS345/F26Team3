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
    this._corridorWidth = 1;
  }

  get exitCount() {
    return this._exitCount;
  }

  set exitCount(count) {
    const maxExits = this._getMaxExitCount(this._corridorWidth);
    if (!Number.isInteger(count) || count < 1 || count > maxExits) {
      throw new RangeError(
        `Exit count must be an integer between 1 and ${maxExits}.`
      );
    }
    this._exitCount = count;
  }

  get corridorWidth() {
    return this._corridorWidth;
  }

  set corridorWidth(width) {
    const maxWidth = Math.min(this.width, this.height) - 2;
    if (!Number.isInteger(width) || width < 1 || width > maxWidth) {
      throw new RangeError(
        `Corridor width must be an integer between 1 and ${maxWidth}.`
      );
    }
    if (this._exitCount > this._getMaxExitCount(width)) {
      throw new RangeError(
        "Corridor width leaves too few perimeter positions for the configured exits."
      );
    }
    this._corridorWidth = width;
  }

  _getMaxExitCount(corridorWidth) {
    const startOffset = -Math.floor((corridorWidth - 1) / 2);
    const endOffset = startOffset + corridorWidth - 1;
    const slotsOnSide = (length) => {
      const firstPosition = 1 - startOffset;
      const lastPosition = length - 2 - endOffset;
      if (lastPosition < firstPosition) {
        return 0;
      }
      return (
        Math.floor((lastPosition - firstPosition) / (corridorWidth + 1)) + 1
      );
    };

    return 2 * slotsOnSide(this.width) + 2 * slotsOnSide(this.height);
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
      const startY = y - Math.floor((this.corridorWidth - 1) / 2);
      for (let offset = 0; offset < this.corridorWidth; offset++) {
        const corridorY = startY + offset;
        if (corridorY < 0 || corridorY >= this.height) {
          continue;
        }
        for (
          let x = Math.min(startX, endX);
          x <= Math.max(startX, endX);
          x++
        ) {
          this.tiles[corridorY][x] = 0;
        }
      }
    };
    const carveVerticalCorridor = (x, startY, endY) => {
      const startX = x - Math.floor((this.corridorWidth - 1) / 2);
      for (let offset = 0; offset < this.corridorWidth; offset++) {
        const corridorX = startX + offset;
        if (corridorX < 0 || corridorX >= this.width) {
          continue;
        }
        for (
          let y = Math.min(startY, endY);
          y <= Math.max(startY, endY);
          y++
        ) {
          this.tiles[y][corridorX] = 0;
        }
      }
    };
    const roomCenter = (room) => ({
      x: room.x + Math.floor(room.width / 2),
      y: room.y + Math.floor(room.height / 2),
    });
    const connectRooms = (firstRoom, secondRoom) => {
      const firstCenter = roomCenter(firstRoom);
      const secondCenter = roomCenter(secondRoom);

      if (this.random() < 0.5) {
        carveHorizontalCorridor(
          firstCenter.y,
          firstCenter.x,
          secondCenter.x
        );
        carveVerticalCorridor(
          secondCenter.x,
          firstCenter.y,
          secondCenter.y
        );
      } else {
        carveVerticalCorridor(
          firstCenter.x,
          firstCenter.y,
          secondCenter.y
        );
        carveHorizontalCorridor(
          secondCenter.y,
          firstCenter.x,
          secondCenter.x
        );
      }
    };

    const startRoom = {
      width: Math.min(5, this.width - 2),
      height: Math.min(5, this.height - 2),
    };
    startRoom.x = Math.floor(this.width / 2) - Math.floor(startRoom.width / 2);
    startRoom.y =
      Math.floor(this.height / 2) - Math.floor(startRoom.height / 2);
    const rooms = [startRoom];

    const maxRoomWidth = Math.max(1, Math.min(14, this.width - 4));
    const maxRoomHeight = Math.max(1, Math.min(10, this.height - 4));
    const minRoomWidth = Math.min(7, maxRoomWidth);
    const minRoomHeight = Math.min(6, maxRoomHeight);
    const maxRooms = Math.min(
      6,
      Math.max(2, Math.floor((this.width * this.height) / 65))
    );
    const maxRoomsPerHalf = Math.ceil(maxRooms / 2);
    const placementAttempts = maxRooms * 12;

    for (
      let attempt = 0;
      attempt < placementAttempts && rooms.length < maxRooms;
      attempt++
    ) {
      if (this.random() < this.wallProbability) {
        continue;
      }

      const candidates = [];
      for (let sample = 0; sample < 12; sample++) {
        const room = {
          width: randomInteger(minRoomWidth, maxRoomWidth),
          height: randomInteger(minRoomHeight, maxRoomHeight),
        };
        const maxX = this.width - room.width - 2;
        const maxY = this.height - room.height - 2;
        if (maxX < 2 || maxY < 2) {
          continue;
        }
        room.x = randomInteger(2, maxX);
        room.y = randomInteger(2, maxY);

        const overlapsRoom = rooms.some(
          (existingRoom) =>
            room.x <= existingRoom.x + existingRoom.width &&
            room.x + room.width >= existingRoom.x &&
            room.y <= existingRoom.y + existingRoom.height &&
            room.y + room.height >= existingRoom.y
        );
        if (overlapsRoom) {
          continue;
        }

        const center = roomCenter(room);
        const roomsInSameHalf = rooms.reduce(
          (counts, existingRoom) => {
            const existingCenter = roomCenter(existingRoom);
            const sameHorizontalHalf =
              (existingCenter.x < this.width / 2) ===
              (center.x < this.width / 2);
            const sameVerticalHalf =
              (existingCenter.y < this.height / 2) ===
              (center.y < this.height / 2);
            if (sameHorizontalHalf) {
              counts.horizontal++;
            }
            if (sameVerticalHalf) {
              counts.vertical++;
            }
            return counts;
          },
          { horizontal: 0, vertical: 0 }
        );
        if (
          roomsInSameHalf.horizontal >= maxRoomsPerHalf ||
          roomsInSameHalf.vertical >= maxRoomsPerHalf
        ) {
          continue;
        }

        candidates.push(room);
      }

      if (candidates.length > 0) {
        rooms.push(candidates[randomInteger(0, candidates.length - 1)]);
      }
    }

    rooms.forEach(carveRoom);
    const pendingRoomIndices = Array.from(
      { length: rooms.length - 1 },
      (_, index) => index + 1
    );
    for (let index = pendingRoomIndices.length - 1; index > 0; index--) {
      const swapIndex = randomInteger(0, index);
      [
        pendingRoomIndices[index],
        pendingRoomIndices[swapIndex],
      ] = [
        pendingRoomIndices[swapIndex],
        pendingRoomIndices[index],
      ];
    }

    const connectedRoomIndices = [0];
    const connectedPairs = new Set();
    const connectRoomIndices = (firstIndex, secondIndex) => {
      const pairKey = [firstIndex, secondIndex].sort((a, b) => a - b).join(":");
      if (connectedPairs.has(pairKey)) {
        return;
      }
      connectedPairs.add(pairKey);
      connectRooms(rooms[firstIndex], rooms[secondIndex]);
    };

    pendingRoomIndices.forEach((roomIndex) => {
      const center = roomCenter(rooms[roomIndex]);
      const nearestConnectedRooms = connectedRoomIndices
        .map((connectedIndex) => {
          const connectedCenter = roomCenter(rooms[connectedIndex]);
          return {
            index: connectedIndex,
            distance:
              Math.abs(center.x - connectedCenter.x) +
              Math.abs(center.y - connectedCenter.y),
          };
        })
        .sort((first, second) => first.distance - second.distance)
        .slice(0, 3);
      const parent =
        nearestConnectedRooms[
          randomInteger(0, nearestConnectedRooms.length - 1)
        ];

      connectRoomIndices(roomIndex, parent.index);
      connectedRoomIndices.push(roomIndex);
    });

    rooms.forEach((room, roomIndex) => {
      const center = roomCenter(room);
      const nearbyRooms = rooms
        .map((otherRoom, otherIndex) => {
          const otherCenter = roomCenter(otherRoom);
          return {
            index: otherIndex,
            distance:
              Math.abs(center.x - otherCenter.x) +
              Math.abs(center.y - otherCenter.y),
          };
        })
        .filter(
          (other) =>
            other.index !== roomIndex &&
            !connectedPairs.has(
              [roomIndex, other.index].sort((a, b) => a - b).join(":")
            )
        )
        .sort((first, second) => first.distance - second.distance)
        .slice(0, 3);

      if (nearbyRooms.length > 0) {
        const other =
          nearbyRooms[randomInteger(0, nearbyRooms.length - 1)];
        connectRoomIndices(roomIndex, other.index);
      }
    });

    const exitCandidates = [];
    const corridorStartOffset = -Math.floor((this.corridorWidth - 1) / 2);
    const corridorEndOffset =
      corridorStartOffset + this.corridorWidth - 1;
    const exitPositions = (length) => {
      const positions = [];
      const firstPosition = 1 - corridorStartOffset;
      const lastPosition = length - 2 - corridorEndOffset;
      for (
        let position = firstPosition;
        position <= lastPosition;
        position += this.corridorWidth + 1
      ) {
        positions.push(position);
      }
      return positions;
    };

    for (const x of exitPositions(this.width)) {
      exitCandidates.push({
        x,
        y: 0,
        insideX: x,
        insideY: 1 - corridorStartOffset,
      });
      exitCandidates.push({
        x,
        y: this.height - 1,
        insideX: x,
        insideY: this.height - 2 - corridorEndOffset,
      });
    }
    for (const y of exitPositions(this.height)) {
      exitCandidates.push({ x: 0, y, insideX: 1, insideY: y });
      exitCandidates.push({
        x: this.width - 1,
        y,
        insideX: this.width - 2 - corridorEndOffset,
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
