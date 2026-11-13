class TitleScreen {
    constructor() {
    }
    drawTitleScreen() {
    background(149,202,114);

    textFont('Georgia')
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Hello Traveler! ", 500, 40);
    text("This game will allow you to become magical mage on a quest to defeat the evil boss", 500, 80);
    text("Dungeons full of foes await you, as well as treasures beyond your wildest dreams", 500, 100);
    text("Solve puzzles, defeat enemies and collect items to complete your nobel quest", 500, 120);

    }
}