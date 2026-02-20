import type { Metadata } from "next";
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
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}