"use client";

import { useEffect, useState } from "react";

type Dot = {
  id: number;
  left: number;
  top: number;
  dur: number;
  delay: number;
  size: number;
  opacity: number;
};

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function InkDustParticles() {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    const n = Math.floor(rand(120, 165));
    const generated: Dot[] = Array.from({ length: n }).map((_, i) => ({
      id: i,
      left: rand(0, 100),
      top: rand(0, 100),
      dur: rand(8, 16),
      delay: rand(0, 2.5),
      size: rand(1.5, 3.5),
      opacity: rand(0.45, 0.95),
    }));
    setDots(generated);
  }, []);

  if (dots.length === 0) return null;

  return (
    <div className="ink-dust-layer" aria-hidden>
      {dots.map((d) => (
        <span
          key={d.id}
          className="ink-dust-particle"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            opacity: d.opacity,
            animationDuration: `${d.dur}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
