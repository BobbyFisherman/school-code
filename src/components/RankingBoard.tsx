import { useEffect, useRef, useState } from "react";
import { CATEGORY_META, rankedBy, type Category } from "../data";
import { navigate } from "../hooks/useHashRoute";
import Logo from "./Logo";

const MEDALS = ["🥇", "🥈", "🥉"];

export default function RankingBoard() {
  const [cat, setCat] = useState<Category>("overall");
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const meta = CATEGORY_META.find((c) => c.id === cat)!;
  const list = rankedBy(cat);

  useEffect(() => {
    setAnimate(false);
    const t = window.setTimeout(() => setAnimate(true), 60);
    return () => window.clearTimeout(t);
  }, [cat]);

  return (
    <section ref={sectionRef} id="rankings" className="scroll-mt-24">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-faint">The leaderboards</p>
          <h2 className="mt-1.5 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Best to worst, by discipline
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          All eight are extraordinary — "worst" here just means eighth-best out of eight of the strongest technical
          universities on Earth.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORY_META.map((c) => {
          const active = c.id === cat;
          return (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className="flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-200"
              style={{
                borderColor: active ? c.accent : "rgba(20,22,26,0.10)",
                background: active ? `${c.accent}1a` : "#FFFFFF",
                color: active ? c.accent : "#575D66",
                boxShadow: "none",
              }}
            >
              <span className="text-base leading-none">{c.icon}</span>
              {c.label}
            </button>
          );
        })}
      </div>

      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{meta.blurb}</p>

      <div className="mt-5 space-y-2.5">
        {list.map((s, i) => {
          const width = animate ? `${s.scores[cat]}%` : "0%";
          return (
            <button
              key={s.id}
              onClick={() => navigate(s.id)}
              className="group relative block w-full overflow-hidden rounded-2xl border border-line bg-card p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-paper sm:p-5"
            >
              <div
                className="pointer-events-none absolute inset-y-0 left-0 opacity-[0.10] transition-all duration-700 ease-out group-hover:opacity-[0.2]"
                style={{ width, background: `linear-gradient(90deg, ${s.colors.ink}, transparent)` }}
              />
              <div className="relative flex items-center gap-3 sm:gap-5">
                <div className="flex w-8 shrink-0 flex-col items-center sm:w-10">
                  <span
                    className="text-xl font-extrabold tabular-nums sm:text-2xl"
                    style={{ color: i < 3 ? meta.accent : "#A8ADB5" }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[11px] leading-none">{MEDALS[i] ?? ""}</span>
                </div>

                <Logo id={s.id} className="h-11 w-11 shrink-0 rounded-xl sm:h-12 sm:w-12" />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <h3 className="text-base font-bold tracking-tight text-ink sm:text-lg">{s.short}</h3>
                    <span className="hidden text-[11px] text-faint md:inline">{s.name}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-[12.5px] leading-snug text-muted sm:text-[13px]">
                    {s.rankNotes[cat]}
                  </p>
                  <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-line">
                    <div
                      className="h-full rounded-full transition-all duration-[900ms] ease-out"
                      style={{
                        width,
                        background: `linear-gradient(90deg, ${s.colors.ink}, ${meta.accent})`,
                      }}
                    />
                  </div>
                </div>

                <div className="hidden shrink-0 text-right sm:block">
                  <p className="text-2xl font-extrabold tabular-nums text-ink">{s.scores[cat]}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-faint">score</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-faint">
        Scores are a normalised blend of QS, THE and US News subject tables plus research-output signals (2025–26).
        They are opinionated, not official.
      </p>
    </section>
  );
}
