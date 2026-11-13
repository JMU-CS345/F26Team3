class OverWorld {
  constructor(img) {
    this.img = img;
  }

  drawOverWorld() {
    if (!this.img) return;

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 8; col++) {
        image(this.img, col * 133, row * 133, 133, 133);
      }
    }

    fill(53, 6, 62);
    rect(350, 25, 300, 30);

    fill(149,202,114);
    textSize(20);
    textFont('Georgia')
    textAlign(CENTER, CENTER);
    text(`You are in the Over World!`, 500, 40);
  }
  
}