import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Mail, MapPin, Phone, GraduationCap, Briefcase, ExternalLink, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RotatingText } from "@/components/RotatingText";
import { TechCube } from "@/components/TechCube";
import profile from "@/assets/profile.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Alex Carter — Developer & Problem Solver" },
      { name: "description", content: "Portfolio of Alex Carter — full-stack developer building modern web experiences. View qualifications, projects and get in touch." },
    ],
  }),
});

const qualifications = [
  { year: "2023 — Present", title: "B.Tech in Computer Science", place: "State University of Technology", icon: GraduationCap },
  { year: "2024", title: "Frontend Developer Intern", place: "Pixel Labs", icon: Briefcase },
  { year: "2023", title: "Full-Stack Web Development", place: "Meta Certificate · Coursera", icon: GraduationCap },
  { year: "2022", title: "Higher Secondary — Science", place: "Greenwood High, 92%", icon: GraduationCap },
];

const projects = [
  { title: "TaskFlow", desc: "A minimalist team productivity app with realtime sync and keyboard-first UX.", tags: ["React", "TypeScript", "Supabase"] },
  { title: "PaletteAI", desc: "AI-assisted color palette generator that learns from your brand mood.", tags: ["Next.js", "OpenAI", "Tailwind"] },
  { title: "Routelet", desc: "A tiny client-side router under 1kb gzipped, built for fun and learning.", tags: ["TypeScript", "OSS"] },
  { title: "Mealmate", desc: "Meal planner that turns your fridge into a 7-day menu with grocery list.", tags: ["React Native", "Node"] },
];

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur bg-background/70 border-b border-border">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#home" className="flex items-center gap-2 font-bold">
            <Code2 className="h-5 w-5 text-primary" /> Alex.dev
          </a>
          <div className="hidden gap-8 text-sm text-muted-foreground md:flex">
            <a href="#qualification" className="hover:text-foreground transition">Qualification</a>
            <a href="#projects" className="hover:text-foreground transition">Projects</a>
            <a href="#contact" className="hover:text-foreground transition">Contact</a>
          </div>
          <Button asChild size="sm"><a href="#contact">Hire me</a></Button>
        </nav>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative overflow-hidden px-6 pt-20 pb-32"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <Badge variant="secondary" className="mb-6 animate-fade-up">Available for freelance</Badge>
          <h1 className="animate-fade-up text-5xl font-bold tracking-tight md:text-7xl">
            Hi, I'm <span className="text-neon">Alex Carter</span>
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground animate-fade-up">
            I craft thoughtful, fast, and beautiful interfaces for the web.
          </p>

          {/* Photo + rotating circular text + 3D z-axis tilt */}
          <div className="relative mt-14 perspective">
            <div className="relative flex items-center justify-center animate-tilt animate-float">
              <div className="absolute inset-0 flex items-center justify-center">
                <RotatingText text="• DEVELOPER • PROBLEM SOLVER " radius={150} />
              </div>
              <div
                className="relative h-56 w-56 overflow-hidden rounded-full border-4 md:h-64 md:w-64 animate-pulse-glow"
                style={{ borderColor: "var(--neon-orange)" }}
              >
                <img
                  src={profile}
                  alt="Portrait of Alex Carter"
                  width={512}
                  height={512}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <p className="mt-20 text-sm uppercase tracking-[0.4em] text-muted-foreground">
            Working as <span className="text-neon">Developer · Problem Solver</span>
          </p>
        </div>
      </section>

      {/* TECH STACK */}
      <section id="stack" className="px-6 py-24 bg-card/30">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-bold tracking-tight">Tech Stack</h2>
          <p className="mt-2 text-muted-foreground">Tools I use to bring ideas to life.</p>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-12">
            {[120, 100, 130, 110, 120].map((s, i) => (
              <div key={i} style={{ animationDelay: `${i * 0.4}s` }} className="animate-float">
                <TechCube size={s} />
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-3">
            {["React","TypeScript","JavaScript","HTML5","CSS3","Tailwind","Node.js","Java","Python","Git","Figma","PostgreSQL"].map((t) => (
              <Badge key={t} variant="outline" className="border-primary/40 text-foreground px-4 py-2 text-sm">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* QUALIFICATION */}
      <section id="qualification" className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold tracking-tight">Qualification</h2>
          <p className="mt-2 text-muted-foreground">A short timeline of my education and work.</p>

          <div className="mt-12 relative border-l border-border pl-8">
            {qualifications.map((q, i) => {
              const Icon = q.icon;
              return (
                <div key={i} className="mb-10 relative">
                  <span className="absolute -left-[42px] flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{q.year}</p>
                  <h3 className="mt-1 text-lg font-semibold">{q.title}</h3>
                  <p className="text-muted-foreground">{q.place}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="px-6 py-24 bg-card/30">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold tracking-tight">Selected Projects</h2>
          <p className="mt-2 text-muted-foreground">Things I've built recently.</p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <Card key={p.title} className="group p-6 transition hover:border-primary/60 hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
                </div>
                <p className="mt-2 text-muted-foreground">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t} variant="secondary">{t}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 py-24">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-4xl font-bold tracking-tight">Contact me</h2>
            <p className="mt-2 text-muted-foreground">Have a project in mind or just want to say hi? Drop a message.</p>
            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> alex@example.com</li>
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /> +1 (555) 123-4567</li>
              <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" /> San Francisco, CA</li>
            </ul>
            <div className="mt-8 flex gap-3">
              <Button variant="outline" size="icon" asChild><a href="#" aria-label="GitHub"><Github className="h-4 w-4" /></a></Button>
              <Button variant="outline" size="icon" asChild><a href="#" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a></Button>
            </div>
          </div>

          <Card className="p-6">
            <form
              className="space-y-4"
              onSubmit={(e) => { e.preventDefault(); alert("Thanks! I'll get back to you soon."); }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Input placeholder="Your name" required />
                <Input type="email" placeholder="Email" required />
              </div>
              <Input placeholder="Subject" />
              <Textarea placeholder="Tell me about your project..." rows={5} required />
              <Button type="submit" className="w-full">Send message</Button>
            </form>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Alex Carter. Built with care.
      </footer>
    </main>
  );
}
