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

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const username = searchParams.get("username") || "tatsu";
  const character = searchParams.get("character") || "epseo";

  const bgPath = CARD_BACKGROUNDS[character];
  const subtitle = CHARACTER_SUBTITLES[character] || "TATSU TYPE";

  const baseUrl = req.nextUrl.origin;
  const bgUrl = `${baseUrl}${bgPath}`;
  const logoUrl = `${baseUrl}/tatsu-logo.png`;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1000,
          height: 600,
          display: "flex",
          position: "relative",
          overflow: "hidden",
          borderRadius: 12,
          backgroundColor: "#0a0a0a",
        }}
      >
        {/* Arka plan */}
        <img
          src={bgUrl}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1000,
            height: 600,
            objectFit: "cover",
          }}
        />

        {/* Sol üst - logo */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            width: 72,
            height: 72,
            borderRadius: "50%",
            overflow: "hidden",
            border: "3px solid rgba(255,255,255,0.25)",
            display: "flex",
          }}
        >
          <img
            src={logoUrl}
            style={{
              width: 72,
              height: 72,
              objectFit: "cover",
            }}
          />
        </div>

        {/* Orta - kullanıcı adı + type */}
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
            transform: "translateY(-20px)",
          }}
        >
          <p
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "white",
              margin: 0,
              textShadow: "0 2px 8px rgba(0,0,0,0.7)",
            }}
          >
            {username}
          </p>
          <p
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.7)",
              marginTop: 8,
              textShadow: "0 1px 4px rgba(0,0,0,0.6)",
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Alt çizgi */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          }}
        />
      </div>
    ),
    {
      width: 1000,
      height: 600,
    }
  );
}
