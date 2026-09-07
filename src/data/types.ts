export type Category = "tech" | "physics" | "astronomy" | "overall";

/** How likely YOU are to get in, from Vernon Hills, Illinois. */
export type Tier = "ultra" | "reach" | "target" | "likely";

export type School = {
  id: string;
  name: string;
  short: string;
  monogram: string;
  nickname: string;
  motto: string;
  tagline: string;
  location: {
    city: string;
    region: string;
    country: string;
    address: string;
    lat: number;
    lon: number;
  };
  founded: number;
  type: string;
  students: string;
  undergrads: string;
  acceptanceRate: number;
  acceptanceNote: string;
  tuition: { label: string; value: string; note?: string }[];
  tuitionCompareUSD: number;
  tuitionCompareLabel: string;
  colors: {
    primary: string;
    secondary: string;
    onDark: string;
    ink?: string;
    glowA: string;
    glowB: string;
  };
  focus: string[];
  about: string[];
  knownFor: { title: string; text: string }[];
  notableAlumni: string[];
  scores: Record<Category, number>;
  rankNotes: Record<Category, string>;
  website: string;
};

/** Differentiators + personalised admission odds layered on top of every school. */
export type Extra = {
  mascot: { name: string; emoji: string; note: string };
  tier: Tier;
  /** Rough personal admit-chance estimate for a strong Illinois STEM applicant, 0–100. */
  chance: number;
  odds: string;
  setting: string;
  vibe: string;
  tradition: string;
  ratio: string;
  salary: string;
  testPolicy: string;
  apply: string;
  travel: string;
  weather: string;
};

export type FullSchool = School &
  Extra & {
    colors: School["colors"] & {
      ink: string;
      /** Dark brand colour that owns the school page background. */
      deep: string;
      /** Brand accent legible on top of `deep`. */
      onDeepAccent: string;
      /** Pale brand tint for section surfaces. */
      wash: string;
    };
  };

export const CATEGORY_META: {
  id: Category;
  label: string;
  short: string;
  icon: string;
  blurb: string;
  accent: string;
}[] = [
  {
    id: "overall",
    label: "Overall Prestige",
    short: "Overall",
    icon: "★",
    blurb:
      "A blend of global reputation, research output, selectivity and graduate outcomes — roughly what QS, THE and US News agree on.",
    accent: "#2E3A46",
  },
  {
    id: "tech",
    label: "Technology & Engineering",
    short: "Technology",
    icon: "⚙",
    blurb:
      "Computer science, AI, electrical, mechanical and aerospace engineering — the departments that build things.",
    accent: "#1F5F5B",
  },
  {
    id: "physics",
    label: "Physics",
    short: "Physics",
    icon: "⚛",
    blurb:
      "Theoretical and experimental physics: faculty strength, national-lab access, Nobel lineage and PhD output.",
    accent: "#7A3B5E",
  },
  {
    id: "astronomy",
    label: "Astronomy & Astrophysics",
    short: "Astronomy",
    icon: "🔭",
    blurb:
      "Observatory access, space missions, cosmology groups and planetary science — who actually looks at the sky.",
    accent: "#A66A21",
  },
];

export const TIER_META: Record<
  Tier,
  { label: string; short: string; accent: string; icon: string; blurb: string }
> = {
  ultra: {
    label: "Ultra Reach",
    short: "Ultra",
    accent: "#9B2C2C",
    icon: "🌋",
    blurb:
      "Sub-5% admit rates. Nobody is a strong candidate here — perfect students get rejected every single year. Apply, but treat any acceptance as a lottery win.",
  },
  reach: {
    label: "Reach",
    short: "Reach",
    accent: "#B06A16",
    icon: "⛰️",
    blurb:
      "Roughly 7–15% admit rates. A genuinely outstanding application makes you competitive rather than lucky, but the odds still say no.",
  },
  target: {
    label: "Expected / Target",
    short: "Target",
    accent: "#1F5F5B",
    icon: "🎯",
    blurb:
      "Where a strong Illinois STEM applicant realistically lands. Admit rates roughly 17–40%, or in-state advantage working in your favour.",
  },
  likely: {
    label: "Likely / Safety-ish",
    short: "Likely",
    accent: "#2F6B45",
    icon: "🛟",
    blurb:
      "The most probable admits on your list. Note: none of these are true safeties for competitive engineering or CS majors — see the gap warning below.",
  },
};

export const TIER_ORDER: Tier[] = ["likely", "target", "reach", "ultra"];

/** Home base — used for distance and travel context. */
export const HOME_BASE = {
  label: "Vernon Hills, Illinois",
  lat: 42.2422,
  lon: -87.9803,
};
