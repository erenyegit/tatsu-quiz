"use client";

import { useEffect, useState } from "react";

/* Kara kalem tarzı ninja – ince çizgi, anime silüet */
function NinjaSketch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 180"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Kafa */}
      <ellipse cx="60" cy="28" rx="14" ry="16" opacity={0.9} />
      {/* Mask / bandana */}
      <path d="M46 22 Q60 18 74 22 L74 32 Q60 36 46 32 Z" opacity={0.7} />
      {/* Gövde */}
      <path d="M52 48 L48 95 Q55 100 60 98 Q65 100 72 95 L68 48 Z" opacity={0.85} />
      {/* Kol – kılıç */}
      <path d="M72 55 L95 45 L98 48 L75 58 Z" opacity={0.8} />
      <line x1="60" y1="62" x2="92" y2="52" opacity={0.75} />
      {/* Diğer kol */}
      <path d="M48 55 L48 75 M52 58 L45 80" opacity={0.7} />
      {/* Bacaklar – koşu */}
      <path d="M52 95 L48 155 M68 95 L72 152 M48 155 L42 175 M72 152 L78 172" opacity={0.85} />
      {/* Kılıç detay */}
      <line x1="98" y1="48" x2="102" y2="38" opacity={0.6} />
    </svg>
  );
}

/* Crouching ninja */
function NinjaCrouch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="50" cy="22" rx="12" ry="14" opacity={0.9} />
      <path d="M38 20 Q50 16 62 20 L62 28 Q50 32 38 28 Z" opacity={0.7} />
      <path d="M42 38 L38 62 Q50 68 62 62 L58 38 Z" opacity={0.85} />
      <path d="M58 42 L75 55 L72 58 L55 45 Z" opacity={0.75} />
      <path d="M38 62 L30 88 M62 62 L70 88 M30 88 L28 98 M70 88 L72 96" opacity={0.85} />
    </svg>
  );
}

/* Jumping / leaping ninja */
function NinjaLeap({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 140"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="50" cy="24" rx="11" ry="13" opacity={0.9} />
      <path d="M39 20 Q50 15 61 20 L61 26 Q50 30 39 26 Z" opacity={0.7} />
      <path d="M44 40 L40 75 Q50 82 60 75 L56 40 Z" opacity={0.85} />
      <path d="M60 48 L82 35 L84 38 L62 52 Z" opacity={0.8} />
      <path d="M40 48 L25 58 L27 61 L42 51 Z" opacity={0.7} />
      <path d="M40 75 L35 115 M60 75 L65 112 M35 115 L32 128 M65 112 L68 125" opacity={0.85} />
    </svg>
  );
}

type NinjaItem = {
  id: number;
  left: number;
  top: number;
  size: number;
  variant: "sketch" | "crouch" | "leap";
  duration: number;
  delay: number;
  direction: "ltr" | "rtl" | "up" | "down" | "diag";
};

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function NinjaBackground() {
  const [ninjas, setNinjas] = useState<NinjaItem[]>([]);

  useEffect(() => {
    const variants: Array<"sketch" | "crouch" | "leap"> = ["sketch", "crouch", "leap"];
    const directions: Array<"ltr" | "rtl" | "up" | "down" | "diag"> = ["ltr", "rtl", "up", "down", "diag"];
    const items: NinjaItem[] = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: rand(0, 92),
      top: rand(0, 85),
      size: rand(80, 200),
      variant: variants[i % variants.length],
      duration: rand(25, 45),
      delay: rand(0, 20),
      direction: directions[i % directions.length],
    }));
    setNinjas(items);
  }, []);

  if (ninjas.length === 0) return null;

  return (
    <div className="ninja-bg" aria-hidden>
      {ninjas.map((n) => (
        <div
          key={n.id}
          className="ninja-figure"
          style={{
            left: `${n.left}%`,
            top: `${n.top}%`,
            width: n.size,
            height: n.variant === "sketch" ? n.size * 1.5 : n.variant === "leap" ? n.size * 1.4 : n.size,
            animationDuration: `${n.duration}s`,
            animationDelay: `${n.delay}s`,
            animationName: `ninja-${n.direction}`,
          }}
        >
          {n.variant === "sketch" && <NinjaSketch className="w-full h-full" />}
          {n.variant === "crouch" && <NinjaCrouch className="w-full h-full" />}
          {n.variant === "leap" && <NinjaLeap className="w-full h-full" />}
        </div>
      ))}
    </div>
  );
}
