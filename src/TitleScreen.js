class TitleScreen {
  constructor() {
    // Button position and size (centered at x=500)
    this.btn = { x: 500, y: 300, w: 200, h: 60 };
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

    textFont('Georgia');
    textAlign(CENTER, CENTER);

    fill(75, 1, 80);
    textSize(40);
    text("MageQuest", 500, 40);

    textSize(20);
    text("Hello Traveler! ", 500, 100);
    text("This game will allow you to become magical mage on a quest to defeat the evil boss", 500, 140);
    text("Dungeons full of foes await you, as well as treasures beyond your wildest dreams", 500, 160);
    text("Solve puzzles, defeat enemies and collect items to complete your noble quest", 500, 180);

    this.drawPlayButton();
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
    text("Play", this.btn.x, this.btn.y);

    cursor(hover ? HAND : ARROW);
  }

  // Returns true if the play button was clicked
  handleClick() {
    return this.isHovering();
  }
}