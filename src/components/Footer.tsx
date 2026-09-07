import { SCHOOLS } from "../data";
import { navigate } from "../hooks/useHashRoute";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-card">
      <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-xl font-semibold tracking-tight text-ink">Dream Schools</p>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">
              A personal shortlist of {SCHOOLS.length} of the strongest technical universities in the world, compared on
              selectivity, cost, location, culture and academic strength in technology, physics and astronomy — and
              sorted by real admission odds for a student in Vernon Hills, Illinois.
            </p>
            <p className="mt-4 text-[11px] leading-relaxed text-faint">
              Figures reflect published 2025–26 data and are approximate. Rankings and admission-odds estimates are
              opinionated interpretations, not official predictions — verify every deadline, test policy and fee on the
              university's own admissions site before you rely on it. Logos and mascot references are original
              geometric marks and descriptions in each school's official colours, not official trademarks.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {SCHOOLS.map((s) => (
              <button
                key={s.id}
                onClick={() => navigate(s.id)}
                className="group flex items-center gap-2 text-left"
              >
                <Logo id={s.id} className="h-6 w-6 rounded-md" />
                <span className="text-[13px] font-medium text-muted transition-colors group-hover:text-ink">
                  {s.short}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-[11.5px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>Built for a very specific college list. Maps © OpenStreetMap contributors, tiles © CARTO.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-left transition-colors hover:text-ink"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
