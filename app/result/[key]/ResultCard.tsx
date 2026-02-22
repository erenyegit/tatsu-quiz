"use client";

import Link from "next/link";
import KimlikKarti from "../../wl/KimlikKarti";
import { characters, type CharacterKey } from "../../../lib/characters";

type Props = {
  characterKey: CharacterKey;
  username: string | null;
};

export default function ResultCard({ characterKey, username }: Props) {
  const c = characters[characterKey] ?? characters.epseo;
  const displayUsername = username?.replace(/^@/, "").trim().toLowerCase() || "tatsu";

  return (
    <div className="w-full max-w-2xl ink-card p-6 sm:p-8 page-enter">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-xl ink-title">Your TATSU identity card</h1>
        <Link href="/" className="ink-btn px-4 py-2.5 text-sm font-medium shrink-0">
          Retake
        </Link>
      </div>

      <KimlikKarti
        twitterUsername={displayUsername}
        character={{ name: c.name, subtitle: c.subtitle }}
        characterKey={characterKey}
        backgroundImage={
          characterKey === "epseo"
            ? "/cards/epseo.png"
            : characterKey === "katsuro"
              ? "/cards/katsuro.png"
              : characterKey === "mesmer"
                ? "/cards/mesmer.png"
                : characterKey === "fushi"
                  ? "/cards/fushi.png"
                  : characterKey === "ukase"
                    ? "/cards/ukase.png"
                    : undefined
        }
        showResetButton={false}
      />

      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <a
          href="https://x.com/tatsu_nyc"
          target="_blank"
          rel="noreferrer"
          className="ink-btn px-4 py-2.5 text-sm font-medium"
        >
          Tatsu on X
        </a>
      </div>
    </div>
  );
}
