import type { Metadata } from "next";
import { characters, type CharacterKey } from "../../../lib/characters";
import ResultCard from "./ResultCard";

type PageProps = {
  params: Promise<{ key: string }>;
  searchParams: Promise<{ username?: string }>;
};

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { key: rawKey } = await params;
  const { username } = await searchParams;
  const key = (rawKey || "").toLowerCase().trim() as CharacterKey;
  const c = characters[key];
  if (!c) return {};

  const user = username?.replace(/^@/, "").trim().toLowerCase() || "tatsu";
  const ogUrl = `/api/og?username=${encodeURIComponent(user)}&character=${key}`;
  const title = `${user} — ${c.name} | Tatsu Type`;
  const description = `${c.subtitle}: ${c.description}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogUrl, width: 1000, height: 600 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogUrl],
    },
  };
}

export default async function ResultPage({ params, searchParams }: PageProps) {
  const { key: rawKey } = await params;
  const { username } = await searchParams;
  const key = (rawKey || "").toLowerCase().trim() as CharacterKey;

  if (!characters[key]) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="ink-card p-8 text-center">
          <p className="ink-title">Result not found.</p>
          <a href="/" className="ink-btn mt-4 inline-block px-4 py-2.5 text-sm">
            Back to home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <ResultCard characterKey={key} username={username ?? null} />
    </main>
  );
}
