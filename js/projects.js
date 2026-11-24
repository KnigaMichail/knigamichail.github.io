(() => {
  "use strict";

  const canvas = document.getElementById("gravity-grid");
  if (!canvas) return;

  const context = canvas.getContext("2d", { alpha: true });
  if (!context) return;

  const spacing = 52;
  const warpStrength = 0.72;
  let width = 0;
  let height = 0;
  let dpr = 1;

  function warpPoint(x, y, centerX, centerY, radius) {
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.hypot(dx, dy);
    const influence = Math.exp(-(distance * distance) / (2 * radius * radius));
    const factor = 1 + warpStrength * influence;
    return {
      x: centerX + dx * factor,
      y: centerY + dy * factor
    };
  }

  function drawGridLine(points, color) {
    if (!points.length) return;
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (let index = 1; index < points.length; index += 1) {
      context.lineTo(points[index].x, points[index].y);
    }
    context.strokeStyle = color;
    context.lineWidth = 0.8;
    context.stroke();
  }

  function render() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);

    const centerX = width * 0.5;
    const centerY = height * 0.54;
    const radius = Math.min(Math.max(width * 0.23, 170), 330);
    const samples = Math.max(8, Math.ceil(Math.max(width, height) / 9));
    const gridColor = "rgba(180, 214, 139, 0.16)";

    for (let x = -spacing; x <= width + spacing; x += spacing) {
      const points = [];
      for (let index = 0; index <= samples; index += 1) {
        const y = (height / samples) * index;
        points.push(warpPoint(x, y, centerX, centerY, radius));
      }
      drawGridLine(points, gridColor);
    }

    for (let y = -spacing; y <= height + spacing; y += spacing) {
      const points = [];
      for (let index = 0; index <= samples; index += 1) {
        const x = (width / samples) * index;
        points.push(warpPoint(x, y, centerX, centerY, radius));
      }
      drawGridLine(points, gridColor);
    }
  }

  let resizeFrame = 0;
  window.addEventListener("resize", () => {
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(render);
  }, { passive: true });

  render();
})();