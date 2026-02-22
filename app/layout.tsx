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
  metadataBase: process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : process.env.NEXT_PUBLIC_APP_URL
      ? new URL(process.env.NEXT_PUBLIC_APP_URL)
      : undefined,
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
      </body>
    </html>
  );
}