import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import CustomCursor from "@/components/CustomCursor";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.id === slug);

  if (!project) return <Navigate to="/" replace />;

  const sections = [
    { title: "Problem & Requirements", content: project.problem, num: "01" },
    { title: "Research & Solutions", content: project.research, num: "02" },
    { title: "Development", content: project.development, num: "03" },
    { title: "Outcomes", content: project.outcomes, num: "04" },
  ];

  return (
    <div className="min-h-screen bg-background cursor-none md:cursor-none">
      <CustomCursor />

      {/* Header */}
      <header className="section-padding pt-12 pb-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-extrabold font-display text-heading hover:text-primary transition-colors"
          >
            Saeed<span className="text-primary">.</span>
          </Link>
          <Link
            to="/#projects"
            className="flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Projects
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="section-padding pt-8 pb-0">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-body">
            {project.category}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-display text-heading leading-[0.95] mb-6">
            {project.title}<span className="text-primary">.</span>
          </h1>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mb-8">
            {project.info}
          </p>
          <div className="flex flex-wrap gap-3 mb-12">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 rounded-full text-xs uppercase tracking-widest font-body border border-border text-muted-foreground"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="section-padding pb-0">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden aspect-[16/9] relative">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Breakdown Sections */}
      <section className="section-padding py-20">
        <div className="max-w-5xl mx-auto space-y-0">
          {sections.map((s, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-12 py-12 border-t border-border"
            >
              <div>
                <span className="text-5xl md:text-6xl font-extrabold font-display text-border leading-none">
                  {s.num}
                </span>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-display text-heading mb-6">
                  {s.title}
                </h2>
                <p className="text-muted-foreground font-body leading-relaxed text-base md:text-lg">
                  {s.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding py-20 bg-surface">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 font-body text-center">
            Results
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-heading text-center mb-16">
            By the Numbers<span className="text-primary">.</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {project.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="stat-number mb-3">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-body uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding py-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-heading mb-6">
            Like what you see<span className="text-primary">?</span>
          </h2>
          <p className="text-muted-foreground font-body mb-8 max-w-lg mx-auto">
            Let's build something amazing together. Get in touch to discuss your project.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border text-foreground font-display font-bold text-sm uppercase tracking-widest hover:bg-secondary transition-all duration-300"
            >
              Visit Live Site
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              to="/#contact"
              className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-display font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform duration-300"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
