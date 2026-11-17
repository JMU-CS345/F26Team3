class MageSelectScreen {

    constructor(img, smiski) {
        this.img = img;
        this.gardenBoolean = true;
    }

    drawSmiskiGarden() {
        drawImg(this.img, 0, 0, 1000, 600);
        fill(255, 255, 230)
        textFont('Georgia')
        textAlign(CENTER, CENTER)
        textSize(30)
        text(this.message(), 500, 50);
    }

    // returns an integer based on which zone the smiski is in:None = 0, Mind = 1, Fire = 2
    // Ice = 3,.Puddle = 4;
    whichZone(x, y) {
        // Mind box 1 dimensions: (x > 0 && x < 250 && y < 600 && y > 175)
        // Mind box 2 dimensions: (x > 0 && x < 90 && y < 600 && y > 80)
        // Mind box 3 dimensions: (x > 0 && x < 400 && y < 600 && y > 450)
        // Fire box 1 dimensions: (x > 100 && x < 870 && y > 0 && y < 95)
        // Fire box 2 dimensions: (x > 260 && x < 710 && x > 0 && x < 170)
        // Ice box 1 dimensions: (x > 790 && x < 1000 && y > 120 && y < 600)
        // Ice box 2 dimensions: (x > 630 && x < 1000 && y > 470 && y < 600)
        // Puddle box 1 dimensions: (x > 328 && x < 676 && y < 346 && y > 247)
        // Puddle box 1 dimensions: (x > 410 && x < 560 && y < 410 && y > 210)

        // check for mind 
        if ((x > 0 && x < 250 && y < 600 && y > 175) || (x > 0 && x < 90 && y < 600 && y > 80)
            || (x > 0 && x < 400 && y < 600 && y > 450)) {
            return 1;
        }
        // check for fire
        else if ((x > 100 && x < 870 && y > 0 && y < 95) ||
            (x > 0 && x < 400 && y < 600 && y > 450)) {
            return 2;
        }
        // check for ice
        else if ((x > 790 && x < 1000 && y > 120 && y < 600) ||
            (x > 630 && x < 1000 && y > 470 && y < 600)) {
            return 3;
        }
        // check for puddle
        else if ((x > 328 && x < 676 && y < 346 && y > 247) ||
            (x > 410 && x < 560 && y < 410 && y > 210)) {
            return 4;
        } else {
            return 0;
        }
    }


    message() {
        let zone = this.whichZone();
        if (zone === 1) {
            return "Smiski is feeling Philosophical";
        }
        else if (zone === 2) {
            return "Smiski is starting to sweat";
        }
        else if (zone === 3) {
            return "Smiksi shakes and shivers";
        }
        else if (zone === 4) {
            if (getFlower() === 0) {
                return "Press E to select a flower"
            }
            else {
                return "Are you sure you want to select this smiski\nPress E to continue"
            }
        } else {
            return " ";
        }
    }

    selectFlower() {
        if (keyIsPressed('E')) {
            setFlower(this.whichZone(x, y));
        }
    }

    finalChoice() {
        if (this.whichZone == 4 && getFlower() > 0 && getFlower() < 4) {
            if (keyIsPressed('E')) {
                return 0;
            }
        }
    }



}