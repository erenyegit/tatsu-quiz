import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

const BACKGROUNDS: Record<string, string> = {
  epseo: "/cards/epseo.png",
  katsuro: "/cards/katsuro.png",
  mesmer: "/cards/mesmer.png",
  fushi: "/cards/fushi.png",
  ukase: "/cards/ukase.png",
};

const SUBTITLES: Record<string, string> = {
  epseo: "DISCIPLINE TYPE",
  katsuro: "AGGRESSION TYPE",
  mesmer: "STRATEGY TYPE",
  ukase: "FREE TYPE",
  fushi: "ENDURANCE TYPE",
};

const W = 1200;
const H = 630;

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunk = 4096;
  for (let i = 0; i < bytes.length; i += chunk) {
    const slice = bytes.subarray(i, Math.min(i + chunk, bytes.length));
    binary += String.fromCharCode.apply(null, Array.from(slice));
  }
  return btoa(binary);
}

async function fetchAsDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const ct = res.headers.get("content-type") || "image/png";
    return `data:${ct};base64,${arrayBufferToBase64(buf)}`;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const username = sp.get("username") || "tatsu";
  const character = sp.get("character") || "epseo";

  const baseUrl = req.nextUrl.origin;
  const bgPath = BACKGROUNDS[character] || BACKGROUNDS.epseo;
  const subtitle = SUBTITLES[character] || "TATSU TYPE";

  const [bgSrc, logoSrc, avatarSrc] = await Promise.all([
    fetchAsDataUrl(`${baseUrl}${bgPath}`),
    fetchAsDataUrl(`${baseUrl}/tatsu-logo.png`),
    fetchAsDataUrl(
      `${baseUrl}/api/avatar/${encodeURIComponent(username)}`
    ),
  ]);

  const circle = 80;
  const pad = 28;

  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          display: "flex",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#0a0a0a",
          border: "2px solid rgba(255,255,255,0.15)",
        }}
      >
        {bgSrc && (
          <img
            src={bgSrc}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: W,
              height: H,
              objectFit: "cover",
            }}
          />
        )}

        {logoSrc && (
          <div
            style={{
              position: "absolute",
              top: pad,
              left: pad,
              width: circle,
              height: circle,
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid rgba(255,255,255,0.25)",
              display: "flex",
              boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            <img
              src={logoSrc}
              style={{ width: circle, height: circle, objectFit: "cover" }}
            />
          </div>
        )}

        {avatarSrc && (
          <div
            style={{
              position: "absolute",
              top: pad,
              right: pad,
              width: circle,
              height: circle,
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid rgba(255,255,255,0.25)",
              display: "flex",
              boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            <img
              src={avatarSrc}
              style={{ width: circle, height: circle, objectFit: "cover" }}
            />
          </div>
        )}

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 24,
          }}
        >
          <p
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "white",
              margin: 0,
              textShadow:
                "0 2px 16px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,0.5)",
              letterSpacing: "-0.01em",
            }}
          >
            {username}
          </p>
          <p
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.75)",
              marginTop: 10,
              textShadow: "0 1px 8px rgba(0,0,0,0.7)",
              letterSpacing: "0.05em",
            }}
          >
            {subtitle}
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
          }}
        />
      </div>
    ),
    {
      width: W,
      height: H,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    }
  );
}
