import { SCHOOLS } from "../data";
import { navigate } from "../hooks/useHashRoute";
import Logo from "./Logo";

export default function CompareCharts() {
  const byAcceptance = [...SCHOOLS].sort((a, b) => a.acceptanceRate - b.acceptanceRate);
  const byTuition = [...SCHOOLS].sort((a, b) => a.tuitionCompareUSD - b.tuitionCompareUSD);
  const maxTuition = Math.max(...SCHOOLS.map((s) => s.tuitionCompareUSD));

  return (
    <section id="compare" className="scroll-mt-24">
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-faint">Head to head</p>
        <h2 className="mt-1.5 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Selectivity vs. price</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-card p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-ink">Hardest to get into</h3>
          <p className="mt-1 text-xs text-faint">Overall undergraduate acceptance rate — lower is harder.</p>
          <div className="mt-5 space-y-3">
            {byAcceptance.map((s) => (
              <button key={s.id} onClick={() => navigate(s.id)} className="group flex w-full items-center gap-3">
                <Logo id={s.id} className="h-7 w-7 shrink-0 rounded-lg" />
                <span className="w-24 shrink-0 text-left text-[12.5px] font-semibold text-ink group-hover:text-ink">
                  {s.short}
                </span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.max(3, (s.acceptanceRate / 50) * 100)}%`,
                      background: `linear-gradient(90deg, ${s.colors.ink}, ${s.colors.ink}55)`,
                    }}
                  />
                </div>
                <span className="w-14 shrink-0 text-right text-[12.5px] font-bold tabular-nums text-ink">
                  {s.acceptanceRate}%
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-card p-5">
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-ink">Annual tuition (USD)</h3>
          <p className="mt-1 text-xs text-faint">
            Sticker tuition for an international / out-of-state student, before financial aid.
          </p>
          <div className="mt-5 space-y-3">
            {byTuition.map((s) => (
              <button key={s.id} onClick={() => navigate(s.id)} className="group flex w-full items-center gap-3">
                <Logo id={s.id} className="h-7 w-7 shrink-0 rounded-lg" />
                <span className="w-24 shrink-0 text-left text-[12.5px] font-semibold text-ink group-hover:text-ink">
                  {s.short}
                </span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(s.tuitionCompareUSD / maxTuition) * 100}%`,
                      background: `linear-gradient(90deg, ${s.colors.ink}, ${s.colors.ink}55)`,
                    }}
                  />
                </div>
                <span className="w-20 shrink-0 text-right text-[12px] font-bold tabular-nums text-ink">
                  ${(s.tuitionCompareUSD / 1000).toFixed(1)}k
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-[10.5px] uppercase tracking-[0.14em] text-faint">
              <th className="px-5 py-3 font-semibold">School</th>
              <th className="px-3 py-3 font-semibold">Location</th>
              <th className="px-3 py-3 font-semibold">Founded</th>
              <th className="px-3 py-3 font-semibold">Students</th>
              <th className="px-3 py-3 font-semibold">Accept.</th>
              <th className="px-3 py-3 font-semibold">Tuition</th>
              <th className="px-5 py-3 font-semibold">Known for</th>
            </tr>
          </thead>
          <tbody>
            {SCHOOLS.map((s) => (
              <tr
                key={s.id}
                onClick={() => navigate(s.id)}
                className="cursor-pointer border-b border-line transition-colors last:border-0 hover:bg-paper"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <Logo id={s.id} className="h-7 w-7 rounded-lg" />
                    <span className="font-semibold text-ink">{s.short}</span>
                  </div>
                </td>
                <td className="px-3 py-3 text-muted">
                  {s.location.city}, {s.location.country}
                </td>
                <td className="px-3 py-3 tabular-nums text-muted">{s.founded}</td>
                <td className="px-3 py-3 text-muted">{s.students.replace("~", "").replace(" total", "")}</td>
                <td className="px-3 py-3 font-semibold tabular-nums" style={{ color: s.colors.ink }}>
                  {s.acceptanceRate}%
                </td>
                <td className="px-3 py-3 tabular-nums text-ink">{s.tuitionCompareLabel}</td>
                <td className="px-5 py-3 text-muted">{s.focus.slice(0, 2).join(" · ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
