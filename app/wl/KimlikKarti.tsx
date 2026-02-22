"use client";

import { useRef, useState, useCallback } from "react";
import { toPng } from "html-to-image";

export type CharacterInfo = { name: string; subtitle: string };

type Props = {
  twitterUsername: string;
  character?: CharacterInfo;
  characterKey?: string;
  backgroundImage?: string;
  onReset?: () => void;
  showResetButton?: boolean;
};

const AVATAR_URL = (username: string) => `/api/avatar/${encodeURIComponent(username)}`;

function waitForImages(el: HTMLElement): Promise<void> {
  const imgs = Array.from(el.querySelectorAll("img"));
  const pending = imgs
    .filter((img) => !img.complete)
    .map(
      (img) =>
        new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        })
    );
  return Promise.all(pending).then(() => undefined);
}

export default function KimlikKarti({
  twitterUsername,
  character,
  characterKey,
  backgroundImage,
  onReset,
  showResetButton = true,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    const el = cardRef.current;
    if (!el || downloading) return;
    setDownloading(true);
    try {
      await document.fonts.ready;
      await waitForImages(el);

      const centerDiv = el.querySelector("[data-center]") as HTMLElement | null;
      const origTransform = centerDiv?.style.transform ?? "";
      if (centerDiv) centerDiv.style.transform = "none";

      const w = el.offsetWidth;
      const h = el.offsetHeight;

      const dataUrl = await toPng(el, {
        backgroundColor: "#0a0a0a",
        width: w,
        height: h,
        pixelRatio: 3,
        style: {
          margin: "0",
          transform: "none",
        },
      });

      if (centerDiv) centerDiv.style.transform = origTransform;

      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `tatsu-${twitterUsername}.png`;
      a.click();
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setDownloading(false);
    }
  }, [downloading, twitterUsername]);

  const handleShareOnX = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const resultUrl = characterKey
      ? `${origin}/result/${characterKey}?username=${encodeURIComponent(twitterUsername)}`
      : "";
    const text = character
      ? `🐉 My Tatsu type: ${character.name} — ${character.subtitle}\n\n@tatsu_nyc`
      : `🐉 My Tatsu WL identity card is ready!\n\n@tatsu_nyc`;
    const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(resultUrl)}`;
    window.open(intent, "_blank", "noopener,noreferrer");
  };

  const cardStyle = {
    ...(backgroundImage
      ? {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : {
          background: "linear-gradient(145deg, #0f0f0f 0%, #1a1a1a 50%, #0a0a0a 100%)",
        }),
    border: "2px solid rgba(255,255,255,0.15)",
    boxShadow: "0 0 0 1px rgba(0,0,0,0.5) inset, 0 8px 24px -8px rgba(0,0,0,0.6)",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg ink-title">Your identity card</h2>
        {showResetButton && onReset && (
          <button onClick={onReset} className="ink-btn px-3 py-2 text-sm">
            New card
          </button>
        )}
      </div>

      <div
        id="identity-card"
        ref={cardRef}
        className="relative w-full aspect-[5/3] max-w-md mx-auto rounded-lg overflow-hidden bg-[#0a0a0a]"
        style={cardStyle}
      >
        <div className="absolute top-4 right-4 z-10">
          <img
            src={AVATAR_URL(twitterUsername)}
            alt={`@${twitterUsername}`}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-white/25 object-cover ring-2 ring-black/30"
          />
        </div>
        <div className="absolute top-4 left-4 z-10">
          <img
            src="/tatsu-logo.png"
            alt="TATSU"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-white/25 object-cover ring-2 ring-black/30"
          />
        </div>
        <div
          data-center
          className="absolute inset-0 flex flex-col items-center justify-center gap-1"
          style={{ transform: "translateY(-16px)" }}
        >
          <p className="font-display text-xl sm:text-2xl font-bold text-white">
            {twitterUsername}
          </p>
          {character && (
            <p className="text-sm text-white/70 mt-1">{character.subtitle}</p>
          )}
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }}
        />
      </div>

      {downloading && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          aria-live="polite"
        >
          <p className="text-white font-medium">Preparing download…</p>
        </div>
      )}

      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="ink-btn px-5 py-2.5 text-sm font-medium disabled:opacity-50"
        >
          Download
        </button>
        <button onClick={handleShareOnX} className="ink-btn px-5 py-2.5 text-sm font-medium">
          Share on X
        </button>
      </div>
    </div>
  );
}
