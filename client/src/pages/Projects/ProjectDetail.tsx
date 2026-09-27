import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, ExternalLink,
  CheckCircle2, Lightbulb, Layers, Code2, Loader2, AlertCircle,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { GithubIcon } from '@/components/Icons';
import { ProjectTechIcon } from '@/components/ProjectTech';
import { fetchProject, fetchProjects, type Project } from '@/lib/adminApi';

const SURFACE = 'bg-[rgba(12,22,40,.72)]';
const BORDER  = 'border-[rgba(126,161,214,.16)]';
const CARD    = `${SURFACE} border ${BORDER} rounded-2xl`;
const LABEL   = 'text-[#64d9ff] text-[10px] font-mono uppercase tracking-[0.22em] font-semibold';
const PILL    = 'inline-flex items-center gap-1.5 bg-[rgba(27,54,91,.11)] border border-[rgba(105,150,219,.17)] text-[#8fa3c1] text-xs px-3 py-1.5 rounded-full font-medium';

function SectionBlock({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[#64d9ff]">{icon}</span>
        <p className={LABEL}>{label}</p>
      </div>
      {children}
    </div>
  );
}

export const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const reduced = useReducedMotion();

  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!projectId) { navigate('/projects', { replace: true }); return; }
    setLoading(true);
    Promise.all([
      fetchProject(projectId),
      fetchProjects(),
    ])
      .then(([detail, list]) => {
        setProject(detail.project);
        setAllProjects(list.projects);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Failed to load project');
      })
      .finally(() => setLoading(false));
  }, [projectId, navigate]);

  const fadeUp = (delay = 0) =>
    reduced
      ? { initial: {}, animate: {} }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const, delay },
        };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] gap-3 text-[#6b7e9b]">
        <Loader2 size={24} className="animate-spin" />
        Loading project…
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-[#f87171]">
        <AlertCircle size={32} />
        <p>{error || 'Project not found'}</p>
        <Link to="/projects" className="text-[#64d9ff] text-sm hover:underline">← Back to projects</Link>
      </div>
    );
  }

  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prev = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const next = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <div className="animate-fadeIn">
      <div className="max-w-5xl mx-auto px-6 py-20">

        {/* Nav */}
        <div className="mb-10 flex items-center justify-between gap-4 flex-wrap">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#64d9ff] hover:text-[#8fc0ff] transition-colors focus-visible:outline-2 focus-visible:outline-[#4f8cff] focus-visible:outline-offset-2 rounded"
          >
            <ArrowLeft size={15} />
            All projects
          </Link>
          <div className="flex items-center gap-3">
            {prev && (
              <Link
                to={`/projects/${prev.slug}`}
                className="inline-flex items-center gap-1.5 text-xs text-[#9aaac0] hover:text-[#f3f7ff] transition-colors rounded focus-visible:outline-2 focus-visible:outline-[#4f8cff]"
              >
                <ArrowLeft size={13} />
                {prev.title}
              </Link>
            )}
            {prev && next && <span className="text-[#3a4b66]">·</span>}
            {next && (
              <Link
                to={`/projects/${next.slug}`}
                className="inline-flex items-center gap-1.5 text-xs text-[#9aaac0] hover:text-[#f3f7ff] transition-colors rounded focus-visible:outline-2 focus-visible:outline-[#4f8cff]"
              >
                {next.title}
                <ArrowRight size={13} />
              </Link>
            )}
          </div>
        </div>

        {/* Hero thumbnail */}
        <motion.div {...fadeUp(0)} className="mb-8">
          <div className="overflow-hidden rounded-2xl border border-[rgba(105,150,219,.16)] bg-[#081427]">
            <div className="relative aspect-video">
              {project.thumbnailUrl ? (
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-[#2a3a52] text-sm font-mono">
                  No thumbnail
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050914]/85 via-[#050914]/20 to-transparent" />
              <div className="absolute left-6 right-6 bottom-6 flex items-end justify-between gap-4 flex-wrap">
                <div>
                  {project.eyebrow && (
                    <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#7fb8ff] mb-1.5">
                      {project.eyebrow}
                    </p>
                  )}
                  <h1 className="text-3xl font-extrabold text-white leading-tight">{project.title}</h1>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {project.featured && (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[rgba(100,217,255,.35)] bg-[rgba(100,217,255,.08)] text-[#64d9ff] text-[10px] font-semibold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#64d9ff] animate-pulse" aria-hidden />
                      Featured
                    </span>
                  )}
                  <span className="rounded-full border border-[rgba(105,150,219,.22)] bg-[rgba(9,18,33,.8)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d8e7ff] backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-6 items-start">

          {/* Left: body */}
          <div className="space-y-5">
            <motion.section {...fadeUp(0.05)} className={`${CARD} p-6`} aria-label="Project summary">
              <p className="text-[#b8c8dc] text-base leading-relaxed font-medium">{project.description}</p>
              {project.overview && (
                <p className="text-[#8fa5c4] text-sm leading-relaxed mt-3">{project.overview}</p>
              )}
            </motion.section>

            {project.problem && (
              <motion.section {...fadeUp(0.1)} className={`${CARD} p-6`} aria-label="Problem and purpose">
                <SectionBlock icon={<Lightbulb size={14} />} label="Problem / Purpose">
                  <p className="text-[#9aaac0] text-sm leading-relaxed">{project.problem}</p>
                </SectionBlock>
              </motion.section>
            )}

            {project.architecture && (
              <motion.section {...fadeUp(0.15)} className={`${CARD} p-6`} aria-label="Architecture">
                <SectionBlock icon={<Layers size={14} />} label="Architecture & Technical Approach">
                  <p className="text-[#9aaac0] text-sm leading-relaxed">{project.architecture}</p>
                </SectionBlock>
              </motion.section>
            )}

            {project.features.length > 0 && (
              <motion.section {...fadeUp(0.2)} className={`${CARD} p-6`} aria-label="Key features">
                <SectionBlock icon={<CheckCircle2 size={14} />} label="Key Features">
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 rounded-xl border border-[rgba(105,150,219,.12)] bg-[rgba(8,18,35,.55)] px-4 py-3 text-sm text-[#c8d3e5]"
                      >
                        <CheckCircle2 size={13} className="text-[#64d9ff] flex-shrink-0 mt-0.5" aria-hidden />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </SectionBlock>
              </motion.section>
            )}

            {project.techStack.length > 0 && (
              <motion.section {...fadeUp(0.25)} className={`${CARD} p-6`} aria-label="Tech stack">
                <SectionBlock icon={<Code2 size={14} />} label="Technology Stack">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className={PILL}>
                        <ProjectTechIcon tech={tech} size={12} />
                        {tech}
                      </span>
                    ))}
                  </div>
                </SectionBlock>
              </motion.section>
            )}
          </div>

          {/* Right: sidebar */}
          <motion.aside {...fadeUp(0.1)} className="space-y-4 lg:sticky lg:top-24" aria-label="Project links">
            <div className={`${CARD} p-5`}>
              <p className={`${LABEL} mb-4`}>Source & Demo</p>
              <div className="space-y-2.5">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-between rounded-xl border border-[rgba(105,150,219,.16)] bg-[rgba(8,18,35,.4)] px-4 py-3 text-sm font-semibold text-[#f3f7ff] hover:border-[rgba(100,217,255,.4)] hover:bg-[rgba(14,30,55,.6)] transition-all"
                  >
                    <span className="inline-flex items-center gap-2">
                      <GithubIcon width={15} height={15} />
                      Open repository
                    </span>
                    <ArrowRight size={14} aria-hidden />
                  </a>
                ) : (
                  <div className="rounded-xl border border-dashed border-[rgba(105,150,219,.14)] px-4 py-3 text-sm text-[#6b7e9b]">
                    Repository not public
                  </div>
                )}
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-between rounded-xl border border-[rgba(105,150,219,.16)] bg-[rgba(8,18,35,.4)] px-4 py-3 text-sm font-semibold text-[#f3f7ff] hover:border-[rgba(100,217,255,.4)] hover:bg-[rgba(14,30,55,.6)] transition-all"
                  >
                    <span className="inline-flex items-center gap-2">
                      <ExternalLink size={15} aria-hidden />
                      Live demo
                    </span>
                    <ArrowRight size={14} aria-hidden />
                  </a>
                ) : (
                  <div className="rounded-xl border border-dashed border-[rgba(105,150,219,.14)] px-4 py-3 text-sm text-[#6b7e9b]">
                    Live demo not available
                  </div>
                )}
              </div>
            </div>

            <div className={`${CARD} p-5`}>
              <p className={`${LABEL} mb-4`}>Quick Details</p>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-[#6f87a9] text-[10px] uppercase tracking-wide mb-1">Category</dt>
                  <dd className="text-[#f3f7ff] font-medium">{project.category}</dd>
                </div>
                <div>
                  <dt className="text-[#6f87a9] text-[10px] uppercase tracking-wide mb-1.5">Stack</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border border-[rgba(105,150,219,.14)] text-[#8fa3c1] bg-[rgba(27,54,91,.1)]">
                        <ProjectTechIcon tech={tech} size={10} />
                        {tech}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            <Link
              to="/projects"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(105,150,219,.16)] bg-[rgba(12,22,40,.55)] px-4 py-3 text-sm font-semibold text-[#9aaac0] hover:border-[rgba(100,217,255,.3)] hover:text-[#f3f7ff] transition-all"
            >
              <ArrowLeft size={14} aria-hidden />
              All projects
            </Link>
          </motion.aside>
        </div>

        {/* Prev/Next */}
        {(prev || next) && (
          <motion.div
            {...fadeUp(0.3)}
            className="mt-10 pt-8 border-t border-[rgba(105,150,219,.1)] grid sm:grid-cols-2 gap-4"
          >
            {prev ? (
              <Link
                to={`/projects/${prev.slug}`}
                className="group flex flex-col gap-1 rounded-2xl border border-[rgba(126,161,214,.14)] bg-[rgba(12,22,40,.6)] p-5 hover:border-[rgba(100,217,255,.3)] transition-all"
              >
                <span className="text-[10px] text-[#5a7090] uppercase tracking-wider flex items-center gap-1.5">
                  <ArrowLeft size={11} aria-hidden /> Previous
                </span>
                <span className="text-[#f3f7ff] font-semibold text-sm group-hover:text-[#64d9ff] transition-colors">{prev.title}</span>
                {prev.eyebrow && <span className="text-[#8fa3c1] text-xs">{prev.eyebrow}</span>}
              </Link>
            ) : <div />}
            {next ? (
              <Link
                to={`/projects/${next.slug}`}
                className="group flex flex-col gap-1 rounded-2xl border border-[rgba(126,161,214,.14)] bg-[rgba(12,22,40,.6)] p-5 sm:text-right hover:border-[rgba(100,217,255,.3)] transition-all"
              >
                <span className="text-[10px] text-[#5a7090] uppercase tracking-wider flex items-center gap-1.5 sm:justify-end">
                  Next <ArrowRight size={11} aria-hidden />
                </span>
                <span className="text-[#f3f7ff] font-semibold text-sm group-hover:text-[#64d9ff] transition-colors">{next.title}</span>
                {next.eyebrow && <span className="text-[#8fa3c1] text-xs">{next.eyebrow}</span>}
              </Link>
            ) : <div />}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
