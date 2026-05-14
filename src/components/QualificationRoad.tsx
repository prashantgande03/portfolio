import { useEffect, useRef, useState } from "react";
import { GraduationCap, Briefcase, type LucideIcon } from "lucide-react";

type Item = { year: string; title: string; place: string; icon: LucideIcon };

const items: Item[] = [
  { year: "2023 — Present", title: "B.Tech in Computer Science", place: "State University of Technology", icon: GraduationCap },
  { year: "2024", title: "Frontend Developer Intern", place: "Pixel Labs", icon: Briefcase },
  { year: "2023", title: "Full-Stack Web Development", place: "Meta Certificate · Coursera", icon: GraduationCap },
  { year: "2022", title: "Higher Secondary — Science", place: "Greenwood High, 92%", icon: GraduationCap },
];

// Tiny top-down RC car as inline SVG
function RCCar() {
  return (
    <svg viewBox="0 0 60 100" width="56" height="92" aria-hidden>
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
      {/* headlight glow ahead of car */}
      <ellipse cx="30" cy="6" rx="22" ry="10" fill="url(#glow)" />
      {/* wheels */}
      <rect x="2" y="20" width="8" height="18" rx="2" fill="#0a0a14" />
      <rect x="50" y="20" width="8" height="18" rx="2" fill="#0a0a14" />
      <rect x="2" y="62" width="8" height="18" rx="2" fill="#0a0a14" />
      <rect x="50" y="62" width="8" height="18" rx="2" fill="#0a0a14" />
      {/* body */}
      <rect x="8" y="14" width="44" height="74" rx="10" fill="url(#body)" stroke="#F0ABFC" strokeWidth="1.5" />
      {/* windshield */}
      <rect x="14" y="22" width="32" height="20" rx="4" fill="#1a0b2e" opacity="0.8" />
      {/* roof */}
      <rect x="16" y="46" width="28" height="22" rx="4" fill="#2a1147" opacity="0.6" />
      {/* tail lights */}
      <circle cx="14" cy="84" r="2" fill="#F0ABFC" />
      <circle cx="46" cy="84" r="2" fill="#F0ABFC" />
    </svg>
  );
}

export function QualificationRoad() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // start when section top hits 80% of viewport, end when bottom hits 20%
      const total = rect.height + vh * 0.6;
      const passed = vh * 0.8 - rect.top;
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

  return (
    <section id="qualification" ref={sectionRef} className="relative px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-bold tracking-tight">Qualification</h2>
        <p className="mt-2 text-muted-foreground">A road through my journey so far.</p>
      </div>

      <div className="relative mx-auto mt-16 max-w-4xl perspective">
        {/* The 3D-tilted road */}
        <div
          className="relative mx-auto"
          style={{
            width: "min(360px, 80%)",
            transform: "rotateX(12deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Asphalt road */}
          <div
            className="relative mx-auto rounded-[40px] border border-border"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.18 0.03 295) 0%, oklch(0.22 0.04 295) 100%)",
              boxShadow:
                "0 0 60px oklch(0.7 0.25 300 / 0.25), inset 0 0 40px oklch(0 0 0 / 0.6)",
              minHeight: 640,
            }}
          >
            {/* Edge neon strips */}
            <span
              className="pointer-events-none absolute inset-y-4 left-2 w-[3px] rounded-full"
              style={{ background: "var(--neon-purple)", boxShadow: "0 0 12px var(--neon-purple)" }}
            />
            <span
              className="pointer-events-none absolute inset-y-4 right-2 w-[3px] rounded-full"
              style={{ background: "var(--neon-pink)", boxShadow: "0 0 12px var(--neon-pink)" }}
            />

            {/* Dashed center line */}
            <div
              className="pointer-events-none absolute inset-y-6 left-1/2 w-[6px] -translate-x-1/2 rounded-full opacity-90"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, rgba(255,255,255,0.85) 0 18px, transparent 18px 38px)",
              }}
            />

            {/* The driving car */}
            <div
              className="absolute left-1/2 z-20 -translate-x-1/2 transition-[top] duration-150 ease-out"
              style={{
                top: `calc(${progress * 100}% - 46px)`,
                filter: "drop-shadow(0 8px 14px oklch(0.7 0.25 300 / 0.7))",
              }}
            >
              <RCCar />
            </div>

            {/* Stops along the road */}
            <div className="relative grid gap-10 p-8 pt-10">
              {items.map((item, i) => {
                const Icon = item.icon;
                const left = i % 2 === 0;
                return (
                  <div key={i} className="relative flex items-center">
                    {/* milestone marker on road */}
                    <span
                      className="absolute left-1/2 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-background"
                      style={{
                        background: "var(--neon-purple)",
                        boxShadow: "0 0 14px var(--neon-purple)",
                      }}
                    />
                    {/* card */}
                    <div
                      className={`relative w-[260px] rounded-xl border border-border bg-card p-4 text-left shadow-lg ${
                        left ? "mr-auto -translate-x-[140px]" : "ml-auto translate-x-[140px]"
                      }`}
                      style={{ transform: `${left ? "translateX(-140px)" : "translateX(140px)"} translateZ(20px)` }}
                    >
                      <div className="flex items-center gap-2 text-primary">
                        <Icon className="h-4 w-4" />
                        <span className="text-xs uppercase tracking-widest">{item.year}</span>
                      </div>
                      <h3 className="mt-1 font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.place}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
