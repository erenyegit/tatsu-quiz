import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import InkBackground from "./InkBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
    : process.env.NEXT_PUBLIC_APP_URL
      ? new URL(process.env.NEXT_PUBLIC_APP_URL)
      : new URL("https://tatsu-quiz.vercel.app"),
  title: "Tatsu Type Quiz",
  description: "Find your Tatsu type and share it on X",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased scanlines grain`}
      >
        {/* mürekkep arka plan + toz bulutları */}
        <InkBackground />
        <Link
          href="/"
          className="fixed top-4 left-4 z-20 block w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white/20 hover:border-white/40 transition-colors shrink-0"
        >
          <Image
            src="/tatsu-logo.png"
            alt="TATSU"
            width={120}
            height={120}
            className="w-full h-full object-cover"
            unoptimized
          />
        </Link>
        <div className="relative z-10">{children}</div>
        <div className="fixed top-4 right-4 z-20 flex items-center gap-3">
          <a
            href="https://x.com/tatsu_nyc"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 hover:border-white/30 transition-all"
            aria-label="X (Twitter)"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white/80">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://discord.gg/HYaZFP4jBf"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 hover:border-white/30 transition-all"
            aria-label="Discord"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white/80">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          </a>
        </div>
        <footer className="fixed bottom-4 left-0 right-0 z-20 text-center">
          <a
            href="https://x.com/holosko_eth"
            target="_blank"
            rel="noreferrer"
            className="text-xs sm:text-sm text-white/50 hover:text-white/90 transition-colors tracking-wide"
          >
            built by <span className="font-semibold">@holosko_eth</span>
          </a>
        </footer>
      </body>
    </html>
  );
}