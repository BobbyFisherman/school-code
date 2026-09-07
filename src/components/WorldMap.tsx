import { useMemo, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { SCHOOLS, HOME_BASE, TIER_META, TIER_ORDER, milesFrom, type Tier } from "../data";
import { navigate } from "../hooks/useHashRoute";
import Logo from "./Logo";

const homeIcon = L.divIcon({
  className: "",
  html: `<div style="position:relative;transform:translate(-50%,-50%)">
    <div style="width:16px;height:16px;border-radius:9999px;background:#14161A;box-shadow:0 0 0 4px rgba(20,22,26,.16)"></div>
  </div>`,
  iconSize: [0, 0],
});

function FitBounds({ ids }: { ids: string[] }) {
  const map = useMap();
  const key = ids.join(",");
  useMemo(() => {
    const pts = SCHOOLS.filter((s) => ids.includes(s.id)).map(
      (s) => [s.location.lat, s.location.lon] as [number, number],
    );
    pts.push([HOME_BASE.lat, HOME_BASE.lon]);
    if (pts.length) {
      window.setTimeout(() => {
        map.fitBounds(L.latLngBounds(pts), { padding: [45, 45], animate: true, maxZoom: 6 });
      }, 60);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return null;
}

export default function WorldMap() {
  const [filter, setFilter] = useState<Tier | "all">("all");

  const visible = useMemo(
    () => (filter === "all" ? SCHOOLS : SCHOOLS.filter((s) => s.tier === filter)),
    [filter],
  );
  const ids = visible.map((s) => s.id);

  return (
    <section id="map" className="scroll-mt-24">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-faint">One map, every campus</p>
          <h2 className="mt-1.5 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            All 18 schools on Earth
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-muted">
          The purple dot is home — Vernon Hills, Illinois. Marker colour is each school's own brand colour; click any
          marker to open its page.
        </p>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className="rounded-lg border px-3 py-1.5 text-[12.5px] font-semibold transition-all"
          style={{
            borderColor: filter === "all" ? "#14161A" : "#E3DED4",
            background: filter === "all" ? "#14161A" : "#FFFFFF",
            color: filter === "all" ? "#FFFFFF" : "#575D66",
          }}
        >
          All 18
        </button>
        {TIER_ORDER.map((t) => {
          const m = TIER_META[t];
          const on = filter === t;
          return (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12.5px] font-semibold transition-all"
              style={{
                borderColor: on ? m.accent : "#E3DED4",
                background: on ? `${m.accent}1f` : "#FFFFFF",
                color: on ? m.accent : "#575D66",
              }}
            >
              <span>{m.icon}</span>
              {m.label}
              <span className="opacity-50">({SCHOOLS.filter((s) => s.tier === t).length})</span>
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-paper">
        <MapContainer
          center={[45, -40]}
          zoom={2}
          scrollWheelZoom={false}
          style={{ height: 520, width: "100%", background: "#EDE9E1" }}
          worldCopyJump
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          />
          <FitBounds ids={ids} />

          <Marker position={[HOME_BASE.lat, HOME_BASE.lon]} icon={homeIcon}>
            <Tooltip direction="top" offset={[0, -10]}>
              <span style={{ fontWeight: 700 }}>Home — {HOME_BASE.label}</span>
            </Tooltip>
          </Marker>

          {visible.map((s) => {
            const miles = milesFrom(HOME_BASE.lat, HOME_BASE.lon, s.location.lat, s.location.lon);
            return (
              <CircleMarker
                key={s.id}
                center={[s.location.lat, s.location.lon]}
                radius={8}
                pathOptions={{
                  color: s.colors.ink,
                  fillColor: s.colors.ink,
                  fillOpacity: 0.85,
                  weight: 2,
                }}
                eventHandlers={{ click: () => navigate(s.id) }}
              >
                <Tooltip direction="top" offset={[0, -6]}>
                  <div style={{ lineHeight: 1.35 }}>
                    <div style={{ fontWeight: 800 }}>
                      {s.mascot.emoji} {s.short}
                    </div>
                    <div style={{ fontSize: 11, opacity: 0.75 }}>
                      {s.location.city}, {s.location.country}
                    </div>
                    <div style={{ fontSize: 11, opacity: 0.75 }}>
                      {miles.toLocaleString()} mi from home · {s.acceptanceRate}% admit
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: TIER_META[s.tier].accent }}>
                      {TIER_META[s.tier].label}
                    </div>
                  </div>
                </Tooltip>
              </CircleMarker>
            );
          })}
        </MapContainer>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line px-4 py-3">
          {visible.map((s) => (
            <button
              key={s.id}
              onClick={() => navigate(s.id)}
              className="group flex items-center gap-1.5 text-[11.5px] font-medium text-muted transition-colors hover:text-ink"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: s.colors.ink, boxShadow: "none" }}
              />
              {s.short}
            </button>
          ))}
        </div>
      </div>

      {/* distance ribbon */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[...SCHOOLS]
          .map((s) => ({
            s,
            miles: milesFrom(HOME_BASE.lat, HOME_BASE.lon, s.location.lat, s.location.lon),
          }))
          .sort((a, b) => a.miles - b.miles)
          .slice(0, 4)
          .map(({ s, miles }) => (
            <button
              key={s.id}
              onClick={() => navigate(s.id)}
              className="flex items-center gap-3 rounded-xl border border-line bg-card p-3 text-left transition-colors hover:border-ink/30"
            >
              <Logo id={s.id} className="h-8 w-8 shrink-0 rounded-lg" />
              <div className="min-w-0">
                <p className="truncate text-[13px] font-bold text-ink">{s.short}</p>
                <p className="text-[11px] text-faint">{miles.toLocaleString()} mi from Vernon Hills</p>
              </div>
            </button>
          ))}
      </div>
    </section>
  );
}
