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
  const avatarUrl = `${baseUrl}/api/avatar/${encodeURIComponent(username)}`;

  const circleSize = 80;
  const padding = 32;

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
          border: "2px solid rgba(255,255,255,0.15)",
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

        {/* Sol üst - TATSU logo */}
        <div
          style={{
            position: "absolute",
            top: padding,
            left: padding,
            width: circleSize,
            height: circleSize,
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid rgba(255,255,255,0.25)",
            display: "flex",
            boxShadow: "0 0 0 2px rgba(0,0,0,0.3)",
          }}
        >
          <img
            src={logoUrl}
            style={{ width: circleSize, height: circleSize, objectFit: "cover" }}
          />
        </div>

        {/* Sağ üst - profil fotoğrafı */}
        <div
          style={{
            position: "absolute",
            top: padding,
            right: padding,
            width: circleSize,
            height: circleSize,
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid rgba(255,255,255,0.25)",
            display: "flex",
            boxShadow: "0 0 0 2px rgba(0,0,0,0.3)",
          }}
        >
          <img
            src={avatarUrl}
            style={{ width: circleSize, height: circleSize, objectFit: "cover" }}
          />
        </div>

        {/* Orta - kullanıcı adı + type (sitedeki gibi) */}
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
            transform: "translateY(-24px)",
          }}
        >
          <p
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "white",
              margin: 0,
              textShadow: "0 2px 12px rgba(0,0,0,0.8)",
            }}
          >
            {username}
          </p>
          <p
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,0.75)",
              marginTop: 10,
              textShadow: "0 1px 6px rgba(0,0,0,0.6)",
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
