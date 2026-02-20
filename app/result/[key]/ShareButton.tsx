"use client";

import { characters, type CharacterKey } from "../../../lib/characters";

export default function ShareButton({ characterKey }: { characterKey: CharacterKey }) {
  function onShare() {
    const c = characters[characterKey];
    const url = `${window.location.origin}/result/${c.key}`;
    const text = `${c.shareText}\n\nFind yours ↓\n${url}\n\n@tatsu_nyc`;
    const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(intent, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      onClick={onShare}
      className="neon-btn rounded-xl px-4 py-2.5 text-sm font-medium"
    >
      Share on X
    </button>
  );
}
