import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'

interface ProjectsProps {
  t: (key: string) => string
}

function ProjectRow({ project, index, t }: { project: (typeof projects)[number]; index: number; t: (k: string) => string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 md:gap-8 items-center py-7 border-b border-[#E5E5E0] dark:border-[#1E1E1E] transition-colors duration-200"
      style={{ borderBottomColor: hovered ? '#0066FF' : undefined }}
    >
      {/* Nome */}
      <h3
        className="text-2xl font-bold leading-tight transition-colors duration-200"
        style={{
          fontFamily: 'var(--font-heading)',
          color: hovered ? '#0066FF' : undefined,
        }}
      >
        {t(project.nameKey)}
      </h3>

      {/* Tags */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 md:justify-center">
        {project.tags.map(tag => (
          <span
            key={tag}
            className="text-xs text-[#6B6B6B] dark:text-[#555]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Botões */}
      <div className="flex items-center gap-5 md:justify-end">
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#0A0A0A] dark:text-[#F0EFE9] hover:text-[#0066FF] dark:hover:text-[#0066FF] hover:underline underline-offset-2 transition-colors duration-150"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Ver projeto ↗
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#0A0A0A] dark:text-[#F0EFE9] hover:text-[#0066FF] dark:hover:text-[#0066FF] hover:underline underline-offset-2 transition-colors duration-150"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Repositório ↗
          </a>
        )}
      </div>
    </motion.div>
  )
}

export function Projects({ t }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 px-8 lg:px-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-14 max-w-xl"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0A0A0A] dark:text-[#F0EFE9] mb-3 tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('projects.title')}
          </h2>
          <p className="text-[#6B6B6B] dark:text-[#888] text-lg">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="border-t border-[#E5E5E0] dark:border-[#1E1E1E]">
          {projects.map((project, i) => (
            <ProjectRow key={project.nameKey} project={project} index={i} t={t} />
          ))}

          {/* Em breve */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: projects.length * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
            className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 md:gap-8 items-center py-7 border-b border-[#E5E5E0] dark:border-[#1E1E1E] opacity-40"
          >
            <span
              className="text-2xl font-bold text-[#0A0A0A] dark:text-[#F0EFE9]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t('projects.comingSoon')}
            </span>
            <span
              className="text-xs text-[#6B6B6B] dark:text-[#555]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              —
            </span>
            <span
              className="text-xs text-[#6B6B6B] dark:text-[#555]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              —
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
