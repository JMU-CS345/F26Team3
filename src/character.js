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
        vel.normalize();
        vel.mult(this.speed);

        // Add velocity vector to position vector
        this.pos.add(vel);
    }

    drawCharacter() {
        image(this.img, this.pos.x, this.pos.y, this.w, this.h);
    }
}