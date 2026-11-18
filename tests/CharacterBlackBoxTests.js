// Black box tests for the character.
//
// These are written from the behavior a player expects, not from how character.js
// is implemented. They only use the public surface:
//   new character(x, y, width, height, speed, imgMap)
//   update()                       - advance one frame using the keys currently held
//   setDungeon(dungeon, tileSize)  - dungeon.isWall(tileX, tileY) says where walls are
//   drawCharacter()                - draws the sprite for the way it is facing
//   pos.x / pos.y                  - top-left corner of the character
//
// Assumptions about the spec (change a test if your game should behave differently):
//   - speed is pixels moved per update() while a key is held
//   - the character is a width x height box whose top-left corner is pos
//   - it faces front until it moves, and keeps its last facing when it stops
//   - it slides along a wall instead of sticking to it
//   - a collision may leave up to 1px of overlap (TOL), because of fractional diagonal steps

describe("character (black box)", function () {
  const W = 50;
  const H = 50;
  const SPEED = 4;
  const TOL = 1;

  const CANVAS_W = 400;
  const CANVAS_H = 320;
  // The walkable floor, in pixels. Everything outside this box is wall.
  const FLOOR = { x0: 40, y0: 40, x1: 360, y1: 280 };

  const DIRECTIONS = [
    { name: "left", arrow: 37, wasd: 65, dx: -1, dy: 0, image: "left" },
    { name: "right", arrow: 39, wasd: 68, dx: 1, dy: 0, image: "right" },
    { name: "up", arrow: 38, wasd: 87, dx: 0, dy: -1, image: "back" },
    { name: "down", arrow: 40, wasd: 83, dx: 0, dy: 1, image: "front" },
  ];

  const imgMap = {
    front: { name: "front" },
    back: { name: "back" },
    left: { name: "left" },
    right: { name: "right" },
  };

  // ---------------------------------------------------------------------------
  // Test environment: documented p5 functions the character is allowed to use
  // ---------------------------------------------------------------------------

  class TestVector {
    constructor(x, y) { this.x = x || 0; this.y = y || 0; }
    mag() { return Math.hypot(this.x, this.y); }
    magSq() { return this.x * this.x + this.y * this.y; }
    normalize() { const m = this.mag(); if (m > 0) { this.x /= m; this.y /= m; } return this; }
    setMag(n) { this.normalize(); return this.mult(n); }
    mult(n) { this.x *= n; this.y *= n; return this; }
    div(n) { this.x /= n; this.y /= n; return this; }
    add(a, b) { if (typeof a === "object") { this.x += a.x; this.y += a.y; } else { this.x += a; this.y += b; } return this; }
    sub(a, b) { if (typeof a === "object") { this.x -= a.x; this.y -= a.y; } else { this.x -= a; this.y -= b; } return this; }
    set(a, b) { if (typeof a === "object") { this.x = a.x; this.y = a.y; } else { this.x = a; this.y = b; } return this; }
    limit(max) { if (this.mag() > max) this.setMag(max); return this; }
    copy() { return new TestVector(this.x, this.y); }
    dist(o) { return Math.hypot(this.x - o.x, this.y - o.y); }
    heading() { return Math.atan2(this.y, this.x); }
  }

  const GLOBALS = [
    "createVector", "keyIsDown", "abs", "drawImg", "image",
    "LEFT_ARROW", "RIGHT_ARROW", "UP_ARROW", "DOWN_ARROW",
  ];

  let savedGlobals;
  let held;   // key codes currently "pressed"
  let draws;  // every sprite draw call: { img, x, y, w, h }

  // character is a singleton, so build a brand new copy of the class from its own source
  // (character.js must be loaded by SpecRunner.html; no fetch needed, so this works on file:// and in CI)
  function freshCharacterClass() {
    if (typeof character === "undefined") {
      throw new Error("The character class is not loaded. Add character.js to SpecRunner.html.");
    }
    return new Function("return (" + character.toString() + ");")();
  }

  beforeEach(function () {
    savedGlobals = {};
    GLOBALS.forEach(function (name) { savedGlobals[name] = globalThis[name]; });

    held = new Set();
    draws = [];

    globalThis.createVector = function (x, y) { return new TestVector(x, y); };
    globalThis.keyIsDown = function (code) { return held.has(code); };
    globalThis.abs = Math.abs;
    globalThis.LEFT_ARROW = 37;
    globalThis.UP_ARROW = 38;
    globalThis.RIGHT_ARROW = 39;
    globalThis.DOWN_ARROW = 40;
    const record = function (img, x, y, w, h) { draws.push({ img: img, x: x, y: y, w: w, h: h }); };
    globalThis.drawImg = record;
    globalThis.image = record;
  });

  afterEach(function () {
    GLOBALS.forEach(function (name) {
      if (savedGlobals[name] === undefined) {
        delete globalThis[name];
      } else {
        globalThis[name] = savedGlobals[name];
      }
    });
  });

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  // Every call evaluates a fresh copy of the class, so each character is truly independent
  function makeCharacter(x, y, speed) {
    const CharacterClass = freshCharacterClass();
    return new CharacterClass(x, y, W, H, speed === undefined ? SPEED : speed, imgMap);
  }

  function press() { held = new Set(Array.prototype.slice.call(arguments)); }
  function release() { held = new Set(); }

  function frames(c, count) {
    for (let i = 0; i < count; i++) c.update();
  }

  function facing(c) {
    draws.length = 0;
    c.drawCharacter();
    expect(draws.length).toBeGreaterThan(0);
    return draws[draws.length - 1].img;
  }

  // A grid of tiles: walls everywhere outside FLOOR, plus any extra walls
  function makeArena(tile, extraWall) {
    const cols = CANVAS_W / tile;
    const rows = CANVAS_H / tile;
    return {
      isWall: function (tx, ty) {
        if (!Number.isInteger(tx) || !Number.isInteger(ty)) return true;
        if (tx < 0 || ty < 0 || tx >= cols || ty >= rows) return true;
        if (
          tx * tile < FLOOR.x0 || (tx + 1) * tile > FLOOR.x1 ||
          ty * tile < FLOOR.y0 || (ty + 1) * tile > FLOOR.y1
        ) {
          return true;
        }
        return Boolean(extraWall && extraWall(tx, ty));
      },
    };
  }

  // Returns the first wall tile the character's box sits inside (beyond TOL), or null
  function wallOverlap(grid, tile, c) {
    const x0 = c.pos.x + TOL;
    const x1 = c.pos.x + W - TOL;
    const y0 = c.pos.y + TOL;
    const y1 = c.pos.y + H - TOL;
    for (let ty = Math.floor(y0 / tile); ty <= Math.ceil(y1 / tile) - 1; ty++) {
      for (let tx = Math.floor(x0 / tile); tx <= Math.ceil(x1 / tile) - 1; tx++) {
        if (grid.isWall(tx, ty)) return { tx: tx, ty: ty, x: c.pos.x, y: c.pos.y };
      }
    }
    return null;
  }

  // The character should be resting against a wall: touching it, or within one step of it
  function expectAgainstWall(gap, speed) {
    expect(gap).toBeGreaterThanOrEqual(-TOL);
    expect(gap).toBeLessThanOrEqual(speed + TOL);
  }

  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // ---------------------------------------------------------------------------
  // Movement
  // ---------------------------------------------------------------------------

  describe("movement", function () {
    it("starts where it was placed", function () {
      const c = makeCharacter(120, 80);
      expect(c.pos.x).toBe(120);
      expect(c.pos.y).toBe(80);
    });

    it("stays put when no key is held", function () {
      const c = makeCharacter(100, 100);
      frames(c, 10);
      expect(c.pos.x).toBe(100);
      expect(c.pos.y).toBe(100);
    });

    DIRECTIONS.forEach(function (d) {
      it("moves " + d.name + " by its speed each frame with the arrow key", function () {
        const c = makeCharacter(100, 100);
        press(d.arrow);
        c.update();
        expect(c.pos.x).toBeCloseTo(100 + d.dx * SPEED, 5);
        expect(c.pos.y).toBeCloseTo(100 + d.dy * SPEED, 5);
      });

      it("moves " + d.name + " by its speed each frame with the WASD key", function () {
        const c = makeCharacter(100, 100);
        press(d.wasd);
        c.update();
        expect(c.pos.x).toBeCloseTo(100 + d.dx * SPEED, 5);
        expect(c.pos.y).toBeCloseTo(100 + d.dy * SPEED, 5);
      });
    });

    it("keeps moving every frame while a key stays held", function () {
      const c = makeCharacter(100, 100);
      press(39);
      frames(c, 5);
      expect(c.pos.x).toBeCloseTo(100 + 5 * SPEED, 5);
      expect(c.pos.y).toBeCloseTo(100, 5);
    });

    it("stops moving when the key is released", function () {
      const c = makeCharacter(100, 100);
      press(39);
      frames(c, 3);
      release();
      const stoppedAt = c.pos.x;
      frames(c, 5);
      expect(c.pos.x).toBe(stoppedAt);
    });

    it("moves at the speed it was given", function () {
      [1, 2.5, 10].forEach(function (speed) {
        const c = makeCharacter(100, 100, speed);
        press(39);
        c.update();
        expect(c.pos.x).toBeCloseTo(100 + speed, 5);
      });
    });

    it("does not move when its speed is zero", function () {
      const c = makeCharacter(100, 100, 0);
      press(39, 40);
      frames(c, 5);
      expect(c.pos.x).toBe(100);
      expect(c.pos.y).toBe(100);
    });

    it("moves diagonally in both axes", function () {
      const c = makeCharacter(100, 100);
      press(39, 40); // right + down
      c.update();
      expect(c.pos.x).toBeGreaterThan(100);
      expect(c.pos.y).toBeGreaterThan(100);
      expect(c.pos.x - 100).toBeCloseTo(c.pos.y - 100, 5);
    });

    it("is not faster on a diagonal than in a straight line", function () {
      [[39, 40], [37, 40], [39, 38], [37, 38]].forEach(function (keys) {
        const c = makeCharacter(100, 100);
        press.apply(null, keys);
        c.update();
        const distance = Math.hypot(c.pos.x - 100, c.pos.y - 100);
        expect(distance).toBeCloseTo(SPEED, 5);
      });
    });

    it("mixes arrow keys and WASD keys", function () {
      const c = makeCharacter(100, 100);
      press(39, 83); // right arrow + S
      c.update();
      expect(c.pos.x).toBeGreaterThan(100);
      expect(c.pos.y).toBeGreaterThan(100);
    });

    it("does not move when opposite keys are held together", function () {
      const c = makeCharacter(100, 100);
      press(37, 39);
      frames(c, 5);
      expect(c.pos.x).toBe(100);

      press(38, 40);
      frames(c, 5);
      expect(c.pos.y).toBe(100);
    });

    it("can change direction between frames", function () {
      const c = makeCharacter(100, 100);
      press(39);
      frames(c, 2);
      press(40);
      frames(c, 2);
      press(37);
      frames(c, 2);
      press(38);
      frames(c, 2);

      expect(c.pos.x).toBeCloseTo(100 + 2 * SPEED - 2 * SPEED, 5);
      expect(c.pos.y).toBeCloseTo(100 + 2 * SPEED - 2 * SPEED, 5);
    });

    it("still moves in a straight line along an axis when the other axis has no key", function () {
      const c = makeCharacter(100, 100);
      press(38);
      frames(c, 4);
      expect(c.pos.x).toBe(100);
      expect(c.pos.y).toBeCloseTo(100 - 4 * SPEED, 5);
    });
  });

  // ---------------------------------------------------------------------------
  // Facing / images
  // ---------------------------------------------------------------------------

  describe("facing images", function () {
    it("starts out facing front", function () {
      const c = makeCharacter(100, 100);
      expect(facing(c)).toBe(imgMap.front);
    });

    DIRECTIONS.forEach(function (d) {
      it("shows the " + d.image + " image when moving " + d.name + " (arrow key)", function () {
        const c = makeCharacter(100, 100);
        press(d.arrow);
        c.update();
        expect(facing(c)).toBe(imgMap[d.image]);
      });

      it("shows the " + d.image + " image when moving " + d.name + " (WASD key)", function () {
        const c = makeCharacter(100, 100);
        press(d.wasd);
        c.update();
        expect(facing(c)).toBe(imgMap[d.image]);
      });
    });

    it("keeps its last facing when it stops", function () {
      DIRECTIONS.forEach(function (d) {
        const c = makeCharacter(100, 100);
        press(d.arrow);
        frames(c, 2);
        release();
        frames(c, 3);
        expect(facing(c)).toBe(imgMap[d.image]);
      });
    });

    it("switches image whenever the direction changes", function () {
      const c = makeCharacter(100, 100);
      const sequence = ["right", "left", "up", "down", "right", "up", "left", "down"];
      sequence.forEach(function (name) {
        const d = DIRECTIONS.find(function (x) { return x.name === name; });
        press(d.arrow);
        c.update();
        expect(facing(c)).toBe(imgMap[d.image]);
      });
    });

    it("faces one of the two directions it is moving in on a diagonal", function () {
      const cases = [
        { keys: [39, 38], allowed: ["right", "back"] },
        { keys: [39, 40], allowed: ["right", "front"] },
        { keys: [37, 38], allowed: ["left", "back"] },
        { keys: [37, 40], allowed: ["left", "front"] },
      ];
      cases.forEach(function (testCase) {
        const c = makeCharacter(100, 100);
        press.apply(null, testCase.keys);
        c.update();
        const allowedImages = testCase.allowed.map(function (n) { return imgMap[n]; });
        expect(allowedImages).toContain(facing(c));
      });
    });

    it("shows a single consistent image when the same direction is held for many frames", function () {
      const c = makeCharacter(100, 100);
      press(37);
      frames(c, 10);
      expect(facing(c)).toBe(imgMap.left);
    });

    it("draws the sprite at the character's position and size", function () {
      const c = makeCharacter(100, 100);
      press(39, 40);
      frames(c, 3);
      draws.length = 0;
      c.drawCharacter();

      const last = draws[draws.length - 1];
      expect(last.x).toBeCloseTo(c.pos.x, 5);
      expect(last.y).toBeCloseTo(c.pos.y, 5);
      expect(last.w).toBe(W);
      expect(last.h).toBe(H);
    });
  });

  // ---------------------------------------------------------------------------
  // Collision
  // ---------------------------------------------------------------------------

  describe("collision", function () {
    const TILE = 20;

    it("moves freely when no dungeon has been set", function () {
      const c = makeCharacter(100, 100);
      press(39);
      frames(c, 10);
      expect(c.pos.x).toBeCloseTo(100 + 10 * SPEED, 5);
    });

    it("moves freely across open floor", function () {
      const c = makeCharacter(100, 100);
      c.setDungeon(makeArena(TILE), TILE);
      press(39);
      frames(c, 5);
      expect(c.pos.x).toBeCloseTo(100 + 5 * SPEED, 5);
    });

    it("moves freely when the dungeon has no walls at all", function () {
      const c = makeCharacter(100, 100);
      c.setDungeon({ isWall: function () { return false; } }, TILE);
      press(39);
      frames(c, 50);
      expect(c.pos.x).toBeCloseTo(100 + 50 * SPEED, 5);
    });

    it("cannot leave the floor in any direction and ends up right against the wall", function () {
      const arena = makeArena(TILE);
      const edges = {
        left: function (c) { return c.pos.x - FLOOR.x0; },
        right: function (c) { return FLOOR.x1 - (c.pos.x + W); },
        up: function (c) { return c.pos.y - FLOOR.y0; },
        down: function (c) { return FLOOR.y1 - (c.pos.y + H); },
      };

      DIRECTIONS.forEach(function (d) {
        const c = makeCharacter(100, 100);
        c.setDungeon(arena, TILE);
        press(d.arrow);
        frames(c, 200);
        expect(wallOverlap(arena, TILE, c)).toBeNull();
        expectAgainstWall(edges[d.name](c), SPEED);
      });
    });

    [10, 20, 40].forEach(function (tile) {
      it("respects walls when the tile size is " + tile + "px", function () {
        const arena = makeArena(tile);
        const c = makeCharacter(100, 100);
        c.setDungeon(arena, tile);

        press(39);
        frames(c, 200);
        expectAgainstWall(FLOOR.x1 - (c.pos.x + W), SPEED);

        press(37);
        frames(c, 200);
        expectAgainstWall(c.pos.x - FLOOR.x0, SPEED);

        press(38);
        frames(c, 200);
        expectAgainstWall(c.pos.y - FLOOR.y0, SPEED);

        press(40);
        frames(c, 200);
        expectAgainstWall(FLOOR.y1 - (c.pos.y + H), SPEED);

        expect(wallOverlap(arena, tile, c)).toBeNull();
      });
    });

    it("stops at a wall in its path", function () {
      // A full-height wall column at pixels 200-219
      const arena = makeArena(TILE, function (tx) { return tx === 10; });
      const c = makeCharacter(100, 100);
      c.setDungeon(arena, TILE);

      press(39);
      frames(c, 100);

      expect(wallOverlap(arena, TILE, c)).toBeNull();
      expectAgainstWall(200 - (c.pos.x + W), SPEED);
    });

    it("stays blocked while it keeps pushing into a wall", function () {
      const arena = makeArena(TILE);
      const c = makeCharacter(100, 100);
      c.setDungeon(arena, TILE);

      press(39);
      frames(c, 100);
      const blockedAt = c.pos.x;
      frames(c, 20);

      expect(c.pos.x).toBeCloseTo(blockedAt, 5);
    });

    it("can walk away from a wall after being blocked by it", function () {
      const arena = makeArena(TILE);
      const c = makeCharacter(100, 100);
      c.setDungeon(arena, TILE);

      press(39);
      frames(c, 100);
      const blockedAt = c.pos.x;
      press(37);
      frames(c, 3);

      expect(c.pos.x).toBeCloseTo(blockedAt - 3 * SPEED, 5);
    });

    it("slides along a wall instead of sticking to it", function () {
      const arena = makeArena(TILE);
      const c = makeCharacter(300, 100); // near the right wall
      c.setDungeon(arena, TILE);

      press(39, 40); // push right into the wall while also moving down
      frames(c, 20);

      expect(wallOverlap(arena, TILE, c)).toBeNull();
      expect(c.pos.y).toBeGreaterThan(100 + 20); // it kept moving down along the wall
    });

    it("still turns to face the wall it is pushing into", function () {
      const arena = makeArena(TILE);
      const c = makeCharacter(100, 100);
      c.setDungeon(arena, TILE);

      press(39);
      frames(c, 100);
      const blockedAt = c.pos.x;
      press(38);
      c.update();
      press(39);
      frames(c, 5);

      expect(c.pos.x).toBeCloseTo(blockedAt, 5);
      expect(facing(c)).toBe(imgMap.right);
    });

    it("cannot squeeze through a gap narrower than itself", function () {
      // Wall column with a one tile (20px) gap; the character is 50px
      const arena = makeArena(TILE, function (tx, ty) { return tx === 10 && ty !== 6; });
      const c = makeCharacter(100, 110);
      c.setDungeon(arena, TILE);

      press(39);
      frames(c, 100);

      expect(wallOverlap(arena, TILE, c)).toBeNull();
      expect(c.pos.x + W).toBeLessThanOrEqual(200 + TOL);
    });

    it("can pass through a gap wider than itself", function () {
      // Wall column with a three tile (60px) gap at pixels 100-159
      const arena = makeArena(TILE, function (tx, ty) { return tx === 10 && !(ty >= 5 && ty <= 7); });
      const c = makeCharacter(100, 105);
      c.setDungeon(arena, TILE);

      press(39);
      frames(c, 60);

      expect(wallOverlap(arena, TILE, c)).toBeNull();
      expect(c.pos.x).toBeGreaterThan(220); // fully past the wall column
    });

    it("uses the most recently set dungeon", function () {
      const c = makeCharacter(100, 100);
      c.setDungeon({ isWall: function () { return false; } }, TILE);
      const arena = makeArena(TILE);
      c.setDungeon(arena, TILE);

      press(39);
      frames(c, 100);

      expect(wallOverlap(arena, TILE, c)).toBeNull();
      expectAgainstWall(FLOOR.x1 - (c.pos.x + W), SPEED);
    });

    [4, 9].forEach(function (speed) {
      it("never ends up inside a wall during 3000 frames of random movement (speed " + speed + ")", function () {
        const obstacles = function (tx, ty) {
          return (
            (tx === 8 && ty >= 3 && ty <= 8) ||
            (tx === 13 && ty >= 6 && ty <= 11) ||
            (tx === 5 && ty === 10)
          );
        };
        const arena = makeArena(TILE, obstacles);
        const random = mulberry32(12345 + speed);
        const keys = [37, 38, 39, 40, 65, 87, 68, 83];

        const c = makeCharacter(100, 100, speed);
        c.setDungeon(arena, TILE);

        let violation = null;
        let framesUntilChange = 0;
        for (let i = 0; i < 3000 && !violation; i++) {
          if (framesUntilChange <= 0) {
            const chosen = keys.filter(function () { return random() < 0.3; });
            press.apply(null, chosen);
            framesUntilChange = 5 + Math.floor(random() * 15);
          }
          framesUntilChange--;
          c.update();
          violation = wallOverlap(arena, TILE, c);
        }

        expect(violation).toBeNull();
      });
    });
  });
});
