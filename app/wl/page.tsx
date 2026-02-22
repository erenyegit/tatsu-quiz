"use client";

import { useState } from "react";
import KimlikKarti from "./KimlikKarti";

export default function WLPage() {
  const [username, setUsername] = useState("");
  const [ submitted, setSubmitted ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = username.replace(/^@/, "").trim().toLowerCase();
    if (!clean) return;
    setLoading(true);
    setSubmitted(true);
    // Simüle: avatar yüklenirken kısa bekleme
    setTimeout(() => setLoading(false), 1200);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-xl ink-card p-8 sm:p-10 page-enter">
        {!submitted ? (
          <>
            <span className="font-display text-sm font-semibold tracking-wide ink-title opacity-90">
              TATSU WL
            </span>
            <h1 className="mt-6 font-display text-xl sm:text-2xl font-bold leading-tight ink-title">
              Create your identity card
            </h1>
            <p className="mt-3 text-sm opacity-70">
              Enter your X (Twitter) username, get your Tatsu identity card and share it.
            </p>
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="@username"
                  className="flex-1 px-4 py-3 bg-[var(--ink-gray-1)] border-2 border-[var(--ink-border-strong)] rounded text-[var(--ink-white)] placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  required
                />
                <button type="submit" className="ink-btn px-6 py-3 font-semibold whitespace-nowrap">
                  Create
                </button>
              </div>
            </form>
          </>
        ) : loading ? (
          <div className="py-16 text-center">
            <div className="inline-block w-10 h-10 border-2 border-[var(--ink-border-strong)] border-t-[var(--ink-white)] rounded-full animate-spin" />
            <p className="mt-6 font-display text-lg ink-title">
              Your Tatsu identity card is being created…
            </p>
            <p className="mt-2 text-sm opacity-70">Please wait</p>
          </div>
        ) : (
          <KimlikKarti
            twitterUsername={username.replace(/^@/, "").trim().toLowerCase()}
            onReset={() => {
              setSubmitted(false);
              setUsername("");
            }}
          />
        )}
        <div className="mt-8 flex flex-col gap-2">
          <a href="/" className="text-sm text-white/60 hover:text-white/90 underline underline-offset-2">
            Tatsu Type Quiz →
          </a>
          <p className="text-[11px] opacity-50">
            Unofficial community tool. Not affiliated with Tatsu.
          </p>
        </div>
      </div>
    </main>
  );
}
