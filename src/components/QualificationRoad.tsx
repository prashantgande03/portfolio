import { useEffect, useRef, useState } from "react";
import { GraduationCap, Briefcase, type LucideIcon } from "lucide-react";

type Item = { year: string; title: string; place: string; icon: LucideIcon };

const items: Item[] = [
  { year: "2023 — Present", title: "B.Tech in Computer Science", place: "State University of Technology", icon: GraduationCap },
  { year: "2024", title: "Frontend Developer Intern", place: "Pixel Labs", icon: Briefcase },
  { year: "2023", title: "Full-Stack Web Development", place: "Meta Certificate · Coursera", icon: GraduationCap },
  { year: "2022", title: "Higher Secondary — Science", place: "Greenwood High, 92%", icon: GraduationCap },
];

function RCCar() {
  return (
    <svg viewBox="0 0 60 100" width="48" height="80" aria-hidden>
      <defs>
        <linearGradient id="body" x1="0" x2="1">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#7E22CE" />
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#F0ABFC" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F0ABFC" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="30" cy="6" rx="22" ry="10" fill="url(#glow)" />
      <rect x="2" y="20" width="8" height="18" rx="2" fill="#0a0a14" />
      <rect x="50" y="20" width="8" height="18" rx="2" fill="#0a0a14" />
      <rect x="2" y="62" width="8" height="18" rx="2" fill="#0a0a14" />
      <rect x="50" y="62" width="8" height="18" rx="2" fill="#0a0a14" />
      <rect x="8" y="14" width="44" height="74" rx="10" fill="url(#body)" stroke="#F0ABFC" strokeWidth="1.5" />
      <rect x="14" y="22" width="32" height="20" rx="4" fill="#1a0b2e" opacity="0.8" />
      <rect x="16" y="46" width="28" height="22" rx="4" fill="#2a1147" opacity="0.6" />
      <circle cx="14" cy="84" r="2" fill="#F0ABFC" />
      <circle cx="46" cy="84" r="2" fill="#F0ABFC" />
    </svg>
  );
}

export function QualificationRoad() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.4;
      const passed = vh * 0.85 - rect.top;
      const p = Math.max(0, Math.min(1, passed / total));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Each item is revealed when car has passed its position on the road.
  // Items are spaced evenly: thresholds at (i+0.5)/n
  const thresholdFor = (i: number) => (i + 0.6) / items.length;

  return (
    <section id="qualification" ref={sectionRef} className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-bold tracking-tight">Qualification</h2>
        <p className="mt-2 text-muted-foreground">A road through my journey — scroll to drive.</p>
      </div>

      <div className="relative mx-auto mt-16 max-w-4xl perspective">
        <div
          className="relative mx-auto"
          style={{
            width: isMobile ? "72px" : "min(360px, 80%)",
            transform: isMobile ? "none" : "rotateX(10deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Road */}
          <div
            className="relative mx-auto rounded-[40px] border border-border"
            style={{
              background: "linear-gradient(180deg, oklch(0.18 0.03 295) 0%, oklch(0.22 0.04 295) 100%)",
              boxShadow: "0 0 60px oklch(0.7 0.25 300 / 0.25), inset 0 0 40px oklch(0 0 0 / 0.6)",
              minHeight: isMobile ? items.length * 160 : 640,
            }}
          >
            <span
              className="pointer-events-none absolute inset-y-4 left-2 w-[3px] rounded-full"
              style={{ background: "var(--neon-purple)", boxShadow: "0 0 12px var(--neon-purple)" }}
            />
            <span
              className="pointer-events-none absolute inset-y-4 right-2 w-[3px] rounded-full"
              style={{ background: "var(--neon-pink)", boxShadow: "0 0 12px var(--neon-pink)" }}
            />
            <div
              className="pointer-events-none absolute inset-y-6 left-1/2 w-[6px] -translate-x-1/2 rounded-full opacity-90"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, rgba(255,255,255,0.85) 0 16px, transparent 16px 34px)",
              }}
            />

            {/* Car */}
            <div
              className="absolute left-1/2 z-30 -translate-x-1/2 transition-[top] duration-150 ease-out"
              style={{
                top: `calc(${progress * 100}% - 40px)`,
                filter: "drop-shadow(0 8px 14px oklch(0.7 0.25 300 / 0.7))",
              }}
            >
              <RCCar />
            </div>

            {/* Milestone markers */}
            {items.map((_, i) => {
              const top = `calc(${((i + 0.5) / items.length) * 100}% - 8px)`;
              const reached = progress >= thresholdFor(i) - 0.05;
              return (
                <span
                  key={`dot-${i}`}
                  className="absolute left-1/2 z-20 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-background transition-all"
                  style={{
                    top,
                    background: reached ? "var(--neon-pink)" : "var(--muted)",
                    boxShadow: reached
                      ? "0 0 16px var(--neon-pink)"
                      : "0 0 0 transparent",
                  }}
                />
              );
            })}
          </div>

          {/* Cards layer — absolutely positioned next to the road, revealed when car arrives */}
          {items.map((item, i) => {
            const Icon = item.icon;
            const left = i % 2 === 0;
            const reached = progress >= thresholdFor(i);
            const topPct = ((i + 0.5) / items.length) * 100;

            const mobileStyle: React.CSSProperties = isMobile
              ? {
                  left: "calc(100% + 16px)",
                  top: `calc(${topPct}% - 50px)`,
                  width: "calc(100vw - 120px)",
                  maxWidth: 260,
                }
              : {
                  top: `calc(${topPct}% - 40px)`,
                  ...(left
                    ? { right: "calc(100% + 24px)" }
                    : { left: "calc(100% + 24px)" }),
                  width: 260,
                };

            return (
              <div
                key={`card-${i}`}
                className="absolute rounded-xl border border-border bg-card p-4 text-left shadow-lg transition-all duration-500"
                style={{
                  ...mobileStyle,
                  opacity: reached ? 1 : 0,
                  transform: reached
                    ? "translateY(0) scale(1)"
                    : `translateY(20px) scale(0.95)`,
                  pointerEvents: reached ? "auto" : "none",
                  boxShadow: reached
                    ? "0 10px 30px oklch(0.7 0.25 300 / 0.25)"
                    : undefined,
                }}
              >
                {/* Connector line to road (desktop only) */}
                {!isMobile && (
                  <span
                    className="absolute top-1/2 hidden h-[2px] sm:block"
                    style={{
                      width: 24,
                      background: "var(--neon-purple)",
                      boxShadow: "0 0 8px var(--neon-purple)",
                      ...(left ? { right: -24 } : { left: -24 }),
                      opacity: reached ? 1 : 0,
                      transition: "opacity 400ms",
                    }}
                  />
                )}
                <div className="flex items-center gap-2 text-primary">
                  <Icon className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-widest">{item.year}</span>
                </div>
                <h3 className="mt-1 font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.place}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
