const faces = [
    { label: "React", color: "#61DAFB" },
    { label: "JS", color: "#F7DF1E" },
    { label: "TS", color: "#3178C6" },
    { label: "HTML", color: "#E34F26" },
    { label: "CSS", color: "#2965F1" },
    { label: "Java", color: "#EA2D2E" },
];
// 3D rotating cube with tech labels on each face
export function TechCube({ size = 120 }) {
    const half = size / 2;
    const transforms = [
        `rotateY(0deg) translateZ(${half}px)`,
        `rotateY(90deg) translateZ(${half}px)`,
        `rotateY(180deg) translateZ(${half}px)`,
        `rotateY(-90deg) translateZ(${half}px)`,
        `rotateX(90deg) translateZ(${half}px)`,
        `rotateX(-90deg) translateZ(${half}px)`,
    ];
    return (<div className="perspective" style={{ width: size, height: size }}>
      <div className="relative h-full w-full animate-spin-y">
        {faces.map((f, i) => (<div key={f.label} className="absolute inset-0 flex items-center justify-center rounded-lg border-2 font-bold uppercase tracking-widest backdrop-blur-sm" style={{
                transform: transforms[i],
                borderColor: f.color,
                color: f.color,
                background: `${f.color}15`,
                boxShadow: `0 0 20px ${f.color}80, inset 0 0 20px ${f.color}30`,
                fontSize: size * 0.18,
            }}>
            {f.label}
          </div>))}
      </div>
    </div>);
}
