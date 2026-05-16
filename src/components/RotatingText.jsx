export function RotatingText({ text, radius = 90 }) {
    const chars = text.split("");
    const angleStep = 360 / chars.length;
    const size = radius * 2 + 40;
    return (<div className="relative animate-spin-slow motion-reduce:animate-none" style={{ width: size, height: size, perspective: 800 }} aria-hidden>
      {chars.map((c, i) => {
            const angle = i * angleStep;
            return (<span key={i} className="absolute left-1/2 top-1/2 text-xs font-semibold uppercase tracking-[0.3em] text-primary" style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
                    transformOrigin: "center",
                }}>
            {c === " " ? "\u00A0" : c}
          </span>);
        })}
    </div>);
}
