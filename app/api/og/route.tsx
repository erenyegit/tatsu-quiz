import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

const CARD_BACKGROUNDS: Record<string, string> = {
  epseo: "/cards/epseo.png",
  katsuro: "/cards/katsuro.png",
  mesmer: "/cards/mesmer.png",
  fushi: "/cards/fushi.png",
  ukase: "/cards/ukase.png",
};

const CHARACTER_SUBTITLES: Record<string, string> = {
  epseo: "DISCIPLINE TYPE",
  katsuro: "AGGRESSION TYPE",
  mesmer: "STRATEGY TYPE",
  ukase: "FREE TYPE",
  fushi: "ENDURANCE TYPE",
};

const OG_W = 1200;
const OG_H = 630;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const username = searchParams.get("username") || "tatsu";
  const character = searchParams.get("character") || "epseo";

  const bgPath = CARD_BACKGROUNDS[character];
  const subtitle = CHARACTER_SUBTITLES[character] || "TATSU TYPE";

  const baseUrl = req.nextUrl.origin;
  const bgUrl = `${baseUrl}${bgPath}`;
  const logoUrl = `${baseUrl}/tatsu-logo.png`;
  const avatarUrl = `${baseUrl}/api/avatar/${encodeURIComponent(username)}`;

  const circle = 88;
  const pad = 32;

  return new ImageResponse(
    (
      <div
        style={{
          width: OG_W,
          height: OG_H,
          display: "flex",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#0a0a0a",
          border: "2px solid rgba(255,255,255,0.15)",
          boxSizing: "border-box",
        }}
      >
        <img
          src={bgUrl}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: OG_W,
            height: OG_H,
            objectFit: "cover",
          }}
        />

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
            src={logoUrl}
            style={{ width: circle, height: circle, objectFit: "cover" }}
          />
        </div>

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
            src={avatarUrl}
            style={{ width: circle, height: circle, objectFit: "cover" }}
          />
        </div>

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
            paddingBottom: 28,
          }}
        >
          <p
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "white",
              margin: 0,
              textShadow: "0 2px 16px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,0.5)",
              letterSpacing: "-0.01em",
            }}
          >
            {username}
          </p>
          <p
            style={{
              fontSize: 22,
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
      width: OG_W,
      height: OG_H,
    }
  );
}
