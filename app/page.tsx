"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { CharacterKey } from "../lib/characters";

type ChoiceKey = "A" | "B" | "C" | "D" | "E";

type Option = { label: string; key: ChoiceKey };
type Question = { title: string; options: Option[] };

const questions: Question[] = [
  {
    title: "When facing a strong opponent, how do you act?",
    options: [
      { key: "A", label: "Stay calm and observe first" },
      { key: "B", label: "Attack instantly without hesitation" },
      { key: "C", label: "Analyze weaknesses and plan" },
      { key: "D", label: "Do it your own way, no rules" },
      { key: "E", label: "Endure and overpower them" },
    ],
  },
  {
    title: "What matters most in battle?",
    options: [
      { key: "A", label: "Precision and discipline" },
      { key: "B", label: "Speed and aggression" },
      { key: "C", label: "Strategy and control" },
      { key: "D", label: "Freedom and instinct" },
      { key: "E", label: "Strength and endurance" },
    ],
  },
  {
    title: "What defines your inner power?",
    options: [
      { key: "A", label: "Balance" },
      { key: "B", label: "Chaos" },
      { key: "C", label: "Intelligence" },
      { key: "D", label: "Independence" },
      { key: "E", label: "Determination" },
    ],
  },
];

const mapLetterToCharacter: Record<ChoiceKey, CharacterKey> = {
  A: "epseo",
  B: "katsuro",
  C: "mesmer",
  D: "ukase",
  E: "fushi",
};

function computeResult(answers: ChoiceKey[]): CharacterKey {
  const counts: Record<ChoiceKey, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  for (const a of answers) counts[a]++;

  let best: ChoiceKey = answers[answers.length - 1] ?? "A";
  for (const k of Object.keys(counts) as ChoiceKey[]) {
    if (counts[k] > counts[best]) best = k;
  }
  return mapLetterToCharacter[best];
}

export default function HomePage() {
  const router = useRouter();
  const [twitterUsername, setTwitterUsername] = useState("");
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<ChoiceKey[]>([]);

  const current = questions[step];
  const progressPercent = useMemo(
    () => (100 * (step + 1)) / questions.length,
    [step]
  );
  const progressLabel = useMemo(
    () => `${Math.min(step + 1, questions.length)} / ${questions.length}`,
    [step]
  );

  function startQuiz() {
    setStarted(true);
  }

  function pick(optionKey: ChoiceKey) {
    const next = [...answers];
    next[step] = optionKey;
    setAnswers(next);

    if (step < questions.length - 1) {
      setStep(step + 1);
      return;
    }

    const result = computeResult(next);
    const user = twitterUsername.replace(/^@/, "").trim().toLowerCase();
    router.push(`/result/${result}${user ? `?username=${encodeURIComponent(user)}` : ""}`);
  }

  function back() {
    if (step === 0) return;
    setStep(step - 1);
  }

  function reset() {
    setTwitterUsername("");
    setStarted(false);
    setStep(0);
    setAnswers([]);
  }

  function handleStart(e: React.FormEvent) {
    e.preventDefault();
    const user = twitterUsername.replace(/^@/, "").trim();
    if (!user) return;
    setStarted(true);
  }

  /* Landing – önce kullanıcı adı, sonra quiz */
  if (!started) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-xl ink-card p-8 sm:p-10 page-enter">
          <span className="font-display text-sm font-semibold tracking-wide ink-title opacity-90">
            TATSU TYPE
          </span>
          <h1 className="mt-6 font-display text-xl sm:text-2xl font-bold leading-tight ink-title">
            Discover your TATSU type, get your identity card
          </h1>
          <p className="mt-3 text-sm opacity-70">
            Enter your X (Twitter) username, answer a few questions and create your identity card based on your character type.
          </p>
          <form onSubmit={handleStart} className="mt-8">
            <label className="block text-left text-sm font-medium opacity-80 mb-2">
              Your X username
            </label>
            <input
              type="text"
              value={twitterUsername}
              onChange={(e) => setTwitterUsername(e.target.value)}
              placeholder="@username"
              className="w-full px-4 py-3 bg-[var(--ink-gray-1)] border-2 border-[var(--ink-border-strong)] rounded text-[var(--ink-white)] placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-white/30 mb-6"
              required
            />
            <button
              type="submit"
              className="ink-btn px-8 py-4 text-base font-semibold w-full"
            >
              Start
            </button>
          </form>
          <p className="mt-8 text-[11px] opacity-50">
            Unofficial community tool. Not affiliated with Tatsu.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-xl ink-card p-6 sm:p-8 page-enter">
        <div className="flex items-center justify-between gap-4">
          <span className="font-display text-sm font-semibold tracking-wide ink-title opacity-90">
            TATSU TYPE
          </span>
          <span className="text-xs font-medium tabular-nums opacity-70">
            {progressLabel}
          </span>
        </div>

        <div className="mt-3 progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <h1 className="mt-8 font-display text-xl sm:text-2xl font-bold leading-tight ink-title">
          {current.title}
        </h1>

        <div className="mt-6 grid gap-3">
          {current.options.map((opt, i) => (
            <button
              key={opt.key}
              onClick={() => pick(opt.key)}
              className="option-item ink-btn flex items-center gap-4 px-4 py-3.5 text-left"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="option-badge">{opt.key}</span>
              <span className="text-sm font-medium">
                {opt.label}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={back}
            className="ink-btn px-4 py-2.5 text-sm font-medium disabled:opacity-40 disabled:pointer-events-none"
            disabled={step === 0}
          >
            Back
          </button>
          <button
            onClick={reset}
            className="ml-auto ink-btn px-4 py-2.5 text-sm font-medium"
          >
            Restart
          </button>
        </div>

        <p className="mt-6 text-[11px] opacity-50">
          Unofficial community tool. Not affiliated with Tatsu.
        </p>
      </div>
    </main>
  );
}
