// Smoke tests: does the game load and show up at all?
//
// These load your real index.html inside a hidden iframe, so they need to be
// served over http (e.g. `python3 -m http.server`), the same as SpecRunner.html.
//
// CONFIG: adjust these two values if your project differs.
const GAME_URL = "index.html"; // path to the game page, relative to SpecRunner.html
const START_BUTTON = { x: 500, y: 400 }; // where the title screen's start button is (canvas coordinates)

describe("Game smoke tests", function () {
  let iframe = null;

  // Runs inside the game page before any of its own scripts, to record problems
  function installErrorHook() {
    window.__gameErrors = [];
    window.addEventListener(
      "error",
      function (e) {
        if (e.target && e.target !== window) {
          window.__gameErrors.push("Failed to load " + (e.target.src || e.target.href || e.target.tagName));
        } else {
          window.__gameErrors.push((e.message || "Script error") + " (" + (e.filename || "inline") + ":" + e.lineno + ")");
        }
      },
      true
    );
    window.addEventListener("unhandledrejection", function (e) {
      window.__gameErrors.push(
        "Unhandled promise rejection: " + (e.reason && e.reason.message ? e.reason.message : e.reason)
      );
    });
  }

  async function fetchText(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(url + " returned HTTP " + response.status);
    }
    return response.text();
  }

  function sleep(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  async function waitFor(condition, timeoutMs, description) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      let result = false;
      try { result = condition(); } catch (e) { result = false; }
      if (result) return;
      await sleep(50);
    }
    throw new Error("Timed out waiting for: " + description);
  }

  // Loads the game page in an iframe with an error recorder installed first
  async function loadGame() {
    const pageUrl = new URL(GAME_URL, location.href).href;
    let html = await fetchText(pageUrl);
    const hook =
      '<base href="' + pageUrl + '"><script>(' + installErrorHook.toString() + ")();<\/script>";
    if (/<head[^>]*>/i.test(html)) {
      html = html.replace(/<head[^>]*>/i, function (match) { return match + hook; });
    } else {
      html = hook + html;
    }

    iframe = document.createElement("iframe");
    iframe.style.cssText =
      "position:fixed;left:0;top:0;width:1100px;height:700px;opacity:0;pointer-events:none;border:0;z-index:-1";
    iframe.srcdoc = html;
    document.body.appendChild(iframe);

    await waitFor(function () {
      return iframe.contentDocument && iframe.contentDocument.querySelector("canvas");
    }, 10000, "the game to create a canvas");

    return {
      win: iframe.contentWindow,
      canvas: iframe.contentDocument.querySelector("canvas"),
      errors: function () { return iframe.contentWindow.__gameErrors || []; },
    };
  }

  // Counts (sampled) non-transparent pixels on the canvas
  function paintedPixels(canvas) {
    const data = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height).data;
    let painted = 0;
    for (let i = 3; i < data.length; i += 4 * 50) {
      if (data[i] > 0) painted++;
    }
    return painted;
  }

  afterEach(function () {
    if (iframe) {
      iframe.remove();
      iframe = null;
    }
  });

  it("has game script files that all parse without syntax errors", async function () {
    const pageUrl = new URL(GAME_URL, location.href);
    const html = await fetchText(pageUrl.href);
    const doc = new DOMParser().parseFromString(html, "text/html");

    const scriptUrls = Array.from(doc.querySelectorAll("script[src]"))
      .map(function (s) { return new URL(s.getAttribute("src"), pageUrl); })
      .filter(function (u) { return u.origin === location.origin; }) // skip CDN libraries
      .filter(function (u) { return !/(^|\/)p5(\.min)?\.js$/i.test(u.pathname); }); // skip a local p5 copy

    expect(scriptUrls.length).toBeGreaterThan(0);

    const problems = [];
    for (const url of scriptUrls) {
      try {
        const source = await fetchText(url.href);
        new Function(source); // parses the file without running it
      } catch (e) {
        problems.push(url.pathname + ": " + e.message);
      }
    }

    expect(problems).toEqual([]);
  }, 20000);

  it("loads the page with no script errors or missing files", async function () {
    const game = await loadGame();
    await sleep(2500); // let async asset loading and the first frames finish
    expect(game.errors()).toEqual([]);
  }, 20000);

  it("shows a canvas with something painted on it", async function () {
    const game = await loadGame();

    expect(game.canvas.width).toBeGreaterThan(0);
    expect(game.canvas.height).toBeGreaterThan(0);

    await waitFor(function () { return paintedPixels(game.canvas) > 0; }, 8000, "the canvas to be painted");
    expect(paintedPixels(game.canvas)).toBeGreaterThan(0);
    expect(game.errors()).toEqual([]);
  }, 20000);

  it("starts the game after clicking the start button, with no errors", async function () {
    const game = await loadGame();
    await waitFor(function () { return paintedPixels(game.canvas) > 0; }, 8000, "the title screen to be painted");
    await sleep(500);

    const titleSnapshot = game.canvas.toDataURL();

    const rect = game.canvas.getBoundingClientRect();
    const point = {
      clientX: rect.left + START_BUTTON.x,
      clientY: rect.top + START_BUTTON.y,
      bubbles: true,
      view: game.win,
    };
    game.canvas.dispatchEvent(new game.win.MouseEvent("mousemove", point));
    await sleep(200);
    game.canvas.dispatchEvent(new game.win.MouseEvent("mousedown", point));
    game.canvas.dispatchEvent(new game.win.MouseEvent("mouseup", point));

    await waitFor(function () {
      return game.canvas.toDataURL() !== titleSnapshot;
    }, 5000, "the screen to change after clicking start");

    await sleep(1000); // let several game frames run
    expect(game.errors()).toEqual([]);
    expect(paintedPixels(game.canvas)).toBeGreaterThan(0);
  }, 25000);
});
