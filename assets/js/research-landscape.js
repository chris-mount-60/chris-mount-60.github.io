(() => {
  const button = document.getElementById("generate-ridge");
  const layers = [
    { id: "mount", steps: 96, mu: 0.18, baseline: 355, relief: 130 },
    { id: "near", steps: 480, mu: 0.70, baseline: 395, relief: 89 },
    { id: "killed", steps: 480 }
  ];
  const width = 960, height = 400;
  let layer = -1, frame = null, points = [], started = 0;

  function gaussian() {
    return Math.sqrt(-2 * Math.log1p(-Math.random())) * Math.cos(2 * Math.PI * Math.random());
  }

  // With downward drift, first passage has an inverse Gaussian law. Given that time, the
  // pre-hit path is a BES(3) bridge: the radius of a 3D bridge to the origin.
  function killedRidge(steps) {
    const scale = 84;
    const startY = (layers[0].baseline + layers[1].baseline) / 2;
    const x = (height - startY) / scale;
    const downwardDrift = 0.45;
    const mean = x / downwardDrift;
    const q = gaussian() ** 2 / (2 * x * downwardDrift);
    const ratio = 1 / (1 + q + Math.sqrt(q * (2 + q)));
    const hit = Math.random() < 1 / (1 + ratio) ? mean * ratio : mean / ratio;
    const position = [x, 0, 0];
    const ridge = [[0, height - scale * x]];
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      if (t >= hit) {
        ridge.push([width * hit, height]);
        break;
      }
      const remaining = hit - (i - 1) / steps;
      const weight = 1 - 1 / (steps * remaining);
      const sd = Math.sqrt(Math.max(0, weight) / steps);
      for (let j = 0; j < 3; j++) position[j] = weight * position[j] + sd * gaussian();
      ridge.push([width * t, height - scale * Math.hypot(...position)]);
    }
    return ridge.map(([u, y]) => u.toFixed(2) + "," + y.toFixed(2));
  }

  // One physical-time step of sticky reflected BM, with clock t + mu * regulator.
  function step(x, dt, mu) {
    const normal = gaussian();
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
    label(["Draw the nearer sticky Brownian ridge", "Draw the killed Brownian ridge", "Start a new mountain scene"][layer]);
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
      for (const id of ["near-area", "near-ridge", "killed-area", "killed-ridge"]) document.getElementById(id).removeAttribute("d");
    }
    const { steps, mu, baseline, relief } = layers[layer];
    if (layers[layer].id === "killed") {
      points = killedRidge(steps);
    } else {
      const samples = [0];
      for (let i = 1; i <= steps; i++) samples.push(step(samples[i - 1], 1 / steps, mu));
      const peak = Math.max(0.5, ...samples);
      points = samples.map((y, i) => (i * width / steps).toFixed(2) + "," + (baseline - relief * y / peak).toFixed(2));
    }
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return finish();
    draw(0);
    label("Finish drawing this ridge");
    started = performance.now();
    frame = requestAnimationFrame(advance);
  });
})();
