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
    // sadece client'ta bir kere üret → hydration olmaz
    const n = Math.floor(rand(45, 65));
    const colors = ["rgba(124,58,237,0.95)", "rgba(6,182,212,0.95)", "rgba(244,63,94,0.85)"];

    const generated: Dot[] = Array.from({ length: n }).map((_, i) => {
      const color = colors[Math.floor(rand(0, colors.length))];
      return {
        id: i,
        left: rand(0, 100),
        top: rand(0, 100),
        dur: rand(6, 14),
        delay: rand(0, 8),
        size: rand(1.5, 3.2),
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
            boxShadow: `0 0 10px ${d.color}, 0 0 18px ${d.color}`,
            animationDuration: `${d.dur}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}