class character {
  static #instance = null;

  constructor(startX, startY, speed, size, imgMap) {
    if (character.#instance) {
      return character.#instance;
    }
    character.#instance = this;

    // Position vector
    this.pos = createVector(startX, startY);
    this.speed = speed;
    this.imgMap = imgMap;
    this.w = 50;
    this.h = 50;
    this.currentImg = imgMap.front;
  }

  update() {
    // Create a velocity vector starting at (0,0) every frame
    let vel = createVector(0, 0);

    // Check arrow keys or WASD simultaneously using keyIsDown()
    // Im not sure the keycodes for wasd are correct
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      // Left Arrow or 'A'
      vel.x -= 1;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      // Right Arrow or 'D'
      vel.x += 1;
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      // Up Arrow or 'W'
      vel.y -= 1;
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      // Down Arrow or 'S'
      vel.y += 1;
    }

    // Normalize vector so diagonal movement isn't faster, then apply speed
    if (vel.mag() > 0) {
      vel.normalize();

      // Change the current image based on the dominant direction of movement
      if (abs(vel.y) >= abs(vel.x)) {
        if (vel.y < 0) {
          this.currentImg = this.imgMap.back; // Moving Up / 'W'
        } else {
          this.currentImg = this.imgMap.front; // Moving Down / 'S'
        }
      } else {
        if (vel.x < 0) {
          this.currentImg = this.imgMap.left; // Moving Left / 'A'
        } else {
          this.currentImg = this.imgMap.right; // Moving Right / 'D'
        }
      }

      vel.mult(this.speed);
    }

    // Add velocity vector to position vector

    // Test if X is inbounds
    let nextX = this.pos.x + vel.x;
    if (!this.checkCollision(nextX, this.pos.y)) {
      this.pos.x = nextX;
    }

    // Test if Y is inbounds
    let nextY = this.pos.y + vel.y;
    if (!this.checkCollision(this.pos.x, nextY)) {
      this.pos.y = nextY;
    }
  }

  checkCollision(px, py) {
    return false;
  }

  drawCharacter() {
    image(this.currentImg, this.pos.x, this.pos.y, this.w, this.h);
  }
}
