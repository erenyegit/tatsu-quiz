import Image from "next/image";
import ShareButton from "./ShareButton";
import { characters, type CharacterKey } from "../../../lib/characters";

export default async function ResultPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key: rawKey } = await params;
  const key = (rawKey || "").toLowerCase().trim() as CharacterKey;

  const c = characters[key] ?? characters.epseo;

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 text-white">
      <div className="w-full max-w-2xl neon-card p-6 sm:p-8 page-enter">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold neon-title">{c.name}</h1>
            <p className="mt-1 text-white/80">{c.subtitle}</p>
            <p className="mt-3 text-sm text-white/75 leading-relaxed">{c.description}</p>
          </div>

          <a
            href="/"
            className="neon-btn rounded-xl px-4 py-2.5 text-sm font-medium shrink-0"
          >
            Retake
          </a>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-xl">
          <Image
            src={c.image}
            alt={c.name}
            width={1200}
            height={800}
            className="w-full h-auto"
            priority
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <ShareButton characterKey={c.key} />
          <a
            href="https://x.com/tatsu_nyc"
            target="_blank"
            rel="noreferrer"
            className="neon-btn rounded-xl px-4 py-2.5 text-sm font-medium"
          >
            Tatsu on X
          </a>
        </div>
      </div>
    </main>
  );
}
