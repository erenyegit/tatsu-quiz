"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";

export type CharacterInfo = { name: string; subtitle: string };

type Props = {
  twitterUsername: string;
  character?: CharacterInfo;
  backgroundImage?: string;
  onReset?: () => void;
  showResetButton?: boolean;
};

const AVATAR_URL = (username: string) => `/api/avatar/${encodeURIComponent(username)}`;

const CARD_WIDTH = 1000;
const CARD_HEIGHT = 600;

export default function KimlikKarti({
  twitterUsername,
  character,
  backgroundImage,
  onReset,
  showResetButton = true,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    const el = cardRef.current;
    if (!el || downloading) return;
    setDownloading(true);
    const orig = {
      width: el.style.width,
      height: el.style.height,
      maxWidth: el.style.maxWidth,
    };
    try {
      el.style.width = "1000px";
      el.style.height = "600px";
      el.style.minWidth = "1000px";
      el.style.minHeight = "600px";
      el.style.maxWidth = "none";
      await new Promise((r) => setTimeout(r, 200));
      const dataUrl = await toPng(el, {
        backgroundColor: "#0a0a0a",
        width: 1000,
        height: 600,
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `tatsu-kimlik-${twitterUsername}.png`;
      a.click();
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      el.style.width = orig.width;
      el.style.height = orig.height;
      el.style.minWidth = "";
      el.style.minHeight = "";
      el.style.maxWidth = orig.maxWidth;
      setDownloading(false);
    }
  };

  const shareText = character
    ? `🐉 My Tatsu type: ${character.name} — ${character.subtitle}\n\n@${twitterUsername}\n\n@tatsu_nyc`
    : `🐉 My Tatsu WL identity card is ready!\n\n@${twitterUsername}\n\n@tatsu_nyc`;

  const handleShareOnX = () => {
    const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
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

  const cardInner = (
    <>
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
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 -translate-y-4">
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
    </>
  );

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
        ref={cardRef}
        className="relative w-full aspect-[5/3] max-w-md mx-auto rounded-lg overflow-hidden bg-[#0a0a0a]"
        style={cardStyle}
      >
        {cardInner}
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
