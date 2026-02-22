import { characters, type CharacterKey } from "../../../lib/characters";
import ResultCard from "./ResultCard";

export default async function ResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ key: string }>;
  searchParams: Promise<{ username?: string }>;
}) {
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
