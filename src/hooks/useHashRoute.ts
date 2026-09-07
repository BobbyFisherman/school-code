import { useEffect, useRef, useState } from "react";
import { SCHOOLS } from "../data";

const VALID = new Set<string>(["home", ...SCHOOLS.map((s) => s.id)]);

const read = () => {
  const raw = window.location.hash.replace(/^#\/?/, "").trim();
  const route = raw === "" ? "home" : raw;
  // Unknown hashes (in-page anchors like #rankings) keep us on the home page.
  return VALID.has(route) ? route : "home";
};

export function useHashRoute() {
  const [route, setRoute] = useState<string>(read);
  const last = useRef(route);

  useEffect(() => {
    const onChange = () => {
      const next = read();
      if (next === last.current) return;
      last.current = next;
      setRoute(next);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}

export const navigate = (route: string) => {
  if (route === "home" && read() === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  window.location.hash = route === "home" ? "/" : `/${route}`;
};

export const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};
