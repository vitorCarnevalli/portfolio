import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'

interface ProjectsProps {
  t: (key: string) => string
}

function ProjectCard({ project, index, t }: { project: (typeof projects)[number]; index: number; t: (k: string) => string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <a
        href={project.url || project.repo}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative block glass rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10"
      >
        {/* Número de fundo */}
        <div
          className="absolute top-0 right-5 text-[7rem] font-bold leading-none select-none pointer-events-none text-slate-900/[0.04] dark:text-white/[0.04]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Borda esquerda amber */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-amber-400 to-orange-500 rounded-l-2xl origin-top"
          animate={{ scaleY: hovered ? 1 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
        />

        <div className="relative p-7">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-md text-xs font-medium tracking-wide border border-amber-200/60 dark:border-amber-500/20 text-amber-700 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-500/5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Título + seta */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3
              className="text-2xl font-bold text-slate-900 dark:text-white leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t(project.nameKey)}
            </h3>
            <motion.svg
              className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1"
              animate={hovered ? { x: 3, y: -3 } : { x: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </motion.svg>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {t(project.descriptionKey)}
          </p>
        </div>
      </a>
    </motion.div>
  )
}

export function Projects({ t }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 px-8 lg:px-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-50/50 dark:via-amber-950/10 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-14 max-w-xl"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('projects.title')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.nameKey} project={project} index={i} t={t} />
          ))}

          {/* Em breve */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: projects.length * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="glass rounded-2xl border-dashed border-2 border-slate-200/50 dark:border-slate-700/50 flex flex-col items-center justify-center min-h-[160px] gap-3"
          >
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              {t('projects.comingSoon')}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
