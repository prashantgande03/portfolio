import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GraduationCap, Briefcase, Trophy, Zap, RotateCcw, Gauge } from "lucide-react";

const items = [
  { year: "2021", title: "10th board", place: "ST George high school · good grade%", icon: GraduationCap, level: "LVL 1", xp: 25, tag: "TUTORIAL" },
  { year: "2023", title: "secondary higher education-12th science", place: "new high school · good grade", icon: Trophy, level: "LVL 2", xp: 55, tag: "SIDE QUEST" },
  { year: "2023 — 2027", title: "B.Tech in Computer Science", place: "State University of Technology", icon: Zap, level: "LVL 3", xp: 100, tag: "MAIN QUEST" },
  { year: "2024-25", title: "mern Developer ", place: "remote . Apna college", icon: Briefcase, level: "LVL 4", xp: 80, tag: "BOSS FIGHT" },
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function RCCar({ steer = 0 }) {
  return (
    <svg viewBox="0 0 60 100" width="56" height="92" aria-hidden style={{ transform: `rotate(${steer}deg)`, transition: "transform 120ms" }}>
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
      <path d="M22 88 Q30 110 38 88 Z" fill="url(#flame)" />
      <ellipse cx="30" cy="6" rx="22" ry="10" fill="url(#glow)" />
      <rect x="2" y="20" width="8" height="18" rx="2" fill="#0a0a14" />
      <rect x="50" y="20" width="8" height="18" rx="2" fill="#0a0a14" />
      <rect x="2" y="62" width="8" height="18" rx="2" fill="#0a0a14" />
      <rect x="50" y="62" width="8" height="18" rx="2" fill="#0a0a14" />
      <rect x="8" y="14" width="44" height="74" rx="10" fill="url(#body)" stroke="#F0ABFC" strokeWidth="1.5" />
      <rect x="14" y="22" width="32" height="20" rx="4" fill="#1a0b2e" opacity="0.85" />
      <rect x="16" y="46" width="28" height="22" rx="4" fill="#2a1147" opacity="0.6" />
      <circle cx="14" cy="84" r="2.4" fill="#F0ABFC" />
      <circle cx="46" cy="84" r="2.4" fill="#F0ABFC" />
    </svg>
  );
}

export function QualificationRoad() {
  const [screenMode, setScreenMode] = useState("desktop");
  const [scrollState, setScrollState] = useState({ progress: 0, speed: 0, boost: false, lane: 0 });
  const sectionRef = useRef(null);
  const rafRef = useRef(null);
  const lastScrollY = useRef(0);
  const scrollStateRef = useRef(scrollState);

  const isMobile = screenMode === "mobile";
  const isCompact = screenMode !== "desktop";

  const thresholdFor = useCallback((i) => (i + 0.6) / items.length, []);

  useEffect(() => {
    const updateMode = () => {
      const width = window.innerWidth;
      setScreenMode(width < 640 ? "mobile" : width < 1024 ? "tablet" : "desktop");
    };

    updateMode();
    window.addEventListener("resize", updateMode, { passive: true });
    return () => window.removeEventListener("resize", updateMode);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const startPoint = windowHeight * 0.8;
      const endPoint = -rect.height * 0.5;
      const rawProgress = clamp((startPoint - rect.top) / (startPoint - endPoint), 0, 1);

      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      const normalizedSpeed = clamp(Math.abs(delta) / 240, 0, 1);
      const nextBoost = !isMobile && Math.abs(delta) > 12;
      const nextLane = isMobile ? 0 : Math.sin(rawProgress * Math.PI * 2) * 0.5;

      const prev = scrollStateRef.current;
      const progressChanged = Math.abs(rawProgress - prev.progress) > 0.007;
      const speedChanged = Math.abs(normalizedSpeed - prev.speed) > 0.03;
      const boostChanged = nextBoost !== prev.boost;
      const laneChanged = Math.abs(nextLane - prev.lane) > 0.01;

      if (progressChanged || speedChanged || boostChanged || laneChanged) {
        const nextState = { progress: rawProgress, speed: normalizedSpeed, boost: nextBoost, lane: nextLane };
        scrollStateRef.current = nextState;
        setScrollState(nextState);
      }

      lastScrollY.current = currentScrollY;
    };

    const onScroll = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  const reset = useCallback(() => {
    window.scrollTo({
      top: sectionRef.current?.offsetTop || 0,
      behavior: "smooth",
    });
    const resetState = { progress: 0, speed: 0, boost: false, lane: 0 };
    scrollStateRef.current = resetState;
    setScrollState(resetState);
  }, []);

  const { progress, speed, boost, lane } = scrollState;

  const completedCount = useMemo(() => {
    let count = 0;
    for (let i = 0; i < items.length; i += 1) {
      if (progress >= thresholdFor(i)) count += 1;
    }
    return count;
  }, [progress, thresholdFor]);

  const totalXp = useMemo(() => {
    let xp = 0;
    for (let i = 0; i < items.length; i += 1) {
      if (progress >= thresholdFor(i)) xp += items[i].xp;
    }
    return xp;
  }, [progress, thresholdFor]);

  const speedKmh = useMemo(() => Math.round(speed * 280 + (boost ? 40 : 0)), [speed, boost]);
  const carTop = useMemo(() => (isMobile ? `${18 + progress * 64}%` : `${12 + progress * 72}%`), [isMobile, progress]);
  const stars = useMemo(() => {
    const count = isMobile ? 12 : 20;
    return Array.from({ length: count }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
    }));
  }, [isMobile]);
  const roadDashAnimation = isMobile ? "none" : `roadDash ${Math.max(0.15, 1.4 - speed * 1.2)}s linear infinite`;
  const finished = progress >= 1;

  return (
    <section ref={sectionRef} id="qualification" className="relative overflow-hidden px-4 py-24 sm:px-6" style={{ minHeight: "160vh" }}>
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{
        backgroundImage: "linear-gradient(var(--neon-purple) 1px, transparent 1px), linear-gradient(90deg, var(--neon-purple) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
      }} />

      <div className="pointer-events-none absolute inset-0">
        {stars.map((s, i) => (
          <span key={i} className="absolute rounded-full bg-white" style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size, opacity: 0.55 }} />
        ))}
      </div>

      <div className="sticky top-20">
        <div className="relative mx-auto max-w-5xl text-center">
          <span className="inline-block rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-primary">
            ▸ Scroll to unlock checkpoints
          </span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            <span className="text-neon">Qualification</span> Race
          </h2>
          <p className="mt-2 text-muted-foreground text-sm">
            <span className="rounded bg-muted px-1.5 py-0.5">📜 Scroll down</span> to progress ·
            Scroll fast for <span className="mx-1 rounded bg-muted px-1.5 py-0.5">⚡ Boost</span>
          </p>
        </div>

        <div className="relative mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 rounded-xl border border-border bg-card/60 p-3 text-xs uppercase tracking-widest backdrop-blur sm:grid-cols-4 sm:gap-6 sm:p-4" style={{ backdropFilter: isCompact ? "none" : undefined, WebkitBackdropFilter: isCompact ? "none" : undefined }}>
          <div>
            <div className="flex items-center gap-1 text-muted-foreground"><Gauge className="h-3 w-3" /> Speed</div>
            <div className="mt-1 font-mono text-lg text-primary">{speedKmh}<span className="ml-1 text-[10px] text-muted-foreground">km/h</span></div>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
              <div className="h-full" style={{
                width: `${speed * 100}%`,
                background: boost ? "linear-gradient(90deg, var(--neon-pink), #fef08a)" : "linear-gradient(90deg, var(--neon-purple), var(--neon-pink))",
                boxShadow: "0 0 10px var(--neon-pink)",
              }} />
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Checkpoints</div>
            <div className="mt-1 font-mono text-lg text-primary">{completedCount}<span className="text-muted-foreground">/{items.length}</span></div>
          </div>
          <div>
            <div className="text-muted-foreground">Lap</div>
            <div className="mt-1 font-mono text-lg text-primary">{Math.round(progress * 100)}<span className="text-[10px] text-muted-foreground">%</span></div>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
              <div className="h-full" style={{ width: `${progress * 100}%`, background: "linear-gradient(90deg, var(--neon-purple), var(--neon-pink))" }} />
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">XP</div>
            <div className="mt-1 font-mono text-lg text-[var(--neon-pink)]">{totalXp}<span className="text-[10px] text-muted-foreground">/{items.reduce((a, b) => a + b.xp, 0)}</span></div>
          </div>
        </div>

        <div className="relative mx-auto mt-12 max-w-4xl perspective">
          <div className="relative" style={{
            width: isMobile ? "38vw" : "min(380px, 80%)",
            margin: isMobile ? 0 : "0 auto",
            transform: isMobile ? "none" : "rotateX(14deg)",
            transformStyle: "preserve-3d",
          }}>
            <div className="relative mx-auto rounded-[40px] border border-border" style={{
              background: "linear-gradient(180deg, oklch(0.16 0.04 295) 0%, oklch(0.22 0.05 295) 100%)",
              boxShadow: isMobile ? "0 0 40px rgba(124,58,237,0.15)" : "0 0 80px oklch(0.7 0.25 300 / 0.35), inset 0 0 60px oklch(0 0 0 / 0.7)",
              minHeight: isMobile ? items.length * 220 : 720,
              overflow: "visible",
            }}>
              <span className="pointer-events-none absolute inset-y-4 left-2 w-[3px] rounded-full" style={{ background: "var(--neon-purple)", boxShadow: "0 0 12px var(--neon-purple)" }} />
              <span className="pointer-events-none absolute inset-y-4 right-2 w-[3px] rounded-full" style={{ background: "var(--neon-pink)", boxShadow: "0 0 12px var(--neon-pink)" }} />

              <div className="pointer-events-none absolute inset-y-6 left-1/2 w-[6px] -translate-x-1/2 rounded-full opacity-90" style={{
                backgroundImage: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.9) 0 18px, transparent 18px 38px)",
                animation: roadDashAnimation,
                opacity: isMobile ? 0.7 : 0.9,
              }} />

              <div className="absolute left-1/2 z-30" style={{
                top: carTop,
                transform: `translateX(calc(-50% + ${lane * 36}px))`,
                filter: isMobile ? "none" : "drop-shadow(0 8px 18px oklch(0.7 0.25 300 / 0.85)) drop-shadow(0 0 10px var(--neon-pink))",
                transition: "top 140ms linear, transform 140ms linear",
              }}>
                <div className="absolute left-1/2 top-full h-24 w-10 -translate-x-1/2 rounded-full" style={{
                  background: "linear-gradient(180deg, var(--neon-pink) 0%, transparent 100%)",
                  opacity: isMobile ? 0.15 : 0.4 + speed * 0.5,
                  filter: isMobile ? "none" : "blur(8px)",
                }} />
                <RCCar steer={boost ? 8 : 0} />
              </div>

              {!isMobile && boost && (
                <>
                  <div className="pointer-events-none absolute inset-y-0 left-1 w-2 opacity-80" style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 4px, var(--neon-pink) 4px 10px)", filter: "blur(1px)" }} />
                  <div className="pointer-events-none absolute inset-y-0 right-1 w-2 opacity-80" style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 4px, var(--neon-purple) 4px 10px)", filter: "blur(1px)" }} />
                </>
              )}

              <div className="absolute left-1/2 top-2 -translate-x-1/2 rounded-md border border-primary/50 bg-background/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">Start</div>
              <div className="absolute left-1/2 bottom-2 -translate-x-1/2 rounded-md border border-[var(--neon-pink)]/60 bg-background/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[var(--neon-pink)]">◤ Finish ◢</div>

              {items.map((_, i) => {
                const top = `calc(${((i + 0.5) / items.length) * 100}% - 10px)`;
                const reached = progress >= thresholdFor(i) - 0.05;
                return (
                  <div key={`dot-${i}`} className="absolute left-1/2 z-20 -translate-x-1/2" style={{ top }}>
                    <span className="block h-5 w-5 rounded-full border-2 border-background transition-all" style={{
                      background: reached ? "var(--neon-pink)" : "var(--muted)",
                      boxShadow: reached ? "0 0 18px var(--neon-pink), 0 0 36px var(--neon-purple)" : "0 0 0 transparent",
                      transform: reached ? "scale(1.15)" : "scale(1)",
                    }} />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-bold" style={{ color: reached ? "#0a0a14" : "transparent" }}>{i + 1}</span>
                  </div>
                );
              })}
            </div>

            {items.map((item, i) => {
              const Icon = item.icon;
              const left = i % 2 === 0;
              const reached = progress >= thresholdFor(i);
              const topPct = ((i + 0.5) / items.length) * 100;
              const cardStyle = isMobile
                ? {
                    left: "calc(100% + 14px)",
                    top: `${i * 220 + 40}px`,
                    width: "min(48vw, 200px)",
                    maxWidth: 200,
                  }
                : { top: `calc(${topPct}% - 50px)`, ...(left ? { right: "calc(100% + 28px)" } : { left: "calc(100% + 28px)" }), width: 280 };
              return (
                <div key={`card-${i}`} className="absolute overflow-hidden rounded-xl border bg-card/90 p-3 sm:p-5 text-left backdrop-blur transition-all duration-500" style={{
                  ...cardStyle,
                  borderColor: reached ? "var(--neon-pink)" : "var(--border)",
                  opacity: reached ? 1 : 0,
                  transform: reached ? "translateY(0) scale(1)" : "translateY(24px) scale(0.92)",
                  pointerEvents: reached ? "auto" : "none",
                  boxShadow: reached ? (isMobile ? "0 10px 30px rgba(124,58,237,0.18)" : "0 10px 40px oklch(0.7 0.25 300 / 0.45), inset 0 0 24px oklch(0.75 0.22 340 / 0.15)") : undefined,
                  backdropFilter: isCompact ? "none" : undefined,
                  WebkitBackdropFilter: isCompact ? "none" : undefined,
                }}>
                  <span className="pointer-events-none absolute left-1 top-1 h-3 w-3 border-l-2 border-t-2 border-[var(--neon-pink)]" />
                  <span className="pointer-events-none absolute right-1 top-1 h-3 w-3 border-r-2 border-t-2 border-[var(--neon-pink)]" />
                  <span className="pointer-events-none absolute left-1 bottom-1 h-3 w-3 border-b-2 border-l-2 border-[var(--neon-pink)]" />
                  <span className="pointer-events-none absolute right-1 bottom-1 h-3 w-3 border-b-2 border-r-2 border-[var(--neon-pink)]" />

                  {!isMobile && (
                    <span className="absolute top-1/2 hidden h-[2px] sm:block" style={{
                      width: 28,
                      background: "linear-gradient(90deg, var(--neon-purple), var(--neon-pink))",
                      boxShadow: "0 0 10px var(--neon-pink)",
                      ...(left ? { right: -28 } : { left: -28 }),
                      opacity: reached ? 1 : 0,
                      transition: "opacity 400ms",
                    }} />
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary">
                      <span className="rounded bg-primary/15 p-1"><Icon className="h-4 w-4" /></span>
                      <span className="text-[10px] font-mono uppercase tracking-widest">{item.year}</span>
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
                    <div className="h-full transition-all duration-700" style={{
                      width: reached ? `${item.xp}%` : "0%",
                      background: "linear-gradient(90deg, var(--neon-purple), var(--neon-pink))",
                      boxShadow: "0 0 10px var(--neon-pink)",
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative mx-auto mt-10 flex max-w-md flex-col items-center gap-3">
          <button onClick={reset} className="flex items-center gap-1 rounded-md border border-border bg-card px-4 py-2 text-xs font-bold uppercase tracking-widest active:scale-95">
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        </div>

        {finished && (
          <div className="relative mx-auto mt-10 max-w-md animate-fade-up rounded-xl border border-[var(--neon-pink)] bg-card/90 p-5 text-center" style={{
            boxShadow: "0 0 40px var(--neon-pink)",
            backdropFilter: isCompact ? "none" : undefined,
            WebkitBackdropFilter: isCompact ? "none" : undefined,
          }}>
            <div className="font-mono text-xs uppercase tracking-[0.4em] text-[var(--neon-pink)]">★ Race Complete ★</div>
            <div className="mt-1 text-xl font-bold">All checkpoints unlocked!</div>
            <button onClick={reset} className="mt-3 rounded-md border border-primary bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary">
              ↻ Race again
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes roadDash {
          from { background-position-y: 0; }
          to { background-position-y: -56px; }
        }
      `}</style>
    </section>
  );
}
