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

  function pick(optionKey: ChoiceKey) {
    const next = [...answers];
    next[step] = optionKey;
    setAnswers(next);

    if (step < questions.length - 1) {
      setStep(step + 1);
      return;
    }

    const result = computeResult(next);
    router.push(`/result/${result}`);
  }

  function back() {
    if (step === 0) return;
    setStep(step - 1);
  }

  function reset() {
    setStep(0);
    setAnswers([]);
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 text-white">
      <div className="w-full max-w-xl neon-card p-6 sm:p-8 page-enter">
        {/* Üst: logo + progress */}
        <div className="flex items-center justify-between gap-4">
          <span className="font-display text-sm font-semibold tracking-wide text-white/90">
            TATSU TYPE
          </span>
          <span className="text-xs font-medium tabular-nums text-white/60">
            {progressLabel}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-3 progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Soru */}
        <h1 className="mt-8 font-display text-xl sm:text-2xl font-bold leading-tight neon-title">
          {current.title}
        </h1>

        {/* Seçenekler */}
        <div className="mt-6 grid gap-3">
          {current.options.map((opt, i) => (
            <button
              key={opt.key}
              onClick={() => pick(opt.key)}
              className="option-item neon-btn flex items-center gap-4 px-4 py-3.5 text-left rounded-2xl"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="option-badge">{opt.key}</span>
              <span className="text-sm font-medium text-white/95">
                {opt.label}
              </span>
            </button>
          ))}
        </div>

        {/* Alt: Back + Restart */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={back}
            className="neon-btn rounded-xl px-4 py-2.5 text-sm font-medium disabled:opacity-40 disabled:pointer-events-none"
            disabled={step === 0}
          >
            Back
          </button>
          <button
            onClick={reset}
            className="ml-auto neon-btn rounded-xl px-4 py-2.5 text-sm font-medium"
          >
            Restart
          </button>
        </div>

        <p className="mt-6 text-[11px] text-white/50">
          Unofficial community tool. Not affiliated with Tatsu.
        </p>
      </div>
    </main>
  );
}
