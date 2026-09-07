import { rankOf, TIER_META, type FullSchool as School } from "../data";
import { navigate } from "../hooks/useHashRoute";
import Logo from "./Logo";

export default function SchoolCard({ school }: { school: School }) {
  const overall = rankOf(school.id, "overall");

  return (
    <button
      onClick={() => navigate(school.id)}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card text-left transition-all duration-300 hover:-translate-y-1 hover:border-ink/25"
      style={{ boxShadow: "0 0 0 0 transparent" }}
    >
      <div
        className="relative h-24 w-full overflow-hidden"
        style={{
          background: `linear-gradient(120deg, ${school.colors.primary} 0%, ${school.colors.secondary} 100%)`,
        }}
      >
        <span className="absolute -right-3 -top-5 select-none text-[86px] font-extrabold leading-none text-white/25">
          {school.monogram}
        </span>
        <span className="absolute left-4 top-4 rounded-full bg-paper px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink backdrop-blur-sm">
          #{overall} overall
        </span>
        <span
          className="absolute right-3 top-4 rounded-full px-2.5 py-1 text-[10px] font-bold backdrop-blur-sm"
          style={{ background: "rgba(255,255,255,.88)", color: TIER_META[school.tier].accent }}
        >
          {TIER_META[school.tier].icon} {TIER_META[school.tier].short}
        </span>
        
      </div>

      <div className="relative -mt-7 flex flex-1 flex-col px-5 pb-5">
        <Logo id={school.id} className="h-14 w-14 rounded-2xl shadow-lg shadow-ink/20 ring-1 ring-ink/10" />

        <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink">{school.short}</h3>
        <p className="text-[12px] leading-snug text-faint">{school.name}</p>

        <p className="mt-2.5 flex items-center gap-1.5 text-[12px] text-muted">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {school.location.city}, {school.location.region === school.location.country ? "" : school.location.region}
        </p>

        <p className="mt-2.5 flex items-center gap-1.5 text-[12px] text-muted">
          <span className="text-sm leading-none">{school.mascot.emoji}</span>
          <span className="truncate">{school.mascot.name}</span>
        </p>

        <p className="mt-2.5 line-clamp-2 text-[13px] leading-relaxed text-muted">{school.tagline}</p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Stat label="Acceptance" value={`${school.acceptanceRate}%`} color={school.colors.ink} />
          <Stat label="Tuition / yr" value={school.tuitionCompareLabel} color={school.colors.ink} />
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {school.focus.slice(0, 3).map((f) => (
            <span
              key={f}
              className="rounded-md border px-2 py-0.5 text-[10.5px] font-semibold"
              style={{
                borderColor: `${school.colors.ink}33`,
                color: `${school.colors.ink}`,
                background: `${school.colors.ink}12`,
              }}
            >
              {f}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-1.5 pt-4 text-[12px] font-semibold text-muted transition-colors group-hover:text-ink">
          Open school page
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${school.colors.primary}33` }}
      />
    </button>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-lg border border-line bg-paper px-2.5 py-1.5">
      <p className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-faint">{label}</p>
      <p className="text-[13px] font-bold tabular-nums" style={{ color }}>
        {value}
      </p>
    </div>
  );
}
