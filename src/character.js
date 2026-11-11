class character {
    static #instance = null;

    constructor(startX, startY, speed, tempImg) {
        if (character.#instance) {
            return character.#instance;
        }
        character.#instance = this;

        // Position vector
        this.pos = createVector(startX, startY);
        this.speed = speed;
        this.img = tempImg;
        this.w = 50;
        this.h = 50;
    }

    update() {
        // Create a velocity vector starting at (0,0) every frame
        let vel = createVector(0, 0);

        // Check arrow keys or WASD simultaneously using keyIsDown()
        // Im not sure the keycodes for wasd are correct
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // Left Arrow or 'A'
            vel.x -= 1;
        }
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // Right Arrow or 'D'
            vel.x += 1;
        }
        if (keyIsDown(UP_ARROW) || keyIsDown(87)) { // Up Arrow or 'W'
            vel.y -= 1;
        }
        if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { // Down Arrow or 'S'
            vel.y += 1;
        }

        // Normalize vector so diagonal movement isn't faster, then apply speed
        if (vel.mag() > 0) {
            vel.normalize();
            vel.mult(this.speed);
        }

        // Add velocity vector to position vector
        let nextX = this.pos.x + vel.x;
        if (!this.checkCollision(nextX, this.pos.y, dungeon)) {
            this.pos.x = nextX;
        }

        // 2. Test Y movement independently
        let nextY = this.pos.y + vel.y;
        if (!this.checkCollision(this.pos.x, nextY, dungeon)) {
            this.pos.y = nextY;
        }
    }

    checkColission(px, py) {
        return false;
    }

    drawCharacter() {
        image(this.img, this.pos.x, this.pos.y, this.w, this.h);
    }
}