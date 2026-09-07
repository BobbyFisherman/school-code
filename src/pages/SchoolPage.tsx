import { useEffect, useState } from "react";
import { CATEGORY_META, SCHOOLS, rankOf, HOME_BASE, milesFrom, TIER_META, type FullSchool as School } from "../data";
import { navigate } from "../hooks/useHashRoute";
import CampusMap from "../components/CampusMap";
import Logo from "../components/Logo";

export default function SchoolPage({ school }: { school: School }) {
  const c = school.colors;
  const idx = SCHOOLS.findIndex((s) => s.id === school.id);
  const prev = SCHOOLS[(idx - 1 + SCHOOLS.length) % SCHOOLS.length];
  const next = SCHOOLS[(idx + 1) % SCHOOLS.length];

  return (
    <div
      className="pb-24"
      style={{ background: `linear-gradient(180deg, ${c.wash} 0%, var(--color-paper) 620px)` }}
    >
      {/* ------------- THEMED HERO ------------- */}
      <section className="relative overflow-hidden" style={{ background: c.deep }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `radial-gradient(circle at 82% 22%, ${c.onDeepAccent}44, transparent 55%)`,
          }}
        />
        <span className="pointer-events-none absolute -right-8 top-1/2 hidden -translate-y-1/2 select-none font-display text-[230px] font-semibold leading-none text-white/[0.08] lg:block">
          {school.monogram}
        </span>

        <div className="relative mx-auto max-w-[1400px] px-4 py-12 lg:px-8 lg:py-16">
          <button
            onClick={() => navigate("home")}
            className="mb-8 flex items-center gap-1.5 text-[12px] font-semibold text-white/60 transition-colors hover:text-white"
          >
            ← All schools
          </button>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4">
                <Logo id={school.id} className="h-16 w-16 rounded-2xl ring-1 ring-white/20" />
                <div>
                  <p
                    className="text-[11px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: c.onDeepAccent }}
                  >
                    {school.nickname}
                  </p>
                  <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                    {school.short}
                  </h1>
                </div>
              </div>

              <p className="mt-4 text-[15px] font-medium text-white/75">{school.name}</p>
              <p className="mt-3 font-display text-xl leading-snug text-white sm:text-2xl">{school.tagline}</p>
              <p className="mt-3 text-[13px] italic text-white/55">“{school.motto}”</p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span
                  className="flex items-center gap-2 rounded-lg border px-3 py-2 text-[13px] font-bold text-white"
                  style={{ borderColor: "rgba(255,255,255,.28)", background: "rgba(255,255,255,.10)" }}
                >
                  <span className="text-lg leading-none">{school.mascot.emoji}</span>
                  {school.mascot.name}
                </span>
                <span
                  className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[13px] font-bold text-white"
                  style={{ borderColor: "rgba(255,255,255,.28)", background: "rgba(255,255,255,.10)" }}
                >
                  {TIER_META[school.tier].icon} {TIER_META[school.tier].label}
                </span>
                <span
                  className="rounded-lg border px-3 py-2 text-[13px] font-semibold text-white"
                  style={{ borderColor: "rgba(255,255,255,.28)", background: "rgba(255,255,255,.10)" }}
                >
                  📍 {milesFrom(HOME_BASE.lat, HOME_BASE.lon, school.location.lat, school.location.lon).toLocaleString()} mi from home
                </span>
              </div>
              <p className="mt-2 max-w-xl text-[12px] leading-relaxed text-white/50">{school.mascot.note}</p>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-white/65">
                <span className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {school.location.city}, {school.location.region}, {school.location.country}
                </span>
                <span>Founded {school.founded}</span>
                <span>{school.type}</span>
                <a
                  href={school.website}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
                  style={{ color: c.onDeepAccent }}
                >
                  Official site ↗
                </a>
              </div>
            </div>

            <AcceptanceDial school={school} />
          </div>
        </div>

        {/* brand colour bar: primary + secondary */}
        <div className="relative flex h-2">
          <span className="flex-1" style={{ background: school.colors.primary }} />
          <span className="w-1/3" style={{ background: school.colors.secondary }} />
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] space-y-14 px-4 pt-12 lg:px-8">
        {/* ------------- YOUR ODDS ------------- */}
        <section
          className="rounded-2xl border-l-4 border-y border-r border-line p-5 sm:p-6"
          style={{ borderLeftColor: c.primary, background: c.wash }}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <span className="text-4xl leading-none">{TIER_META[school.tier].icon}</span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: c.ink }}>
                  Your odds from Vernon Hills
                </p>
                <p className="font-display text-2xl font-semibold tracking-tight" style={{ color: c.ink }}>
                  {TIER_META[school.tier].label}
                  <span className="ml-2 text-base font-bold text-muted">≈{school.chance}% for you</span>
                </p>
              </div>
            </div>
            <p className="flex-1 text-[13.5px] leading-relaxed text-muted">{school.odds}</p>
          </div>
        </section>

        {/* ------------- RANK STRIP ------------- */}
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {CATEGORY_META.map((cat) => {
            const r = rankOf(school.id, cat.id);
            return (
              <div
                key={cat.id}
                className="relative overflow-hidden rounded-2xl border border-line bg-card p-4"
                style={{ borderTopColor: c.primary, borderTopWidth: 3 }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-faint">{cat.short}</p>
                    <p className="mt-1 flex items-baseline gap-1.5">
                      <span className="font-display text-3xl font-semibold tracking-tight" style={{ color: c.ink }}>
                        #{r}
                      </span>
                      <span className="text-[11px] font-semibold text-faint">of 8</span>
                    </p>
                  </div>
                  <span className="text-xl opacity-70">{cat.icon}</span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${school.scores[cat.id]}%`,
                      background: c.primary,
                    }}
                  />
                </div>
                <p className="mt-2.5 text-[12px] leading-snug text-muted">{school.rankNotes[cat.id]}</p>
              </div>
            );
          })}
        </section>

        {/* ------------- KEY NUMBERS ------------- */}
        <section className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
          <div className="rounded-2xl border border-line bg-card p-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-ink">Cost of attendance</h2>
            <p className="mt-1 text-xs text-faint">Published 2025–26 figures. Aid can change these dramatically.</p>
            <div className="mt-5 space-y-3">
              {school.tuition.map((t) => (
                <div
                  key={t.label}
                  className="flex flex-wrap items-baseline justify-between gap-2 rounded-xl border border-line px-4 py-3"
                  style={{ background: c.wash }}
                >
                  <div>
                    <p className="text-[13px] font-semibold text-ink">{t.label}</p>
                    {t.note && <p className="text-[11px] text-faint">{t.note}</p>}
                  </div>
                  <p className="text-lg font-extrabold tabular-nums" style={{ color: c.ink }}>
                    {t.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FactBox label="Acceptance rate" value={`${school.acceptanceRate}%`} note={school.acceptanceNote} color={c.ink} />
            <FactBox
              label="Founded"
              value={String(school.founded)}
              note={`${new Date().getFullYear() - school.founded} years of history`}
              color={c.ink}
            />
            <FactBox label="Students" value={school.students.replace("~", "").replace(" total", "")} note={school.undergrads} color={c.ink} />
            <FactBox label="Institution" value={school.location.country} note={school.type} color={c.ink} />
          </div>
        </section>

        {/* ------------- ABOUT ------------- */}
        <section className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: c.ink }}>About the school</p>
            <h2 className="mt-1.5 text-3xl font-bold tracking-tight text-ink">
              What {school.short} is actually about
            </h2>
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted">
              {school.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: c.ink }}>Focus areas</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {school.focus.map((f) => (
                  <span
                    key={f}
                    className="rounded-lg border px-3 py-1.5 text-[12.5px] font-semibold"
                    style={{ borderColor: "transparent", color: "#fff", background: c.primary }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: c.ink }}>Signature strengths</p>
            {school.knownFor.map((k) => (
              <div
                key={k.title}
                className="rounded-xl border border-line bg-card p-4"
                style={{ borderLeftColor: c.primary, borderLeftWidth: 3 }}
              >
                <p className="text-[13.5px] font-bold" style={{ color: c.ink }}>
                  {k.title}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">{k.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------- DIFFERENTIATORS ------------- */}
        <section>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: c.ink }}>The stuff rankings miss</p>
          <h2 className="mb-5 mt-1.5 text-3xl font-bold tracking-tight text-ink">
            What it's actually like
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <DiffCard icon="🏛️" label="Setting" text={school.setting} color={c.ink} />
            <DiffCard icon="🎭" label="Culture & vibe" text={school.vibe} color={c.ink} />
            <DiffCard icon="🎉" label="Signature tradition" text={school.tradition} color={c.ink} />
            <DiffCard icon={school.mascot.emoji} label="Mascot" text={`${school.mascot.name} — ${school.mascot.note}`} color={c.ink} />
            <DiffCard icon="🌡️" label="Weather vs. home" text={school.weather} color={c.ink} />
            <DiffCard icon="✈️" label="Getting there" text={school.travel} color={c.ink} />
            <DiffCard icon="👥" label="Class size" text={school.ratio} color={c.ink} />
            <DiffCard icon="💵" label="Early-career pay" text={school.salary} color={c.ink} />
            <DiffCard icon="📝" label="How you apply" text={`${school.apply} · ${school.testPolicy}`} color={c.ink} />
          </div>
        </section>

        {/* ------------- MAP ------------- */}
        <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: c.ink }}>On the map</p>
            <h2 className="mb-4 mt-1.5 text-3xl font-bold tracking-tight text-ink">{school.location.city}</h2>
            <CampusMap school={school} height={400} />
          </div>

          <div className="flex flex-col gap-3 lg:pt-[86px]">
            <div className="rounded-2xl border border-line bg-card p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: c.ink }}>Notable alumni & names</p>
              <ul className="mt-3 space-y-2">
                {school.notableAlumni.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-[13.5px] text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: c.ink }} />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="overflow-hidden rounded-2xl border border-line bg-card"
            >
              <div className="flex h-16">
                <span className="flex-1" style={{ background: c.primary }} />
                <span className="flex-1" style={{ background: c.secondary }} />
                <span className="flex-1" style={{ background: c.deep }} />
              </div>
              <div className="p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: c.ink }}>Colours</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {[c.primary, c.secondary].map((col) => (
                  <span key={col} className="font-mono text-[11px] uppercase text-muted">
                    {col}
                  </span>
                ))}
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------- PREV / NEXT ------------- */}
        <section className="grid gap-3 sm:grid-cols-2">
          <NavCard school={prev} dir="prev" />
          <NavCard school={next} dir="next" />
        </section>
      </div>
    </div>
  );
}

function DiffCard({
  icon,
  label,
  text,
  color,
}: {
  icon: string;
  label: string;
  text: string;
  color: string;
}) {
  return (
    <div
      className="rounded-xl border border-line bg-card p-4 transition-colors hover:border-ink/25"
      style={{ borderTopColor: color, borderTopWidth: 3 }}
    >
      <div className="flex items-center gap-2">
        <span className="text-base leading-none">{icon}</span>
        <p className="text-[10.5px] font-bold uppercase tracking-[0.14em]" style={{ color }}>
          {label}
        </p>
      </div>
      <p className="mt-2 text-[13px] leading-relaxed text-muted">{text}</p>
    </div>
  );
}

function FactBox({
  label,
  value,
  note,
  color,
}: {
  label: string;
  value: string;
  note: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-card p-4">
      <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-faint">{label}</p>
      <p className="mt-1.5 text-xl font-extrabold tracking-tight" style={{ color }}>
        {value}
      </p>
      <p className="mt-1 text-[11.5px] leading-snug text-faint">{note}</p>
    </div>
  );
}

function AcceptanceDial({ school }: { school: School }) {
  const [progress, setProgress] = useState(0);
  const pct = school.acceptanceRate;
  const r = 52;
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    setProgress(0);
    const t = window.setTimeout(() => setProgress(pct), 120);
    return () => window.clearTimeout(t);
  }, [pct, school.id]);

  return (
    <div
      className="flex items-center gap-5 rounded-2xl border p-5"
      style={{ borderColor: "rgba(255,255,255,.22)", background: "rgba(255,255,255,.08)" }}
    >
      <div className="relative h-32 w-32 shrink-0">
        <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
          <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="10" />
          <circle
            cx="64"
            cy="64"
            r={r}
            fill="none"
            stroke={school.colors.onDeepAccent}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={circ - (progress / 100) * circ}
            style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.22,1,.36,1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold text-white">{pct}%</span>
          <span className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-white/55">accepted</span>
        </div>
      </div>
      <div className="max-w-[190px]">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">Admissions</p>
        <p className="mt-1.5 text-[13px] leading-snug text-white/80">{school.acceptanceNote}</p>
        <p className="mt-2 text-[12px] font-semibold" style={{ color: school.colors.onDeepAccent }}>
          ≈ {Math.round(100 / pct)} applicants per seat
        </p>
      </div>
    </div>
  );
}

function NavCard({ school, dir }: { school: School; dir: "prev" | "next" }) {
  return (
    <button
      onClick={() => navigate(school.id)}
      style={{ borderBottomColor: school.colors.primary, borderBottomWidth: 3 }}
      className={`group flex items-center gap-4 rounded-2xl border border-line bg-card p-4 transition-all hover:border-ink/30 hover:bg-paper ${
        dir === "next" ? "sm:flex-row-reverse sm:text-right" : ""
      }`}
    >
      <Logo id={school.id} className="h-11 w-11 shrink-0 rounded-xl" />
      <div className="min-w-0 flex-1">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-faint">
          {dir === "prev" ? "← Previous" : "Next →"}
        </p>
        <p className="truncate text-[15px] font-bold text-ink">{school.short}</p>
        <p className="truncate text-[12px] text-faint">{school.tagline}</p>
      </div>
    </button>
  );
}
