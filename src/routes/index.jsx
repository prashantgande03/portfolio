import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink, Code2, Send, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RotatingText } from "@/components/RotatingText";
import { QualificationRoad } from "@/components/QualificationRoad";
import { FloatingCube } from "@/components/FloatingCube";
import profile from "@/assets/profile.jpg";
const techStack = [
    { label: "React", color: "#A78BFA", lvl: 50 },
    // { label: "TS", color: "#C4B5FD", lvl: 85 },
    { label: "JS", color: "#F0ABFC", lvl: 80 },
    { label: "HTML", color: "#D8B4FE", lvl: 98 },
    { label: "CSS", color: "#A855F7", lvl: 90 },
    // { label: "Tailwind", color: "#C084FC", lvl: 88 },
    { label: "Node", color: "#9333EA", lvl: 85 },
    { label: "Java", color: "#E879F9", lvl: 50 },
    { label: "mongodb", color: "#B794F4", lvl: 81 },
    { label: "Git", color: "#D946EF", lvl: 88 },
    // { label: "Figma", color: "#A78BFA", lvl: 72 },
    { label: "SQL", color: "#C084FC", lvl: 80 },
];
const heroCubes = [
    { label: "JS", color: "#F0ABFC", size: 56, top: "10%", left: "8%" },
    { label: "TS", color: "#A78BFA", size: 48, top: "18%", right: "10%" },
    { label: "</>", color: "#C084FC", size: 64, bottom: "18%", left: "6%" },
    { label: "{}", color: "#E879F9", size: 52, bottom: "25%", right: "8%" },
    { label: "CSS", color: "#D8B4FE", size: 44, top: "55%", left: "3%" },
    { label: "⚛", color: "#C4B5FD", size: 50, top: "50%", right: "4%" },
];
export default Index;
const projects = [
    { title: "wanderlust", desc: "a project to show skill and passion for webdev.", tags: ["node", "ejs", "restapi","express.js","mongodb"], rating: 5, plays: "10",url:"https://majorproject-1-af8l.onrender.com/listing" },
    { title: "Grace website", desc: "a website for a gisf company in agro domain,it was project to showcase the company products.", tags: ["mongodb","node.js", "ejs", "express.js"], rating: 4, plays: "null", url:"#" },
    { title: "todolist", desc: "A project while my learning phase .", tags: ["javascript", "CSS","html"], rating: 5, plays: "null", url:"#" },
    
];
function Index() {
    return (<main className="min-h-screen bg-background text-foreground">

      {/* TOP HUD NAV */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="#home" className="flex items-center gap-2 font-bold">
            <Code2 className="h-5 w-5 text-primary"/>
            <span className="font-mono">prashant.DEV</span>
          </a>
          <div className="hidden gap-6 text-xs font-mono uppercase tracking-widest text-muted-foreground lg:flex">
            <a href="#stack" className="hover:text-primary">Stack</a>
            <a href="#qualification" className="hover:text-primary">Qualification</a>
            <a href="#projects" className="hover:text-primary">Projects</a>
            <a href="#contact" className="hover:text-primary">Contact</a>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild size="sm" className="font-mono uppercase tracking-widest">
              <a href="#qualification">Qualification Race</a>
            </Button>
            <Button asChild size="sm" className="font-mono uppercase tracking-widest">
              <a href="#contact">Hire me</a>
            </Button>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden px-6 pt-20 pb-32" style={{ backgroundImage: "var(--gradient-hero)" }}>
        {/* Scanlines */}
        <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 2px, rgba(255,255,255,0.04) 2px 3px)" }}/>

        <div className="pointer-events-none absolute inset-0">
          {heroCubes.map((c, i) => (<div key={i} className="pointer-events-auto absolute animate-drift opacity-70 hover:opacity-100" style={{ top: c.top, left: c.left, right: c.right, bottom: c.bottom, animationDelay: `${i * 0.6}s` }}>
              <FloatingCube label={c.label} color={c.color} size={c.size}/>
            </div>))}
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
          <Badge variant="secondary" className="mb-6 font-mono uppercase tracking-widest">▸ Available Now</Badge>
          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            Hi, I'm <span className="text-neon">Prashant Gande</span>
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            I craft thoughtful, fast, and beautiful interfaces for the web.
          </p>

          <div className="relative mt-14 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <RotatingText text="• DEVELOPER • PROBLEM SOLVER " radius={150}/>
            </div>
            <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 md:h-64 md:w-64 animate-pulse-glow" style={{ borderColor: "var(--neon-purple)" }}>
              <img src={profile} alt="Portrait of Alex Carter" width={512} height={512} className="h-full w-full object-cover"/>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="sm" className="font-mono uppercase tracking-widest">
              <a href="#qualification">Qualification Race</a>
            </Button>
            <Button asChild size="sm" className="font-mono uppercase tracking-widest">
              <a href="#contact">Contact Me</a>
            </Button>
          </div>

          {/* Hero stats card */}
          <div className="mt-10 grid w-full max-w-2xl grid-cols-2 gap-3 rounded-xl border border-border bg-card/60 p-4 font-mono text-xs uppercase tracking-widest backdrop-blur sm:grid-cols-4">
            <Stat label="Class" value="Dev"/>
            <Stat label="HP" value="100/100" color="var(--neon-pink)"/>
            <Stat label="MP" value="∞" color="var(--neon-purple)"/>
            <Stat label="Rank" value="S+"/>
          </div>

          <p className="mt-10 font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Working as <span className="text-neon">Developer · Problem Solver</span>
          </p>
        </div>
      </section>

      {/* TECH STACK as skill panel */}
      <section id="stack" className="relative overflow-hidden bg-card/30 px-6 py-24">
        <div className="mx-auto max-w-6xl text-center">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-primary">▸ Skill Tree</span>
          <h2 className="mt-2 text-4xl font-bold tracking-tight">Tech <span className="text-neon">Stack</span></h2>
          <p className="mt-2 text-muted-foreground">Skills unlocked across the journey.</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((t) => (<Card key={t.label} className="group relative overflow-hidden border-primary/30 p-4 transition hover:-translate-y-1 hover:border-primary" style={{ boxShadow: `0 0 20px ${t.color}25` }}>
              <span className="pointer-events-none absolute left-1 top-1 h-3 w-3 border-l-2 border-t-2" style={{ borderColor: t.color }}/>
              <span className="pointer-events-none absolute right-1 top-1 h-3 w-3 border-r-2 border-t-2" style={{ borderColor: t.color }}/>
              <span className="pointer-events-none absolute left-1 bottom-1 h-3 w-3 border-b-2 border-l-2" style={{ borderColor: t.color }}/>
              <span className="pointer-events-none absolute right-1 bottom-1 h-3 w-3 border-b-2 border-r-2" style={{ borderColor: t.color }}/>
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold" style={{ color: t.color, textShadow: `0 0 12px ${t.color}` }}>{t.label}</div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">LVL {Math.floor(t.lvl / 10)}</span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full transition-all duration-700 group-hover:brightness-125" style={{
                width: `${t.lvl}%`,
                background: `linear-gradient(90deg, ${t.color}, var(--neon-pink))`,
                boxShadow: `0 0 10px ${t.color}`,
            }}/>
              </div>
              <div className="mt-1 flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>Mastery</span>
                <span style={{ color: t.color }}>{t.lvl}%</span>
              </div>
            </Card>))}
        </div>
      </section>

      <QualificationRoad />

      {/* PROJECTS as quest cards */}
      <section id="projects" className="bg-card/30 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-primary">▸ Quest Log</span>
          <h2 className="mt-2 text-4xl font-bold tracking-tight">Selected <span className="text-neon">Projects</span></h2>
          <p className="mt-2 text-muted-foreground">Pick a quest. Press play.</p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {projects.map((p, i) => (<Card key={p.title} className="group relative overflow-hidden p-6 transition hover:-translate-y-1 hover:border-primary/60">
                <span className="pointer-events-none absolute left-1 top-1 h-3 w-3 border-l-2 border-t-2 border-primary"/>
                <span className="pointer-events-none absolute right-1 top-1 h-3 w-3 border-r-2 border-t-2 border-primary"/>
                <span className="pointer-events-none absolute left-1 bottom-1 h-3 w-3 border-b-2 border-l-2 border-primary"/>
                <span className="pointer-events-none absolute right-1 bottom-1 h-3 w-3 border-b-2 border-r-2 border-primary"/>

                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">QUEST #{(i + 1).toString().padStart(2, "0")}</div>
                    <h3 className="mt-1 text-xl font-semibold">{p.title}</h3>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground transition group-hover:text-primary"/>
                </div>
                <p className="mt-2 text-muted-foreground">{p.desc}</p>

                <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
                  <span className="text-[var(--neon-pink)]">{"★".repeat(p.rating)}{"☆".repeat(5 - p.rating)}</span>
                  <span className="text-muted-foreground">▶ {p.plays} plays</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (<Badge key={t} variant="secondary">{t}</Badge>))}
                </div>

                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-md border border-primary/50 bg-primary/10 py-2 font-mono text-xs uppercase tracking-widest text-primary transition hover:bg-primary/20"
                >
                  ▶ Play Demo
                </a>
              </Card>))}
          </div>
        </div>
      </section>

      {/* CONTACT as terminal quest */}
      <section id="contact" className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-primary">▸ Side Quest</span>
            <h2 className="mt-2 text-4xl font-bold tracking-tight">Contact <span className="text-neon">me</span></h2>
            <p className="mt-2 text-muted-foreground">Open a comms channel.</p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Terminal */}
            <Card className="overflow-hidden p-0">
              <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2">
                <span className="h-3 w-3 rounded-full bg-[var(--neon-pink)]"/>
                <span className="h-3 w-3 rounded-full bg-yellow-400/80"/>
                <span className="h-3 w-3 rounded-full bg-green-400/80"/>
                <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">prashantgande@.com</span>
              </div>
              <div className="space-y-2 p-5 font-mono text-xs">
                <Line k="status" v="online" color="var(--neon-pink)"/>
                <Line k="email" v="prashantgande9@gmail.ocm" icon={<Mail className="h-3 w-3"/>}/>
                {/* <Line k="phone" v="54868" icon={<Phone className="h-3 w-3"/>}/> */}
                <Line k="region" v="Chhtrapati Sambhajinagar, csn" icon={<MapPin className="h-3 w-3"/>}/>
                <Line k="rate" v="open to freelance"/>
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-primary">$</span>
                  <span className="text-muted-foreground">connect</span>
                  <span className="inline-block h-3 w-2 animate-pulse bg-primary"/>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="icon" asChild><a href="https://github.com/prashantgande03" aria-label="GitHub"><Github className="h-4 w-4"/></a></Button>
                  <Button variant="outline" size="icon" asChild><a href="https://www.linkedin.com/in/prashant-gande-b559242ba/" aria-label="LinkedIn"><Linkedin className="h-4 w-4"/></a></Button>
                </div>
              </div>
            </Card>

            {/* Quest form */}
            <Card className="relative overflow-hidden p-6">
              <span className="pointer-events-none absolute left-1 top-1 h-3 w-3 border-l-2 border-t-2 border-[var(--neon-pink)]"/>
              <span className="pointer-events-none absolute right-1 top-1 h-3 w-3 border-r-2 border-t-2 border-[var(--neon-pink)]"/>
              <span className="pointer-events-none absolute left-1 bottom-1 h-3 w-3 border-b-2 border-l-2 border-[var(--neon-pink)]"/>
              <span className="pointer-events-none absolute right-1 bottom-1 h-3 w-3 border-b-2 border-r-2 border-[var(--neon-pink)]"/>

              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary">▸ NEW QUEST</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--neon-pink)]">+250 XP</span>
              </div>
              <form action="https://formspree.io/f/mwvydega" method="POST" className="space-y-4" >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input name="name" placeholder="Your name" required/>
                  <Input name="email" type="email" placeholder="Comms address" required/>
                </div>
                <Input name="subject" placeholder="Quest title"/>
                <Textarea name="message" placeholder="Describe your mission..." rows={5} required/>
                <Button type="submit" className="w-full font-mono uppercase tracking-widest">
                  <Send className="mr-2 h-4 w-4"/> Accept Quest
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
        © {new Date().getFullYear()} Prashant Gande · Built with <Heart className="inline h-3 w-3 text-[var(--neon-pink)]"/> 
      </footer>
    </main>);
}
function Stat({ label, value, color }) {
    return (<div className="text-left">
      <div className="text-muted-foreground">{label}</div>
      <div className="mt-1 text-base" style={{ color: color ?? "var(--primary)" }}>{value}</div>
    </div>);
}
function Line({ k, v, color, icon }) {
    return (<div className="flex items-center gap-2">
      <span className="text-primary">$</span>
      <span className="text-muted-foreground">{k}</span>
      <span className="text-muted-foreground">=</span>
      <span className="flex items-center gap-1.5" style={{ color: color ?? "var(--foreground)" }}>
        {icon}{v}
      </span>
    </div>);
}
