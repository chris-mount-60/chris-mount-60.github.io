(() => {
  const landscape = document.getElementById("generate-ridge");
  const sunset = document.getElementById("mount-sunset");
  const ridge = document.getElementById("mount-ridge");
  const area = document.getElementById("mount-area");
  const sunsets = sunset.dataset.sunsets.split("|");
  sunset.src = sunsets[Math.floor(Math.random() * sunsets.length)];

  const width = 960, height = 400, steps = 960, duration = 6000;
  let points = [], started = 0, frame = null;

  function sampleRidge() {
    let brownian = 0, peak = 0;
    const samples = [[0, 0]];
    for (let i = 1; i <= steps; i++) {
      const normal = Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());
      const next = brownian + normal / Math.sqrt(steps);
      if (brownian * next < 0) {
        const crossing = i - 1 + brownian / (brownian - next);
        samples.push([width * crossing / steps, 0]);
      }
      samples.push([width * i / steps, Math.abs(next)]);
      peak = Math.max(peak, Math.abs(next));
      brownian = next;
    }
    return samples.map(([x, y]) => [x, height - 0.21 * height * y / (peak || 1)]);
  }

  function draw(fraction) {
    const commands = [];
    let lastX = 0;
    for (const [x, y] of points) {
      if (x > fraction * width) break;
      commands.push((commands.length ? "L" : "M") + x.toFixed(2) + "," + y.toFixed(2));
      lastX = x;
    }
    const line = commands.join(" ");
    ridge.setAttribute("d", line);
    area.setAttribute("d", line + " L" + lastX + "," + height + " L0," + height + " Z");
  }

  function advance(now) {
    const progress = Math.min(1, (now - started) / duration);
    draw(progress);
    frame = progress < 1 ? requestAnimationFrame(advance) : null;
  }

  landscape.addEventListener("click", () => {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    points = sampleRidge();
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw(1);
      return;
    }
    draw(0);
    started = performance.now();
    frame = requestAnimationFrame(advance);
  });
})();
