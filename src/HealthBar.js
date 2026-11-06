class HealthBar {
  constructor(maxHealth, x, y, width, height) {
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  damage(amount) {
    this.currentHealth = Math.max(0, this.currentHealth - amount);
    return this.currentHealth;
  }

  heal(amount) {
    this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount);
    return this.currentHealth;
  }

  getCurrentWidth() {
    if (this.maxHealth <= 0) return 0;
    return (this.currentHealth / this.maxHealth) * this.width;
  }

  isDepleted() {
    return this.currentHealth === 0;
  }
}

let playerHealth = new HealthBar(100, 50, 50, 200, 20);

function drawHealthBar(hb) {
  background(220);
  noStroke();
  fill(210, 210, 210);
  rect(hb.x, hb.y, hb.width, hb.height);

  fill(255, 0, 0);
  let currentW = hb.getCurrentWidth();
  rect(hb.x, hb.y, currentW, hb.height);

  fill(255); 
  textSize(12);
  textAlign(CENTER, CENTER);
  text(`${hb.currentHealth} / ${hb.maxHealth} HP`, hb.x + hb.width / 2, hb.y + hb.height / 2);
}