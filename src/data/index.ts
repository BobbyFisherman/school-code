import { CORE_SCHOOLS } from "./schools";
import { MORE_SCHOOLS } from "./moreSchools";
import { EXTRAS } from "./extras";
import type { Category, FullSchool, Tier } from "./types";

export * from "./types";

/** Darken a brand colour until it is legible as text/accent on the paper background. */
const readable = (hex: string) => {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  const lum = () => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  let guard = 0;
  while (lum() > 0.40 && guard++ < 20) {
    r = Math.round(r * 0.84);
    g = Math.round(g * 0.84);
    b = Math.round(b * 0.84);
  }
  const h = (n: number) => n.toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`;
};

const parse = (hex: string) => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
];
const toHex = (r: number, g: number, b: number) =>
  `#${[r, g, b].map((n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0")).join("")}`;
const luminance = (hex: string) => {
  const [r, g, b] = parse(hex);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
};
const darkenTo = (hex: string, target: number) => {
  let [r, g, b] = parse(hex);
  let guard = 0;
  while ((0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > target && guard++ < 40) {
    r *= 0.9;
    g *= 0.9;
    b *= 0.9;
  }
  return toHex(r, g, b);
};
const mixWhite = (hex: string, amount: number) => {
  const [r, g, b] = parse(hex);
  return toHex(r + (255 - r) * amount, g + (255 - g) * amount, b + (255 - b) * amount);
};

/**
 * The colour that owns each school's page. Prefer the primary brand colour when it is
 * dark enough to carry white text; otherwise fall back to the school's dark secondary
 * (Purdue black, Michigan navy, Georgia Tech navy...) so the pairing stays authentic.
 */
const deepOf = (primary: string, secondary: string) => {
  const base =
    luminance(primary) <= 0.26
      ? primary
      : luminance(secondary) <= 0.3
        ? secondary
        : primary;
  // Always clamp so white text clears AA on the hero.
  return darkenTo(base, 0.19);
};

const srgb = (hex: string) =>
  parse(hex)
    .map((v) => v / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
const relLum = (hex: string) => {
  const [r, g, b] = srgb(hex);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: string, b: string) => {
  const [hi, lo] = [relLum(a), relLum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/** Keep mixing the brand colour with white until it is clearly legible on `deep`. */
const accentOn = (deep: string, primary: string) => {
  let accent = primary;
  let amount = 0;
  while (contrast(deep, accent) < 4.6 && amount < 0.92) {
    amount += 0.08;
    accent = mixWhite(primary, amount);
  }
  return accent;
};

const merge = (): FullSchool[] =>
  [...CORE_SCHOOLS, ...MORE_SCHOOLS].map((s) => {
    const deep = deepOf(s.colors.primary, s.colors.secondary);
    return {
      ...s,
      ...EXTRAS[s.id],
      colors: {
        ...s.colors,
        ink: readable(s.colors.primary),
        deep,
        /** Bright brand accent guaranteed legible on top of `deep`. */
        onDeepAccent: accentOn(deep, s.colors.primary),
        /** Very light tint of the brand colour, for section backgrounds on paper. */
        wash: mixWhite(s.colors.primary, 0.9),
      },
    };
  });

/** Every school, ordered by overall score (best first). */
export const SCHOOLS: FullSchool[] = merge().sort((a, b) => b.scores.overall - a.scores.overall);

export const getSchool = (id: string) => SCHOOLS.find((s) => s.id === id);

export const rankedBy = (category: Category) =>
  [...SCHOOLS].sort((a, b) => b.scores[category] - a.scores[category]);

export const rankOf = (id: string, category: Category) =>
  rankedBy(category).findIndex((s) => s.id === id) + 1;

/** Schools grouped by how likely you are to be admitted, easiest first. */
export const byTier = (tier: Tier) =>
  SCHOOLS.filter((s) => s.tier === tier).sort((a, b) => b.chance - a.chance);

export const SCHOOL_IDS = SCHOOLS.map((s) => s.id);

/** Great-circle distance in miles, used for the "how far from home" stat. */
export const milesFrom = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 3958.8;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(a)));
};
