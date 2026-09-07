import { SCHOOLS, CATEGORY_META, rankedBy, byTier } from "../data";
import { navigate, scrollToSection } from "../hooks/useHashRoute";
import AdmissionOdds from "../components/AdmissionOdds";
import CompareCharts from "../components/CompareCharts";
import Logo from "../components/Logo";
import RankingBoard from "../components/RankingBoard";
import SchoolCard from "../components/SchoolCard";
import WorldMap from "../components/WorldMap";

export default function Home() {
  const avgAcceptance = (SCHOOLS.reduce((a, s) => a + s.acceptanceRate, 0) / SCHOOLS.length).toFixed(1);
  const countries = new Set(SCHOOLS.map((s) => s.location.country)).size;
  const likely = byTier("likely").length + byTier("target").length;

  return (
    <div className="pb-24">
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden border-b border-line bg-card">
        <div className="absolute inset-x-0 top-0 flex h-1.5">
          {SCHOOLS.map((s) => (
            <span key={s.id} className="flex-1" style={{ background: s.colors.primary }} />
          ))}
        </div>
        <div className="relative mx-auto max-w-[1400px] px-4 py-16 lg:px-8 lg:py-24">
          <div className="inline-flex items-center gap-2 border-b border-ink pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink">
            2025–26 admissions &amp; tuition data
          </div>

          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {SCHOOLS.length} schools.
            <br />
            <span className="italic text-muted">Ranked, mapped and reality-checked.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Your original eight plus ten more of the best technical universities on Earth — from UIUC in your own state
            to Cambridge, ETH Zürich and Waterloo. Ranked for technology, physics, astronomy and overall prestige, and
            sorted by how likely you actually are to get in from Vernon Hills, Illinois.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => scrollToSection("odds")}
              className="rounded-lg bg-ink px-5 py-3 text-sm font-bold text-paper transition-colors hover:bg-muted"
            >
              🎯 My chances
            </button>
            <button
              onClick={() => scrollToSection("rankings")}
              className="rounded-lg border border-ink/25 bg-card px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-ink"
            >
              See the rankings
            </button>
            <button
              onClick={() => scrollToSection("map")}
              className="rounded-lg border border-ink/25 bg-card px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-ink"
            >
              World map
            </button>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            <HeroStat value={String(SCHOOLS.length)} label="Dream schools" sub={`across ${countries} countries`} />
            <HeroStat value={`${avgAcceptance}%`} label="Average acceptance rate" sub="from 3.6% at Harvard to 75% at Rose-Hulman" />
            <HeroStat value={String(likely)} label="Realistic targets" sub="likely + target tiers" />
            <HeroStat value="$1,850" label="Cheapest tuition" sub="ETH Zürich — same fee for internationals" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] space-y-20 px-4 pt-16 lg:px-8 lg:pt-20">
        {/* ---------------- ADMISSION ODDS ---------------- */}
        <AdmissionOdds />

        {/* ---------------- PODIUM SNAPSHOT ---------------- */}
        <section>
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-faint">Quick verdict</p>
            <h2 className="mt-1.5 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Who wins what
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {CATEGORY_META.map((c) => {
              const podium = rankedBy(c.id).slice(0, 3);
              return (
                <div
                  key={c.id}
                  className="relative overflow-hidden rounded-2xl border border-line bg-card p-5"
                >
                  <div
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ background: c.accent }}
                  />
                  <div className="relative flex items-center gap-2">
                    <span className="text-lg">{c.icon}</span>
                    <h3 className="text-sm font-bold uppercase tracking-[0.12em]" style={{ color: c.accent }}>
                      {c.short}
                    </h3>
                  </div>
                  <div className="relative mt-4 space-y-2.5">
                    {podium.map((s, i) => (
                      <button
                        key={s.id}
                        onClick={() => navigate(s.id)}
                        className="flex w-full items-center gap-2.5 rounded-lg px-1.5 py-1 transition-colors hover:bg-paper"
                      >
                        <span className="w-4 text-left text-xs font-extrabold text-faint">{i + 1}</span>
                        <Logo id={s.id} className="h-7 w-7 rounded-lg" />
                        <span className="flex-1 text-left text-[13px] font-semibold text-ink">{s.short}</span>
                        <span className="text-[12px] font-bold tabular-nums text-faint">{s.scores[c.id]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------------- SCHOOL GRID ---------------- */}
        <section id="schools" className="scroll-mt-24">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-faint">The shortlist</p>
              <h2 className="mt-1.5 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Every school</h2>
            </div>
            <p className="max-w-sm text-sm text-muted">
              Sorted by overall strength. Click any card for the full page: mascot, culture, traditions, acceptance,
              tuition, campus map, travel time from home and what the school is actually great at.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {SCHOOLS.map((s) => (
              <SchoolCard key={s.id} school={s} />
            ))}
          </div>
        </section>

        {/* ---------------- RANKINGS ---------------- */}
        <RankingBoard />

        {/* ---------------- COMPARE ---------------- */}
        <CompareCharts />

        {/* ---------------- WORLD MAP ---------------- */}
        <WorldMap />

        {/* ---------------- METHOD ---------------- */}
        <section className="rounded-2xl border border-line bg-card p-6 sm:p-8">
          <h2 className="text-xl font-bold tracking-tight text-ink">How to read all of this</h2>
          <div className="mt-4 grid gap-5 text-sm leading-relaxed text-muted md:grid-cols-2 xl:grid-cols-4">
            <p>
              <span className="font-semibold text-ink">Scores are relative.</span> Every school here is
              world-class. A 64 doesn't mean weak — it means last out of {SCHOOLS.length} of the strongest technical
              universities on the planet.
            </p>
            <p>
              <span className="font-semibold text-ink">Sources blended.</span> QS and THE subject tables, US News
              rankings, research output and facility access — national labs, observatories, fabs and telescope time.
            </p>
            <p>
              <span className="font-semibold text-ink">Odds are estimates.</span> "Your chances" assume a strong
              Illinois STEM applicant and factor in residency, major selectivity and non-resident caps. They are
              directional, not promises.
            </p>
            <p>
              <span className="font-semibold text-ink">Fit beats rank.</span> UIUC in-state, Purdue's frozen
              tuition, ETH's $1,850 fee and Waterloo's co-op can each beat a higher-ranked name depending on what you
              want out of four years.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function HeroStat({ value, label, sub }: { value: string; label: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-line bg-card p-4 backdrop-blur-sm sm:p-5">
      <p className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{value}</p>
      <p className="mt-1 text-[12px] font-semibold text-ink">{label}</p>
      <p className="mt-0.5 text-[11px] text-faint">{sub}</p>
    </div>
  );
}
