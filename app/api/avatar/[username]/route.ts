import { NextRequest, NextResponse } from "next/server";

const SOURCES = [
  (u: string) => `https://unavatar.io/twitter/${u}`,
  (u: string) => `https://unavatar.io/twitter/${u}?fallback=false`,
  (u: string) => `https://getavatar.vercel.app/twitter/${u}`,
];

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const clean = username?.replace(/^@/, "").trim().toLowerCase();
  if (!clean) {
    return NextResponse.json({ error: "Username required" }, { status: 400 });
  }

  for (const getUrl of SOURCES) {
    try {
      const res = await fetch(getUrl(clean), {
        headers: { "User-Agent": "TatsuWL/1.0" },
        redirect: "follow",
      });
      if (res.ok) {
        const blob = await res.blob();
        const contentType = res.headers.get("content-type") || "image/png";
        return new NextResponse(blob, {
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=86400",
          },
        });
      }
    } catch {
      continue;
    }
  }

  // Fallback: DiceBear identicon (username-based placeholder)
  const fallback = `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(clean)}`;
  const res = await fetch(fallback);
  const blob = await res.blob();
  return new NextResponse(blob, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
      "X-Avatar-Fallback": "1",
    },
  });
}
