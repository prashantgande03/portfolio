import { useEffect, useMemo, useRef, useState } from "react";
import { GraduationCap, Briefcase, Trophy, Zap, type LucideIcon } from "lucide-react";

type Item = {
  year: string;
  title: string;
  place: string;
  icon: LucideIcon;
  level: string;
  xp: number;
  tag: string;
};

const items: Item[] = [
  { year: "2022", title: "Higher Secondary — Science", place: "Greenwood High · 92%", icon: GraduationCap, level: "LVL 1", xp: 25, tag: "TUTORIAL" },
  { year: "2023", title: "Full-Stack Web Development", place: "Meta Certificate · Coursera", icon: Trophy, level: "LVL 2", xp: 55, tag: "SIDE QUEST" },
  { year: "2024", title: "Frontend Developer Intern", place: "Pixel Labs", icon: Briefcase, level: "LVL 3", xp: 80, tag: "BOSS FIGHT" },
  { year: "2023 — Now", title: "B.Tech in Computer Science", place: "State University of Technology", icon: Zap, level: "LVL 4", xp: 100, tag: "MAIN QUEST" },
];

function RCCar() {
  return (
    <svg viewBox="0 0 60 100" width="56" height="92" aria-hidden>
      <defs>
        <linearGradient id="body" x1="0" x2="1">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#7E22CE" />
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#F0ABFC" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#F0ABFC" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="flame" x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0" />
          <stop offset="40%" stopColor="#f0abfc" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="1" />
        </linearGradient>
      </defs>
      {/* exhaust flame */}
      <path d="M22 88 Q30 110 38 88 Z" fill="url(#flame)">
        <animate attributeName="opacity" values="0.6;1;0.7" dur="0.25s" repeatCount="indefinite" />
      </path>
      <ellipse cx="30" cy="6" rx="22" ry="10" fill="url(#glow)" />
      <rect x="2" y="20" width="8" height="18" rx="2" fill="#0a0a14" />
      <rect x="50" y="20" width="8" height="18" rx="2" fill="#0a0a14" />
      <rect x="2" y="62" width="8" height="18" rx="2" fill="#0a0a14" />
      <rect x="50" y="62" width="8" height="18" rx="2" fill="#0a0a14" />
      <rect x="8" y="14" width="44" height="74" rx="10" fill="url(#body)" stroke="#F0ABFC" strokeWidth="1.5" />
      <rect x="14" y="22" width="32" height="20" rx="4" fill="#1a0b2e" opacity="0.85" />
      <rect x="16" y="46" width="28" height="22" rx="4" fill="#2a1147" opacity="0.6" />
      <circle cx="14" cy="84" r="2.4" fill="#F0ABFC">
        <animate attributeName="r" values="2;3;2" dur="0.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="46" cy="84" r="2.4" fill="#F0ABFC">
        <animate attributeName="r" values="2;3;2" dur="0.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function QualificationRoad() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [boost, setBoost] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    let last = 0;
    let raf = 0;
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.4;
      const passed = vh * 0.85 - rect.top;
      const p = Math.max(0, Math.min(1, passed / total));
      setProgress(p);
      // detect speed → boost mode
      const delta = Math.abs(p - last);
      last = p;
      if (delta > 0.005) {
        setBoost(true);
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          setTimeout(() => setBoost(false), 250);
        });
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const thresholdFor = (i: number) => (i + 0.6) / items.length;
  const speedKmh = Math.round(40 + progress * 220 + (boost ? 60 : 0));
  const completedCount = items.filter((_, i) => progress >= thresholdFor(i)).length;
  const totalXp = items.reduce((acc, it, i) => (progress >= thresholdFor(i) ? acc + it.xp : acc), 0);

  // pre-generate static stars so they don't shift on rerender
  const stars = useMemo(
    () =>
      Array.from({ length: 40 }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
      })),
    [],
  );

  return (
    <section
      id="qualification"
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-24 sm:px-6"
    >
      {/* arcade grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(var(--neon-purple) 1px, transparent 1px), linear-gradient(90deg, var(--neon-purple) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      {/* twinkle stars */}
      <div className="pointer-events-none absolute inset-0">
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-pulse-glow"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <span className="inline-block rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-primary">
          ▸ Press Scroll to Start
        </span>
        <h2 className="mt-3 text-4xl font-bold tracking-tight">
          <span className="text-neon">Qualification</span> Race
        </h2>
        <p className="mt-2 text-muted-foreground">
          Drive the neon highway — unlock checkpoints as you scroll.
        </p>
      </div>

      {/* HUD */}
      <div className="relative mx-auto mt-8 grid max-w-4xl grid-cols-3 gap-3 rounded-xl border border-border bg-card/60 p-3 text-xs uppercase tracking-widest backdrop-blur sm:gap-6 sm:p-4">
        <div>
          <div className="text-muted-foreground">Speed</div>
          <div className="mt-1 font-mono text-lg text-primary">
            {speedKmh}
            <span className="ml-1 text-[10px] text-muted-foreground">km/h</span>
            {boost && <span className="ml-2 text-[10px] text-[var(--neon-pink)]">⚡BOOST</span>}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground">Checkpoints</div>
          <div className="mt-1 font-mono text-lg text-primary">
            {completedCount}<span className="text-muted-foreground">/{items.length}</span>
          </div>
        </div>
        <div>
          <div className="text-muted-foreground">XP</div>
          <div className="mt-1 font-mono text-lg text-[var(--neon-pink)]">
            {totalXp}<span className="text-[10px] text-muted-foreground">/{items.reduce((a, b) => a + b.xp, 0)}</span>
          </div>
          <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${(totalXp / items.reduce((a, b) => a + b.xp, 0)) * 100}%`,
                background: "linear-gradient(90deg, var(--neon-purple), var(--neon-pink))",
                boxShadow: "0 0 12px var(--neon-pink)",
              }}
            />
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 max-w-4xl perspective">
        <div
          className="relative mx-auto"
          style={{
            width: isMobile ? "84px" : "min(380px, 80%)",
            transform: isMobile ? "none" : "rotateX(14deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Road */}
          <div
            className="relative mx-auto rounded-[40px] border border-border"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.16 0.04 295) 0%, oklch(0.22 0.05 295) 100%)",
              boxShadow:
                "0 0 80px oklch(0.7 0.25 300 / 0.35), inset 0 0 60px oklch(0 0 0 / 0.7)",
              minHeight: isMobile ? items.length * 180 : 720,
            }}
          >
            {/* edge neon strips */}
            <span
              className="pointer-events-none absolute inset-y-4 left-2 w-[3px] rounded-full"
              style={{ background: "var(--neon-purple)", boxShadow: "0 0 14px var(--neon-purple)" }}
            />
            <span
              className="pointer-events-none absolute inset-y-4 right-2 w-[3px] rounded-full"
              style={{ background: "var(--neon-pink)", boxShadow: "0 0 14px var(--neon-pink)" }}
            />
            {/* moving dashes (lane center) */}
            <div
              className="pointer-events-none absolute inset-y-6 left-1/2 w-[6px] -translate-x-1/2 rounded-full opacity-90"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, rgba(255,255,255,0.9) 0 18px, transparent 18px 38px)",
                animation: `roadDash ${boost ? "0.4s" : "1.2s"} linear infinite`,
              }}
            />
            {/* speed lines on the sides */}
            {boost && (
              <>
                <div className="pointer-events-none absolute inset-y-0 left-1 w-2 opacity-80"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, transparent 0 4px, var(--neon-pink) 4px 10px)",
                    filter: "blur(1px)",
                  }}
                />
                <div className="pointer-events-none absolute inset-y-0 right-1 w-2 opacity-80"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, transparent 0 4px, var(--neon-purple) 4px 10px)",
                    filter: "blur(1px)",
                  }}
                />
              </>
            )}

            {/* Start banner */}
            <div className="absolute left-1/2 top-2 -translate-x-1/2 rounded-md border border-primary/50 bg-background/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
              Start
            </div>
            {/* Finish flag */}
            <div className="absolute left-1/2 bottom-2 -translate-x-1/2 rounded-md border border-[var(--neon-pink)]/60 bg-background/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[var(--neon-pink)]">
              ◤ Finish ◢
            </div>

            {/* Car + trail */}
            <div
              className="absolute left-1/2 z-30 -translate-x-1/2 transition-[top] duration-150 ease-out"
              style={{
                top: `calc(${progress * 100}% - 46px)`,
                filter:
                  "drop-shadow(0 8px 18px oklch(0.7 0.25 300 / 0.85)) drop-shadow(0 0 10px var(--neon-pink))",
              }}
            >
              {/* trailing glow */}
              <div
                className="absolute left-1/2 top-full h-24 w-10 -translate-x-1/2 rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, var(--neon-pink) 0%, transparent 100%)",
                  opacity: 0.55,
                  filter: "blur(8px)",
                }}
              />
              <RCCar />
            </div>

            {/* Milestone markers */}
            {items.map((it, i) => {
              const top = `calc(${((i + 0.5) / items.length) * 100}% - 10px)`;
              const reached = progress >= thresholdFor(i) - 0.05;
              return (
                <div key={`dot-${i}`} className="absolute left-1/2 z-20 -translate-x-1/2" style={{ top }}>
                  <span
                    className="block h-5 w-5 rounded-full border-2 border-background transition-all"
                    style={{
                      background: reached ? "var(--neon-pink)" : "var(--muted)",
                      boxShadow: reached
                        ? "0 0 18px var(--neon-pink), 0 0 36px var(--neon-purple)"
                        : "0 0 0 transparent",
                      transform: reached ? "scale(1.15)" : "scale(1)",
                    }}
                  />
                  <span
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-bold"
                    style={{ color: reached ? "#0a0a14" : "transparent" }}
                  >
                    {i + 1}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Cards layer */}
          {items.map((item, i) => {
            const Icon = item.icon;
            const left = i % 2 === 0;
            const reached = progress >= thresholdFor(i);
            const topPct = ((i + 0.5) / items.length) * 100;

            const cardStyle: React.CSSProperties = isMobile
              ? {
                  left: "calc(100% + 16px)",
                  top: `calc(${topPct}% - 60px)`,
                  width: "calc(100vw - 130px)",
                  maxWidth: 280,
                }
              : {
                  top: `calc(${topPct}% - 50px)`,
                  ...(left ? { right: "calc(100% + 28px)" } : { left: "calc(100% + 28px)" }),
                  width: 280,
                };

            return (
              <div
                key={`card-${i}`}
                className="absolute overflow-hidden rounded-xl border bg-card/90 p-4 text-left backdrop-blur transition-all duration-500"
                style={{
                  ...cardStyle,
                  borderColor: reached ? "var(--neon-pink)" : "var(--border)",
                  opacity: reached ? 1 : 0,
                  transform: reached
                    ? "translateY(0) scale(1)"
                    : "translateY(24px) scale(0.92)",
                  pointerEvents: reached ? "auto" : "none",
                  boxShadow: reached
                    ? "0 10px 40px oklch(0.7 0.25 300 / 0.45), inset 0 0 24px oklch(0.75 0.22 340 / 0.15)"
                    : undefined,
                }}
              >
                {/* corner brackets — HUD style */}
                <span className="pointer-events-none absolute left-1 top-1 h-3 w-3 border-l-2 border-t-2 border-[var(--neon-pink)]" />
                <span className="pointer-events-none absolute right-1 top-1 h-3 w-3 border-r-2 border-t-2 border-[var(--neon-pink)]" />
                <span className="pointer-events-none absolute left-1 bottom-1 h-3 w-3 border-b-2 border-l-2 border-[var(--neon-pink)]" />
                <span className="pointer-events-none absolute right-1 bottom-1 h-3 w-3 border-b-2 border-r-2 border-[var(--neon-pink)]" />

                {!isMobile && (
                  <span
                    className="absolute top-1/2 hidden h-[2px] sm:block"
                    style={{
                      width: 28,
                      background: "linear-gradient(90deg, var(--neon-purple), var(--neon-pink))",
                      boxShadow: "0 0 10px var(--neon-pink)",
                      ...(left ? { right: -28 } : { left: -28 }),
                      opacity: reached ? 1 : 0,
                      transition: "opacity 400ms",
                    }}
                  />
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary">
                    <span className="rounded bg-primary/15 p-1">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest">
                      {item.year}
                    </span>
                  </div>
                  <span className="rounded border border-[var(--neon-pink)]/50 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[var(--neon-pink)]">
                    {item.level}
                  </span>
                </div>

                <h3 className="mt-2 font-semibold leading-snug">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.place}</p>

                <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-widest">
                  <span className="font-mono text-muted-foreground">{item.tag}</span>
                  <span className="font-mono text-[var(--neon-pink)]">+{item.xp} XP</span>
                </div>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full transition-all duration-700"
                    style={{
                      width: reached ? `${item.xp}%` : "0%",
                      background: "linear-gradient(90deg, var(--neon-purple), var(--neon-pink))",
                      boxShadow: "0 0 10px var(--neon-pink)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* completion banner */}
      {completedCount === items.length && (
        <div className="relative mx-auto mt-10 max-w-md animate-fade-up rounded-xl border border-[var(--neon-pink)] bg-card/80 p-4 text-center backdrop-blur">
          <div className="font-mono text-xs uppercase tracking-[0.4em] text-[var(--neon-pink)]">
            ★ Race Complete ★
          </div>
          <div className="mt-1 text-lg font-bold">All checkpoints unlocked</div>
        </div>
      )}

      <style>{`
        @keyframes roadDash {
          from { background-position-y: 0; }
          to { background-position-y: -56px; }
        }
      `}</style>
    </section>
  );
}
