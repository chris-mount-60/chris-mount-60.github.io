(() => {
  const button = document.getElementById("generate-ridge");
  const layers = [
    { id: "mount", steps: 96, mu: 0.18, baseline: 355, relief: 130 },
    { id: "near", steps: 480, mu: 0.70, baseline: 395, relief: 89 }
  ];
  const width = 960, height = 400;
  let layer = -1, frame = null, points = [], started = 0;

  // One physical-time step of sticky reflected BM, with clock t + mu * regulator.
  function step(x, dt, mu) {
    const normal = Math.sqrt(-2 * Math.log1p(-Math.random())) * Math.cos(2 * Math.PI * Math.random());
    const h = Math.abs(normal), m = Math.sqrt(dt) * h;
    const exponential = -Math.log1p(-Math.random());
    if (m <= x) return x - 2 * m + Math.sqrt(m * m + 2 * dt * exponential);
    const gain = 2 * (m - x) * (m + x) /
      (2 * x + mu * h * h + h * Math.sqrt(mu * mu * h * h + 4 * (dt + mu * x)));
    const c = x + gain, t = (c / h) ** 2;
    if (Math.random() < mu * c / (mu * c + 2 * t)) return 0;
    return 2 * t * exponential / (Math.sqrt(c * c + 2 * t * exponential) + c);
  }

  function label(action) {
    button.title = action;
    button.setAttribute("aria-label", action);
  }

  function draw(progress) {
    const { id } = layers[layer];
    const end = Math.floor(progress * (points.length - 1));
    const line = "M" + points.slice(0, end + 1).join(" L");
    document.getElementById(id + "-ridge").setAttribute("d", line);
    document.getElementById(id + "-area").setAttribute("d", line + " V" + height + " H0 Z");
  }

  function finish() {
    draw(1);
    frame = null;
    label(layer === 0 ? "Draw the nearer sticky Brownian ridge" : "Start a new mountain scene");
  }

  function advance(now) {
    const progress = (now - started) / 6000;
    if (progress >= 1) return finish();
    draw(progress);
    frame = requestAnimationFrame(advance);
  }

  button.addEventListener("click", () => {
    if (frame !== null) {
      cancelAnimationFrame(frame);
      finish();
      return;
    }
    layer = (layer + 1) % layers.length;
    if (layer === 0) {
      for (const id of ["near-area", "near-ridge"]) document.getElementById(id).removeAttribute("d");
    }
    const { steps, mu, baseline, relief } = layers[layer];
    const samples = [0];
    for (let i = 1; i <= steps; i++) samples.push(step(samples[i - 1], 1 / steps, mu));
    const peak = Math.max(0.5, ...samples);
    points = samples.map((y, i) => (i * width / steps).toFixed(2) + "," + (baseline - relief * y / peak).toFixed(2));
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return finish();
    draw(0);
    label("Finish drawing this ridge");
    started = performance.now();
    frame = requestAnimationFrame(advance);
  });
})();
