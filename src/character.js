class Character{
    // singleton character so you can only create one (?)
    // character needs to have an image, how to p5
    static #instance = null;
    let x y speed;
    let w = h = 50;
    let img = await loadImage("assets/tmp/SmiskiTEMP.jpg");
    constructor(startX, startY, speed) {
        if (Character.instance) {
            return Character.#instance;
        }
        Character.#instance = this;
        x = startX;
        y = startY;
        this.speed = speed;
    }

    function move(pressed) {
        if (pressed == 'ArrowLeft') {
            x -= speed;
            drawCharacter(x, y);
        }
        if (pressed == 'ArrowRight') {
            x+= speed;
            drawCharacter(x, y);
        }
        if (pressed == 'ArrowUp') {
            y += speed;
            drawCharacter(x, y);
        }
        if (pressed == 'ArrowDown') {
            y -= speed;
            drawCharacter(x, y);
        }
    }

    function drawCharacter(xcoord, ycoord) {
        Image(img, x, y, 200, 200, 200, 0, 0,)
    }
}