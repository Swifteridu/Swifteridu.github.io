(() => {
  "use strict";

  const app = window.Portfolio;

  function initCanvas() {
    const canvas = app.$("#ambient");
    const context = canvas && canvas.getContext ? canvas.getContext("2d") : null;
    if (!context) return;

    const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const particles = [];
    const count = Math.min(44, Math.max(24, Math.round(window.innerWidth / 34)));
    const pointer = { x: -1000, y: -1000 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let active = false;

    for (let i = 0; i < count; i += 1) {
      particles.push({ x: Math.random(), y: Math.random(), drift: (Math.random() - 0.5) * 0.00012, size: 0.5 + Math.random() * 1.15 });
    }

    function draw(animate) {
      context.clearRect(0, 0, width, height);
      const points = particles.map((particle) => {
        if (animate && !reducedMotion) particle.y = (particle.y + particle.drift + 1.0001) % 1;
        return { x: particle.x * width, y: particle.y * height, size: particle.size };
      });

      points.forEach((point, index) => {
        const dx = point.x - pointer.x;
        const dy = point.y - pointer.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        context.fillStyle = distance < 190 ? "rgba(116, 70, 220, 0.32)" : "rgba(116, 70, 220, 0.12)";
        context.beginPath();
        context.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        context.fill();

        if (distance < 155) {
          context.strokeStyle = "rgba(237, 107, 157, " + (0.11 * (1 - distance / 155)) + ")";
          context.lineWidth = 0.7;
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(pointer.x, pointer.y);
          context.stroke();
        }

        if (index % 2 === 0 && points[index + 1]) {
          const next = points[index + 1];
          const gapX = point.x - next.x;
          const gapY = point.y - next.y;
          const gap = Math.sqrt(gapX * gapX + gapY * gapY);
          if (gap < 115) {
            context.strokeStyle = "rgba(116, 70, 220, " + (0.035 * (1 - gap / 115)) + ")";
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(next.x, next.y);
            context.stroke();
          }
        }
      });
    }

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(false);
    }

    function animate() {
      if (!active || document.hidden) return;
      draw(true);
      frame = window.requestAnimationFrame(animate);
    }

    function start() {
      if (reducedMotion || document.hidden || active) return;
      active = true;
      frame = window.requestAnimationFrame(animate);
    }

    function stop() {
      active = false;
      if (frame) window.cancelAnimationFrame(frame);
    }

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    }, { passive: true });
    document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
    resize();
    start();
  }

  function observeSections() {
    if (!("IntersectionObserver" in window) || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    const targets = app.$$(".content-section, .contact-section, .hero-art");
    targets.forEach((target) => target.classList.add("will-reveal"));
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach((target) => observer.observe(target));
  }

  app.effects = { init() { initCanvas(); observeSections(); } };
})();
