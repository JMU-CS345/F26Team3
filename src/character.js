class character {
    static #instance = null;

    constructor(startX, startY, speed, tempImg) {
        // Singleton check
        if (character.#instance) {
            return Character.#instance;
        }
        character.#instance = this;

        this.x = startX;
        this.y = startY;
        this.speed = speed;
        this.img = tempImg;
        this.w = 50;
        this.h = 50;
    }

    move(pressed) {
        if (pressed === 'ArrowLeft') {
            this.x -= this.speed;
        }
        if (pressed === 'ArrowRight') {
            this.x += this.speed;
        }
        if (pressed === 'ArrowUp') {
            this.y -= this.speed;
        }
        if (pressed === 'ArrowDown') {
            this.y += this.speed;
        }
    }

    drawCharacter() {
        image(this.img, this.x, this.y, this.w, this.h);
    }
}