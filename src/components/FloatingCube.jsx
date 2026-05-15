// Small 3D rotating cube for hero background ambient decoration.
// Spins slowly on its own; speeds up on hover.
export function FloatingCube({ label, color, size = 56, className = "", style }) {
    const half = size / 2;
    const faces = [
        `rotateY(0deg) translateZ(${half}px)`,
        `rotateY(90deg) translateZ(${half}px)`,
        `rotateY(180deg) translateZ(${half}px)`,
        `rotateY(-90deg) translateZ(${half}px)`,
        `rotateX(90deg) translateZ(${half}px)`,
        `rotateX(-90deg) translateZ(${half}px)`,
    ];
    return (<div className={`perspective group cursor-pointer ${className}`} style={{ width: size, height: size, ...style }}>
      <div className="relative h-full w-full animate-spin-y transition-[animation-duration] duration-300 group-hover:[animation-duration:1.5s]">
        {faces.map((t, i) => (<div key={i} className="absolute inset-0 flex items-center justify-center rounded-md border-2 font-bold uppercase backdrop-blur-sm transition-transform group-hover:scale-110" style={{
                transform: t,
                borderColor: color,
                color,
                background: `${color}1f`,
                boxShadow: `0 0 14px ${color}99, inset 0 0 10px ${color}40`,
                fontSize: size * 0.22,
            }}>
            {label}
          </div>))}
      </div>
    </div>);
}
