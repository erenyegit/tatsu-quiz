"use client";

import { useEffect, useState } from "react";

type Dot = {
  id: number;
  left: number;
  top: number;
  dur: number;
  delay: number;
  size: number;
  color: string;
};

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function Particles() {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    const n = Math.floor(rand(55, 85));
    const colors = [
      "rgba(168, 85, 247, 0.9)",
      "rgba(34, 211, 238, 0.85)",
      "rgba(244, 114, 182, 0.8)",
      "rgba(192, 132, 252, 0.75)",
    ];

    const generated: Dot[] = Array.from({ length: n }).map((_, i) => {
      const color = colors[Math.floor(rand(0, colors.length))];
      return {
        id: i,
        left: rand(0, 100),
        top: rand(0, 100),
        dur: rand(8, 18),
        delay: rand(0, 12),
        size: rand(1.8, 4),
        color,
      };
    });

    setDots(generated);
  }, []);

  // ilk SSR render’da boş dön (hydration safe)
  if (dots.length === 0) return null;

  return (
    <div className="particles">
      {dots.map((d) => (
        <span
          key={d.id}
          className="particle"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            background: d.color,
            color: d.color,
            boxShadow: `0 0 ${d.size * 3}px ${d.color}, 0 0 ${d.size * 5}px ${d.color}`,
            animationDuration: `${d.dur}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}