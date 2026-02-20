export type CharacterKey = "epseo" | "katsuro" | "mesmer" | "ukase" | "fushi";

export const characters: Record<
  CharacterKey,
  {
    key: CharacterKey;
    name: string;
    subtitle: string;
    description: string;
    image: string;
    shareText: string;
  }
> = {
  epseo: {
    key: "epseo",
    name: "EPSEO",
    subtitle: "DISCIPLINE TYPE",
    description: "Calm, precise, and deadly.",
    image: "/characters/epseo.png",
    shareText: "🐉 I got EPSEO — DISCIPLINE TYPE\nCalm, precise, and deadly.",
  },
  katsuro: {
    key: "katsuro",
    name: "KATSURO KENTA",
    subtitle: "AGGRESSION TYPE",
    description: "Fast, explosive, and fearless.",
    image: "/characters/katsuro.png",
    shareText:
      "🐉 I got KATSURO KENTA — AGGRESSION TYPE\nFast, explosive, and fearless.",
  },
  mesmer: {
    key: "mesmer",
    name: "MESMER",
    subtitle: "STRATEGY TYPE",
    description: "Calculated, patient, always ahead.",
    image: "/characters/mesmer.png",
    shareText:
      "🐉 I got MESMER — STRATEGY TYPE\nCalculated, patient, always ahead.",
  },
  ukase: {
    key: "ukase",
    name: "UKASE SORA",
    subtitle: "FREE TYPE",
    description: "Unpredictable, independent, no rules.",
    image: "/characters/ukase.png",
    shareText:
      "🐉 I got UKASE SORA — FREE TYPE\nUnpredictable, independent, no rules.",
  },
  fushi: {
    key: "fushi",
    name: "FUSHI ROY",
    subtitle: "ENDURANCE TYPE",
    description: "Unbreakable will and raw strength.",
    image: "/characters/fushi.png",
    shareText:
      "🐉 I got FUSHI ROY — ENDURANCE TYPE\nUnbreakable will and raw strength.",
  },
};
