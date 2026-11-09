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

  draw() {
    noStroke();
    fill(210, 210, 210);
    rect(this.x, this.y, this.width, this.height);

    fill(255, 0, 0);
    rect(this.x, this.y, this.getCurrentWidth(), this.height);

    fill(255);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(`${this.currentHealth} / ${this.maxHealth} HP`, this.x + this.width / 2, this.y + this.height / 2);
  }
}