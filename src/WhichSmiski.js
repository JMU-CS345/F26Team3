class WhichSmiski {
    constructor() {
        this.selectedSmiski = true;
        this.flower = 2;
        this.btn = { x: 500, y: 400, w: 200, h: 60 };
    }

    setFlower(flow) {
        this.flower = flow
    }

    drawButton() {
        const hover = this.isHovering();

        // Button body: lighter when hovered
        rectMode(CENTER);
        strokeWeight(3);
        if (this.flower === 1) {
            stroke(137, 93, 172);
            fill(hover ? color(137, 93, 172) : color(194, 150, 201));
        } else if (this.flower === 2) {
            stroke(189, 95, 75);
            fill(hover ? color(189, 95, 75) : color(219, 142, 102));
        }
        else if (this.flower === 3) {
            stroke(103, 131, 183);
            fill(hover ? color(103, 131, 183) : color(163, 192, 223));
        }
        rect(this.btn.x, this.btn.y, this.btn.w, this.btn.h, 12);

        // Button label
        noStroke();
        if (this.flower === 1) {
            fill(hover ? color(194, 150, 201) : color(137, 93, 172));
        } else if (this.flower === 2) {
            fill(hover ? color(219, 142, 102) : color(189, 95, 75));
        } else if (this.flower === 3) {
            fill(hover ? color(163, 192, 223) : color(103, 131, 183));
        }
        textSize(28);
        text("Continue?", this.btn.x, this.btn.y);

        cursor(hover ? HAND : ARROW);
    }
    isHovering() {
        return (
            mouseX > this.btn.x - this.btn.w / 2 &&
            mouseX < this.btn.x + this.btn.w / 2 &&
            mouseY > this.btn.y - this.btn.h / 2 &&
            mouseY < this.btn.y + this.btn.h / 2
        );
    }

    mousePressed() {
        if (this.selectedSmiski && this.isHovering()) {
            this.selectedSmiski = false;
        }
    }

    drawWhichSmiski() {
        if (this.flower === 1) {
            background(194, 150, 201);
            fill(137, 93, 172);
            textAlign(CENTER, CENTER)
            textFont('Georgia')
            textSize(50);
            text("You are a Smiski of the mind", 500, 300);
        }
        else if (this.flower === 2) {
            background(219, 142, 102);
            fill(189, 95, 75);
            textAlign(CENTER, CENTER)
            textFont('Georgia')
            textSize(50);
            text("You are a Smiski of the flames", 500, 300);
        }
        else if (this.flower === 3) {
            background(163, 192, 223);
            fill(103, 131, 183);
            textAlign(CENTER, CENTER)
            textFont('Georgia')
            textSize(50);
            text("You are a Smiski of the frost", 500, 300);

        } else {
            background(0);
            fill(255);
            textAlign(CENTER, CENTER)
            textFont('Georgia')
            textSize(50);
            text("Something went wrong", 500, 300);
        }

        this.drawButton();
        window.addEventListener('mousedown', () => {
            if (this.selectedSmiski && this.isHovering())
                this.selectedSmiski = false;
        });
    }
}