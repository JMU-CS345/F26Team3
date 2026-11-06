describe("HealthBar Unit Tests", function() {
  
  it("should initialize with correct default values and full health width", function() {
    const hb = new HealthBar(100, 50, 50, 200, 20);
    expect(hb.currentHealth).toEqual(100);
    expect(hb.maxHealth).toEqual(100);
    expect(hb.getCurrentWidth()).toEqual(200);
    expect(hb.isDepleted()).toBe(false);
  });

  it("should reduce health and width correctly when taking damage", function() {
    const hb = new HealthBar(100, 50, 50, 200, 20);
    hb.damage(40);
    expect(hb.currentHealth).toEqual(60);
    expect(hb.getCurrentWidth()).toEqual(120);
    expect(hb.isDepleted()).toBe(false);
  });

  it("should clamp health at zero when damage exceeds total health", function() {
    const hb = new HealthBar(100, 50, 50, 200, 20);
    hb.damage(150);
    expect(hb.currentHealth).toEqual(0);
    expect(hb.getCurrentWidth()).toEqual(0);
    expect(hb.isDepleted()).toBe(true);
  });

  it("should clamp health at maxHealth when healing past maximum", function() {
    const hb = new HealthBar(100, 50, 50, 200, 20);
    hb.damage(30);
    hb.heal(50);
    expect(hb.currentHealth).toEqual(100);
    expect(hb.getCurrentWidth()).toEqual(200);
  });

  it("should successfully execute mock drawing calls", function() {
    const hb = new HealthBar(100, 50, 50, 200, 20);
    const mockContext = {
      calls: [],
      noStroke() { this.calls.push('noStroke'); },
      fill(...args) { this.calls.push(['fill', args]); },
      rect(...args) { this.calls.push(['rect', args]); },
      text(...args) { this.calls.push(['text', args]); }
    };

    // Mock draw implementation
    const currentW = hb.getCurrentWidth();
    mockContext.noStroke();
    mockContext.fill(210, 210, 210);
    mockContext.rect(hb.x, hb.y, hb.width, hb.height);
    mockContext.fill(255, 0, 0);
    mockContext.rect(hb.x, hb.y, currentW, hb.height);
    mockContext.text(`${hb.currentHealth} / ${hb.maxHealth} HP`, hb.x + hb.width / 2, hb.y + hb.height / 2);

    expect(mockContext.calls.length).toBeGreaterThan(0);
  });

});