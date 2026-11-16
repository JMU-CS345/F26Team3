class TitleScreen {
  constructor(fire, ice, mind) {
  this.title = true;
  this.btn = { x: 500, y: 400, w: 200, h: 60 };
  this.fire = fire;
  this.ice = ice;
  this.mind = mind;

    window.addEventListener('mousedown', () => {
    if (this.title && this.isHovering()) this.title = false;
    });
  }

  // True when the mouse is over the button
  isHovering() {
    return (
      mouseX > this.btn.x - this.btn.w / 2 &&
      mouseX < this.btn.x + this.btn.w / 2 &&
      mouseY > this.btn.y - this.btn.h / 2 &&
      mouseY < this.btn.y + this.btn.h / 2
    );
  }

  drawTitleScreen() {
    background(149, 202, 114);

    push();
    textFont('Georgia');
    textAlign(CENTER, CENTER);

    fill(75, 1, 80);
    textSize(40);
    text("MageQuest", 500, 80);

    textSize(20);
    text("Hello Traveler! ", 500, 150);
    text("This game will allow you to become magical mage on a quest to defeat the evil boss", 500, 200);
    text("Dungeons full of foes await you, as well as treasures beyond your wildest dreams", 500, 220);
    text("Solve puzzles, defeat enemies and collect items to complete your noble quest", 500, 240);

    this.drawPlayButton();
    this.drawFlowers();
    pop();
  }

  drawPlayButton() {
    const hover = this.isHovering();

    // Button body: lighter when hovered
    rectMode(CENTER);
    stroke(75, 1, 80);
    strokeWeight(3);
    fill(hover ? color(150, 40, 160) : color(75, 1, 80));
    rect(this.btn.x, this.btn.y, this.btn.w, this.btn.h, 12);

    // Button label
    noStroke();
    fill(255);
    textSize(28);
    text("Start Quest!", this.btn.x, this.btn.y);

    cursor(hover ? HAND : ARROW);
  }

  mousePressed() {
    if (this.title && this.isHovering()) {
      this.title = false;
    }
  }

  drawFlowers() {
    // fire flowers 
    drawImg(this.fire, 40, 300, 40, 40);
    drawImg(this.fire, 800, 450, 40, 40);
    drawImg(this.fire, 300, 50, 40, 40);
    drawImg(this.fire, 950, 200, 40, 40);
    drawImg(this.fire, 550, 320, 40, 40);

    //ice flowers
    drawImg(this.ice, 150, 500, 40, 40);
    drawImg(this.ice, 650, 150, 40, 40);
    drawImg(this.ice, 875, 300, 40, 40);
    drawImg(this.ice, 5, 30, 40, 40);

    //mind flowers
    drawImg(this.mind, 500, 550, 40, 40);
    drawImg(this.mind, 850, 20, 40, 40);
    drawImg(this.mind, 145, 100, 40, 40);
    drawImg(this.mind, 260, 400, 40, 40);
    drawImg(this.mind, 945, 490, 40, 40);
  }
}