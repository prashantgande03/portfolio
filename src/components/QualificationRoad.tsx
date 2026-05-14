import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GraduationCap, Briefcase, Trophy, Zap, RotateCcw, Gauge, type LucideIcon } from "lucide-react";

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

function RCCar({ steer = 0 }: { steer?: number }) {
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
      <path d="M22 88 Q30 110 38 88 Z" fill="url(#flame)">
        <animate attributeName="opacity" values="0.5;1;0.6" dur="0.25s" repeatCount="indefinite" />
      </path>
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
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [lane, setLane] = useState(0);
  const [boost, setBoost] = useState(false);
  const [paused, setPaused] = useState(false);
  const keys = useRef<Record<string, boolean>>({});
  const rafRef = useRef<number | null>(null);
  const lastT = useRef<number | null>(null);
  const speedRef = useRef(0);

  useEffect(() => { speedRef.current = speed; }, [speed]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "s", "a", "d", " "].includes(k)) {
        keys.current[k] = true;
        if (k === " ") setBoost(true);
        e.preventDefault();
      }
    };
    const up = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      keys.current[k] = false;
      if (k === " ") setBoost(false);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useEffect(() => {
    const tick = (t: number) => {
      if (lastT.current == null) lastT.current = t;
      const dt = Math.min(0.05, (t - lastT.current) / 1000);
      lastT.current = t;

      if (!paused) {
        const k = keys.current;
        const accel = (k["arrowup"] || k["w"] ? 1 : 0) + (boost ? 0.6 : 0);
        const brake = k["arrowdown"] || k["s"] ? 1 : 0;
        const left = k["arrowleft"] || k["a"] ? 1 : 0;
        const right = k["arrowright"] || k["d"] ? 1 : 0;

        setSpeed((s) => Math.max(0, Math.min(1, s + accel * dt * 0.9 - brake * dt * 1.6 - dt * 0.15)));
        setLane((l) => l + ((right - left) - l) * Math.min(1, dt * 6));
        setProgress((p) => Math.min(1, p + speedRef.current * dt * 0.18));
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastT.current = null;
    };
  }, [paused, boost]);

  const reset = useCallback(() => {
    setProgress(0);
    setSpeed(0);
    setLane(0);
  }, []);

  const press = (key: string, on: boolean) => { keys.current[key] = on; };

  const thresholdFor = (i: number) => (i + 0.6) / items.length;
  const speedKmh = Math.round(speed * 280 + (boost ? 40 : 0));
  const completedCount = items.filter((_, i) => progress >= thresholdFor(i)).length;
  const totalXp = items.reduce((acc, it, i) => (progress >= thresholdFor(i) ? acc + it.xp : acc), 0);
  const finished = progress >= 1;

  const stars = useMemo(
    () => Array.from({ length: 40 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
    })), [],
  );

  return (
    <section id="qualification" className="relative overflow-hidden px-4 py-24 sm:px-6">
      <div className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: "linear-gradient(var(--neon-purple) 1px, transparent 1px), linear-gradient(90deg, var(--neon-purple) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }} />
      <div className="pointer-events-none absolute inset-0">
        {stars.map((s, i) => (
          <span key={i} className="absolute rounded-full bg-white"
            style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size, opacity: 0.6 }} />
        ))}
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <span className="inline-block rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-primary">
          ▸ Drive to unlock checkpoints
        </span>
        <h2 className="mt-3 text-4xl font-bold tracking-tight">
          <span className="text-neon">Qualification</span> Race
        </h2>
        <p className="mt-2 text-muted-foreground text-sm">
          <kbd className="rounded bg-muted px-1.5 py-0.5">↑/W</kbd> accelerate ·
          <kbd className="mx-1 rounded bg-muted px-1.5 py-0.5">Space</kbd> boost ·
          <kbd className="rounded bg-muted px-1.5 py-0.5">←→</kbd> steer
        </p>
      </div>

      {/* HUD */}
      <div className="relative mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 rounded-xl border border-border bg-card/60 p-3 text-xs uppercase tracking-widest backdrop-blur sm:grid-cols-4 sm:gap-6 sm:p-4">
        <div>
          <div className="flex items-center gap-1 text-muted-foreground"><Gauge className="h-3 w-3" /> Speed</div>
          <div className="mt-1 font-mono text-lg text-primary">{speedKmh}<span className="ml-1 text-[10px] text-muted-foreground">km/h</span></div>
          <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full"
              style={{
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
            <div className="h-full"
              style={{ width: `${progress * 100}%`, background: "linear-gradient(90deg, var(--neon-purple), var(--neon-pink))" }} />
          </div>
        </div>
        <div>
          <div className="text-muted-foreground">XP</div>
          <div className="mt-1 font-mono text-lg text-[var(--neon-pink)]">{totalXp}<span className="text-[10px] text-muted-foreground">/{items.reduce((a, b) => a + b.xp, 0)}</span></div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 max-w-4xl perspective">
        <div className="relative mx-auto"
          style={{
            width: isMobile ? "100px" : "min(380px, 80%)",
            transform: isMobile ? "none" : "rotateX(14deg)",
            transformStyle: "preserve-3d",
          }}>
          <div className="relative mx-auto rounded-[40px] border border-border"
            style={{
              background: "linear-gradient(180deg, oklch(0.16 0.04 295) 0%, oklch(0.22 0.05 295) 100%)",
              boxShadow: "0 0 80px oklch(0.7 0.25 300 / 0.35), inset 0 0 60px oklch(0 0 0 / 0.7)",
              minHeight: isMobile ? items.length * 180 : 720,
            }}>
            <span className="pointer-events-none absolute inset-y-4 left-2 w-[3px] rounded-full"
              style={{ background: "var(--neon-purple)", boxShadow: "0 0 14px var(--neon-purple)" }} />
            <span className="pointer-events-none absolute inset-y-4 right-2 w-[3px] rounded-full"
              style={{ background: "var(--neon-pink)", boxShadow: "0 0 14px var(--neon-pink)" }} />

            <div className="pointer-events-none absolute inset-y-6 left-1/2 w-[6px] -translate-x-1/2 rounded-full opacity-90"
              style={{
                backgroundImage: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.9) 0 18px, transparent 18px 38px)",
                animation: `roadDash ${Math.max(0.15, 1.4 - speed * 1.2)}s linear infinite`,
              }} />

            {boost && (
              <>
                <div className="pointer-events-none absolute inset-y-0 left-1 w-2 opacity-80"
                  style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 4px, var(--neon-pink) 4px 10px)", filter: "blur(1px)" }} />
                <div className="pointer-events-none absolute inset-y-0 right-1 w-2 opacity-80"
                  style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 4px, var(--neon-purple) 4px 10px)", filter: "blur(1px)" }} />
              </>
            )}

            <div className="absolute left-1/2 top-2 -translate-x-1/2 rounded-md border border-primary/50 bg-background/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">Start</div>
            <div className="absolute left-1/2 bottom-2 -translate-x-1/2 rounded-md border border-[var(--neon-pink)]/60 bg-background/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[var(--neon-pink)]">◤ Finish ◢</div>

            <div className="absolute left-1/2 z-30"
              style={{
                top: `calc(${progress * 100}% - 46px)`,
                transform: `translateX(calc(-50% + ${lane * 36}px))`,
                filter: "drop-shadow(0 8px 18px oklch(0.7 0.25 300 / 0.85)) drop-shadow(0 0 10px var(--neon-pink))",
                transition: "top 90ms linear",
              }}>
              <div className="absolute left-1/2 top-full h-24 w-10 -translate-x-1/2 rounded-full"
                style={{
                  background: "linear-gradient(180deg, var(--neon-pink) 0%, transparent 100%)",
                  opacity: 0.4 + speed * 0.5,
                  filter: "blur(8px)",
                }} />
              <RCCar steer={lane * 8} />
            </div>

            {items.map((_, i) => {
              const top = `calc(${((i + 0.5) / items.length) * 100}% - 10px)`;
              const reached = progress >= thresholdFor(i) - 0.05;
              return (
                <div key={`dot-${i}`} className="absolute left-1/2 z-20 -translate-x-1/2" style={{ top }}>
                  <span className="block h-5 w-5 rounded-full border-2 border-background transition-all"
                    style={{
                      background: reached ? "var(--neon-pink)" : "var(--muted)",
                      boxShadow: reached ? "0 0 18px var(--neon-pink), 0 0 36px var(--neon-purple)" : "0 0 0 transparent",
                      transform: reached ? "scale(1.15)" : "scale(1)",
                    }} />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-bold"
                    style={{ color: reached ? "#0a0a14" : "transparent" }}>{i + 1}</span>
                </div>
              );
            })}
          </div>

          {items.map((item, i) => {
            const Icon = item.icon;
            const left = i % 2 === 0;
            const reached = progress >= thresholdFor(i);
            const topPct = ((i + 0.5) / items.length) * 100;
            const cardStyle: React.CSSProperties = isMobile
              ? { left: "calc(100% + 16px)", top: `calc(${topPct}% - 60px)`, width: "calc(100vw - 140px)", maxWidth: 280 }
              : { top: `calc(${topPct}% - 50px)`, ...(left ? { right: "calc(100% + 28px)" } : { left: "calc(100% + 28px)" }), width: 280 };

            return (
              <div key={`card-${i}`}
                className="absolute overflow-hidden rounded-xl border bg-card/90 p-4 text-left backdrop-blur transition-all duration-500"
                style={{
                  ...cardStyle,
                  borderColor: reached ? "var(--neon-pink)" : "var(--border)",
                  opacity: reached ? 1 : 0,
                  transform: reached ? "translateY(0) scale(1)" : "translateY(24px) scale(0.92)",
                  pointerEvents: reached ? "auto" : "none",
                  boxShadow: reached ? "0 10px 40px oklch(0.7 0.25 300 / 0.45), inset 0 0 24px oklch(0.75 0.22 340 / 0.15)" : undefined,
                }}>
                <span className="pointer-events-none absolute left-1 top-1 h-3 w-3 border-l-2 border-t-2 border-[var(--neon-pink)]" />
                <span className="pointer-events-none absolute right-1 top-1 h-3 w-3 border-r-2 border-t-2 border-[var(--neon-pink)]" />
                <span className="pointer-events-none absolute left-1 bottom-1 h-3 w-3 border-b-2 border-l-2 border-[var(--neon-pink)]" />
                <span className="pointer-events-none absolute right-1 bottom-1 h-3 w-3 border-b-2 border-r-2 border-[var(--neon-pink)]" />

                {!isMobile && (
                  <span className="absolute top-1/2 hidden h-[2px] sm:block"
                    style={{
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
                  <div className="h-full transition-all duration-700"
                    style={{
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

      {/* Gamepad controls */}
      <div className="relative mx-auto mt-10 flex max-w-md flex-col items-center gap-3">
        <div className="grid grid-cols-3 gap-2">
          <span />
          <PadBtn label="▲" sub="Accel" onPress={(on) => press("arrowup", on)} accent />
          <span />
          <PadBtn label="◀" sub="Left" onPress={(on) => press("arrowleft", on)} />
          <PadBtn label="▼" sub="Brake" onPress={(on) => press("arrowdown", on)} />
          <PadBtn label="▶" sub="Right" onPress={(on) => press("arrowright", on)} />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onMouseDown={() => setBoost(true)} onMouseUp={() => setBoost(false)}
            onTouchStart={() => setBoost(true)} onTouchEnd={() => setBoost(false)}
            onMouseLeave={() => setBoost(false)}
            className="rounded-md border border-[var(--neon-pink)] bg-[var(--neon-pink)]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[var(--neon-pink)] active:scale-95">
            ⚡ Boost
          </button>
          <button onClick={() => setPaused((p) => !p)}
            className="rounded-md border border-border bg-card px-4 py-2 text-xs font-bold uppercase tracking-widest active:scale-95">
            {paused ? "▶ Resume" : "⏸ Pause"}
          </button>
          <button onClick={reset}
            className="flex items-center gap-1 rounded-md border border-border bg-card px-4 py-2 text-xs font-bold uppercase tracking-widest active:scale-95">
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        </div>
      </div>

      {finished && (
        <div className="relative mx-auto mt-10 max-w-md animate-fade-up rounded-xl border border-[var(--neon-pink)] bg-card/90 p-5 text-center backdrop-blur"
          style={{ boxShadow: "0 0 60px var(--neon-pink)" }}>
          <div className="font-mono text-xs uppercase tracking-[0.4em] text-[var(--neon-pink)]">★ Race Complete ★</div>
          <div className="mt-1 text-xl font-bold">All checkpoints unlocked!</div>
          <button onClick={reset} className="mt-3 rounded-md border border-primary bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary">
            ↻ Race again
          </button>
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

function PadBtn({ label, sub, onPress, accent }: { label: string; sub: string; onPress: (on: boolean) => void; accent?: boolean }) {
  return (
    <button
      onMouseDown={() => onPress(true)}
      onMouseUp={() => onPress(false)}
      onMouseLeave={() => onPress(false)}
      onTouchStart={() => onPress(true)}
      onTouchEnd={() => onPress(false)}
      className={`flex h-14 w-14 flex-col items-center justify-center rounded-xl border text-lg font-bold transition active:scale-90 ${
        accent ? "border-[var(--neon-pink)] bg-[var(--neon-pink)]/10 text-[var(--neon-pink)]" : "border-border bg-card text-foreground"
      }`}
      style={accent ? { boxShadow: "0 0 18px var(--neon-pink)" } : undefined}>
      {label}
      <span className="mt-0.5 text-[8px] uppercase tracking-widest text-muted-foreground">{sub}</span>
    </button>
  );
}
