import { useEffect, useRef } from "react";
import "./ScrollVideoBackground.css";

export default function ScrollVideoBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Scroll tracking
    let targetScrollProgress = 0;
    let currentScrollProgress = 0;

    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      targetScrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // 3D Particles & Light Waves for Cinematic Scroll Video
    const particleCount = 45;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 800 + 200,
        baseX: (Math.random() - 0.5) * 1200,
        baseY: (Math.random() - 0.5) * 1200,
        baseZ: Math.random() * 1000,
        size: Math.random() * 2.2 + 0.8,
        speed: Math.random() * 0.4 + 0.2,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.008;

      // Smooth scroll lerp (creates smooth camera scrub like scrubbing a video)
      currentScrollProgress +=
        (targetScrollProgress - currentScrollProgress) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Deep dark base
      const bgGrad = ctx.createRadialGradient(
        width * 0.7,
        height * 0.35,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.85
      );
      bgGrad.addColorStop(0, "rgba(16, 185, 129, 0.08)");
      bgGrad.addColorStop(0.4, "rgba(8, 12, 10, 0.85)");
      bgGrad.addColorStop(1, "rgba(6, 9, 8, 1)");

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Cinematic Ambient Light Ribbons (scroll-driven wave video)
      const waveCount = 3;
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        const waveOffset = w * 1.8 + currentScrollProgress * 8 + time * 1.2;
        const waveY = height * (0.3 + w * 0.2) + Math.sin(waveOffset) * 60;

        ctx.moveTo(0, waveY);
        for (let x = 0; x <= width; x += 30) {
          const progressMultiplier = currentScrollProgress * 4;
          const y =
            waveY +
            Math.sin(x * 0.003 + waveOffset + progressMultiplier) * 70 +
            Math.cos(x * 0.002 - time + w) * 35;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle =
          w === 0
            ? "rgba(16, 185, 129, 0.06)"
            : w === 1
            ? "rgba(52, 211, 153, 0.04)"
            : "rgba(20, 184, 166, 0.03)";
        ctx.lineWidth = 140;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // 3D Particles that zoom & travel as you scroll (video scrub depth)
      const fov = 450;
      const scrollTravel = currentScrollProgress * 1200;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let pz = (p.baseZ - scrollTravel - time * 40) % 1000;
        if (pz < 10) pz += 1000;

        const scale = fov / (fov + pz);
        const px = width * 0.5 + (p.baseX + Math.sin(time + i) * 30) * scale;
        const py = height * 0.5 + (p.baseY + Math.cos(time + i) * 30) * scale;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const alpha = (1 - pz / 1000) * p.opacity;
          ctx.beginPath();
          ctx.arc(px, py, p.size * scale * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="scroll-video-background"
      aria-hidden="true"
    />
  );
}

