class OverWorld {
  constructor(img) {
    this.img = img;
  }

  drawOverWorld() {
    if (!this.img) return;

    // 200px squares: 5 columns x 3 rows = exactly 1000x600
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 5; col++) {
        drawImg(this.img, col * 200, row * 200, 200, 200);
      }
    }

    push();
    noStroke();
    fill(53, 6, 62);
    rect(350, 25, 300, 30);

    fill(149, 202, 114);
    textSize(20);
    textFont('Georgia');
    textAlign(CENTER, CENTER);
    text("You are in the Over World!", 500, 40);
    pop();
  }
}