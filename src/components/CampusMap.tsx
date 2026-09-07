import type { FullSchool as School } from "../data";

export default function CampusMap({ school, height = 340 }: { school: School; height?: number }) {
  const { lat, lon } = school.location;
  const d = 0.011;
  const bbox = `${(lon - d * 1.6).toFixed(4)},${(lat - d).toFixed(4)},${(lon + d * 1.6).toFixed(4)},${(lat + d).toFixed(4)}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
    bbox,
  )}&layer=mapnik&marker=${lat}%2C${lon}`;

  return (
    <div
      className="relative overflow-hidden rounded-2xl border"
      style={{ borderColor: "#E3DED4", background: "#FFFFFF", borderTopColor: school.colors.primary, borderTopWidth: 3 }}
    >
      <iframe
        title={`Map of ${school.name}`}
        src={src}
        loading="lazy"
        style={{ height, filter: "saturate(0.92)" }}
        className="w-full border-0"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 bg-gradient-to-b from-ink/55 to-transparent p-3">
        <div className="pointer-events-auto rounded-lg bg-card px-3 py-2 backdrop-blur-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: school.colors.ink }}>
            Campus location
          </p>
          <p className="text-sm font-medium text-ink">
            {school.location.city}, {school.location.region}
          </p>
          <p className="text-[11px] text-muted">
            {lat.toFixed(4)}°, {lon.toFixed(4)}°
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line bg-card px-4 py-3">
        <p className="text-xs text-muted">{school.location.address}</p>
        <div className="flex gap-2">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-line px-2.5 py-1 text-[11px] font-semibold text-ink transition-colors hover:border-ink/35 hover:text-ink"
          >
            Google Maps ↗
          </a>
          <a
            href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=16/${lat}/${lon}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-line px-2.5 py-1 text-[11px] font-semibold text-ink transition-colors hover:border-ink/35 hover:text-ink"
          >
            OpenStreetMap ↗
          </a>
        </div>
      </div>
    </div>
  );
}


