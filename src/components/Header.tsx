import { useEffect, useRef, useState } from "react";
import { SCHOOLS, TIER_META, TIER_ORDER } from "../data";
import { navigate } from "../hooks/useHashRoute";
import Logo from "./Logo";

export default function Header({ route }: { route: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const go = (id: string) => {
    setOpen(false);
    navigate(id);
  };

  return (
    <header className="sticky top-0 z-[999] border-b border-line bg-paper/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1500px] items-center gap-3 px-4 py-3 lg:px-8">
        <button onClick={() => go("home")} className="group flex shrink-0 items-center gap-2.5 text-left">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10 12 5 2 10l10 5 10-5Z" />
              <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
            </svg>
          </span>
          <span className="hidden flex-col leading-none xl:flex">
            <span className="font-display text-[16px] font-semibold tracking-tight text-ink">Dream Schools</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-faint">
              {SCHOOLS.length} campuses · 4 continents
            </span>
          </span>
        </button>

        {/* All-schools dropdown */}
        <div ref={wrapRef} className="relative shrink-0">
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-1.5 rounded-xl border border-line bg-card px-3 py-2 text-[13px] font-semibold text-ink transition-colors hover:border-ink/35 hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
            <span className="hidden sm:inline">All {SCHOOLS.length}</span>
            <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>▾</span>
          </button>

          {open && (
            <div className="absolute left-0 top-full mt-2 w-[min(94vw,880px)] overflow-hidden rounded-2xl border border-line bg-card/98 shadow-2xl shadow-ink/15 backdrop-blur-xl">
              <div className="max-h-[70vh] overflow-y-auto p-4">
                <button
                  onClick={() => go("home")}
                  className="mb-3 flex w-full items-center gap-2 rounded-lg border border-ink/20 bg-paper px-3 py-2.5 text-[13px] font-bold text-ink"
                >
                  ⌂ Home — rankings, odds & world map
                </button>
                {TIER_ORDER.map((t) => {
                  const meta = TIER_META[t];
                  const list = SCHOOLS.filter((s) => s.tier === t).sort((a, b) => b.chance - a.chance);
                  if (!list.length) return null;
                  return (
                    <div key={t} className="mb-3 last:mb-0">
                      <p
                        className="mb-1.5 px-1 text-[10.5px] font-bold uppercase tracking-[0.16em]"
                        style={{ color: meta.accent }}
                      >
                        {meta.icon} {meta.label}
                      </p>
                      <div className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
                        {list.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => go(s.id)}
                            className="flex items-center gap-2.5 rounded-lg border px-2.5 py-2 text-left transition-colors"
                            style={{
                              borderColor: route === s.id ? s.colors.primary : "#E3DED4",
                              background: route === s.id ? `${s.colors.primary}10` : "transparent",
                            }}
                          >
                            <Logo id={s.id} className="h-7 w-7 shrink-0 rounded-md" />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[12.5px] font-bold text-ink">{s.short}</span>
                              <span className="block truncate text-[10.5px] text-faint">
                                {s.mascot.emoji} {s.location.city}
                              </span>
                            </span>
                            <span className="shrink-0 text-[11px] font-bold tabular-nums text-faint">
                              {s.acceptanceRate}%
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="hidden h-8 w-px shrink-0 bg-line sm:block" />

        <nav className="scrollbar-none flex flex-1 items-center gap-1.5 overflow-x-auto py-0.5">
          <button
            onClick={() => go("home")}
            className="flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2 text-[13px] font-semibold transition-all"
            style={{
              borderColor: route === "home" ? "#14161A" : "#E3DED4",
              background: route === "home" ? "#14161A" : "#FFFFFF",
              color: route === "home" ? "#FFFFFF" : "#575D66",
            }}
          >
            ⌂ Home
          </button>
          {SCHOOLS.map((s) => {
            const active = route === s.id;
            return (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                title={`${s.name} — ${s.mascot.name}`}
                className="group flex shrink-0 items-center gap-2 rounded-xl border px-2.5 py-1.5 transition-all duration-200"
                style={{
                  borderColor: active ? s.colors.primary : "#E3DED4",
                  background: active
                    ? `${s.colors.primary}12`
                    : "#FFFFFF",
                  boxShadow: "none",
                }}
              >
                <Logo id={s.id} className="h-6 w-6 shrink-0 rounded-md" />
                <span
                  className="whitespace-nowrap text-[13px] font-semibold tracking-tight"
                  style={{ color: active ? s.colors.primary : "#575D66" }}
                >
                  {s.short}
                </span>
                <span className="text-[11px] opacity-70">{s.mascot.emoji}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
