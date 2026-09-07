import { byTier, TIER_META, TIER_ORDER } from "../data";
import { navigate } from "../hooks/useHashRoute";
import Logo from "./Logo";

export default function AdmissionOdds() {
  return (
    <section id="odds" className="scroll-mt-24">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-faint">
            Built for Vernon Hills, Illinois
          </p>
          <h2 className="mt-1.5 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Your odds, sorted honestly
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-muted">
          Ordered from most likely to least likely. Illinois residency is factored in — it helps enormously at UIUC and
          counts against you at Georgia Tech, Michigan and Berkeley.
        </p>
      </div>

      <div className="space-y-5">
        {TIER_ORDER.map((tier) => {
          const meta = TIER_META[tier];
          const list = byTier(tier);
          return (
            <div
              key={tier}
              className="overflow-hidden rounded-2xl border bg-card"
              style={{ borderColor: `${meta.accent}33` }}
            >
              <div
                className="flex flex-wrap items-center gap-3 border-b px-5 py-4"
                style={{
                  borderColor: `${meta.accent}22`,
                  background: `linear-gradient(90deg, ${meta.accent}18, transparent 70%)`,
                }}
              >
                <span className="text-2xl leading-none">{meta.icon}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-extrabold tracking-tight" style={{ color: meta.accent }}>
                    {meta.label}
                  </h3>
                  <p className="mt-0.5 max-w-3xl text-[12.5px] leading-snug text-muted">{meta.blurb}</p>
                </div>
                <span
                  className="rounded-lg px-2.5 py-1 text-[12px] font-bold"
                  style={{ background: `${meta.accent}1f`, color: meta.accent }}
                >
                  {list.length} school{list.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="divide-y divide-line">
                {list.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => navigate(s.id)}
                    className="group flex w-full items-start gap-3.5 px-4 py-3.5 text-left transition-colors hover:bg-paper sm:px-5"
                  >
                    <Logo id={s.id} className="mt-0.5 h-10 w-10 shrink-0 rounded-xl" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                        <span className="text-[15px] font-bold text-ink">{s.short}</span>
                        <span className="text-[11px] text-faint">
                          {s.location.city}, {s.location.country}
                        </span>
                        <span
                          className="rounded-md px-1.5 py-0.5 text-[10.5px] font-bold"
                          style={{ background: `${s.colors.ink}1f`, color: s.colors.ink }}
                        >
                          {s.acceptanceRate}% admit rate
                        </span>
                      </div>
                      <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{s.odds}</p>
                    </div>

                    <div className="hidden w-28 shrink-0 sm:block">
                      <div className="flex items-baseline justify-end gap-1">
                        <span className="text-lg font-extrabold tabular-nums" style={{ color: meta.accent }}>
                          {s.chance}%
                        </span>
                      </div>
                      <p className="text-right text-[9.5px] font-semibold uppercase tracking-[0.1em] text-faint">
                        your est. odds
                      </p>
                      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-line">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${s.chance}%`, background: meta.accent }}
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
