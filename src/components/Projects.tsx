import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'

interface ProjectsProps {
  t: (key: string) => string
}

function BeforeAfterSlider({ before, after, altBefore, altAfter }: {
  before: string
  after: string
  altBefore: string
  altAfter: string
}) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }, [])

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (dragging.current) updatePosition(e.clientX)
  }, [updatePosition])

  const onMouseUp = useCallback(() => { dragging.current = false }, [])

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [onMouseMove, onMouseUp])

  // Previne scroll da página enquanto arrasta no touch
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); updatePosition(e.touches[0].clientX) }
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => el.removeEventListener('touchmove', onTouchMove)
  }, [updatePosition])

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none cursor-col-resize"
      style={{ aspectRatio: '16/9' }}
      onMouseDown={(e) => { dragging.current = true; updatePosition(e.clientX) }}
      onTouchStart={(e) => updatePosition(e.touches[0].clientX)}
    >
      {/* Imagem nova (fundo) */}
      <img
        src={after}
        alt={altAfter}
        className="absolute inset-0 w-full h-full object-cover object-top"
        draggable={false}
      />

      {/* Imagem antiga (clipada pela esquerda) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={before}
          alt={altBefore}
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{ width: `${10000 / position}%`, maxWidth: 'none' }}
          draggable={false}
        />
      </div>

      {/* Linha divisória */}
      <div
        className="absolute top-0 bottom-0"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        {/* Linha com glow */}
        <div className="absolute inset-0 w-px mx-auto" style={{ background: 'rgba(255,255,255,0.9)', boxShadow: '0 0 8px rgba(255,255,255,0.6)' }} />

        {/* Handle — pílula moderna */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-[3px]"
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(6px)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
          }}
        >
          <span style={{ width: 2, height: 14, borderRadius: 2, background: '#555' }} />
          <span style={{ width: 2, height: 14, borderRadius: 2, background: '#555' }} />
        </div>
      </div>

      {/* Labels */}
      <span
        className="absolute top-2 left-2 text-[10px] font-medium px-2 py-0.5 bg-black/50 text-white backdrop-blur-sm"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Antes
      </span>
      <span
        className="absolute top-2 right-2 text-[10px] font-medium px-2 py-0.5 bg-black/50 text-white backdrop-blur-sm"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        Depois
      </span>
    </div>
  )
}

function ProjectModal({ project, onClose, t }: { project: Project; onClose: () => void; t: (k: string) => string }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    window.dispatchEvent(new Event('lenis:stop'))
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      window.dispatchEvent(new Event('lenis:start'))
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-20 pb-8 overflow-y-auto"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
        className="w-full max-w-lg bg-[#FAFAF8] dark:bg-[#111111] border border-[#E5E5E0] dark:border-[#1E1E1E] p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="flex items-start justify-between mb-6">
          <h3
            className="text-2xl font-bold text-[#0A0A0A] dark:text-[#F0EFE9] leading-tight tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t(project.nameKey)}
          </h3>
          <button
            onClick={onClose}
            className="ml-4 text-[#6B6B6B] dark:text-[#888] hover:text-[#0A0A0A] dark:hover:text-[#F0EFE9] transition-colors"
            aria-label="Fechar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Slider antes/depois */}
        {project.coverImage && project.beforeImage && (
          <div className="mb-6">
            <BeforeAfterSlider
              before={project.beforeImage}
              after={project.coverImage}
              altBefore={`${t(project.nameKey)} — antes`}
              altAfter={`${t(project.nameKey)} — depois`}
            />
            <p
              className="text-[10px] text-[#6B6B6B] dark:text-[#555] mt-1.5 text-center"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Arraste para comparar
            </p>
          </div>
        )}

        {/* Imagem simples (sem before/after) */}
        {project.coverImage && !project.beforeImage && (
          <div className="mb-6 overflow-hidden border border-[#E5E5E0] dark:border-[#1E1E1E]">
            <img
              src={project.coverImage}
              alt={t(project.nameKey)}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Descrição */}
        <p className="text-base text-[#6B6B6B] dark:text-[#888] leading-relaxed mb-6">
          {t(project.descriptionKey)}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="text-xs font-medium px-2.5 py-1 border border-[#E5E5E0] dark:border-[#1E1E1E] text-[#6B6B6B] dark:text-[#888]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Botões */}
        <div className="flex items-center gap-3">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium px-4 py-2 border border-[#0A0A0A] dark:border-[#F0EFE9] text-[#0A0A0A] dark:text-[#F0EFE9] hover:bg-[#0A0A0A] hover:text-white dark:hover:bg-[#F0EFE9] dark:hover:text-[#0A0A0A] transition-colors"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Acessar Site ↗
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium px-4 py-2 border border-[#E5E5E0] dark:border-[#1E1E1E] text-[#6B6B6B] dark:text-[#888] hover:border-[#0A0A0A] dark:hover:border-[#F0EFE9] hover:text-[#0A0A0A] dark:hover:text-[#F0EFE9] transition-colors"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Repositório ↗
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({ project, index, t }: { project: Project; index: number; t: (k: string) => string }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [from, to] = project.coverGradient ?? ['#E5E5E0', '#C8C8C8']

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
        onClick={() => setModalOpen(true)}
        className="group cursor-pointer border border-[#E5E5E0] dark:border-[#1E1E1E] bg-[#FFFFFF] dark:bg-[#111111] hover:border-[#0A0A0A] dark:hover:border-[#F0EFE9] transition-colors duration-200 overflow-hidden"
      >
        {/* Cover */}
        {project.coverImage ? (
          <div className="h-40 w-full overflow-hidden">
            <img
              src={project.coverImage}
              alt={t(project.nameKey)}
              className="w-full h-full object-cover object-top"
            />
          </div>
        ) : (
          <div
            className="h-40 w-full"
            style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
          />
        )}

        {/* Conteúdo */}
        <div className="p-5">
          <h3
            className="text-lg font-bold text-[#0A0A0A] dark:text-[#F0EFE9] mb-3 leading-tight tracking-tight group-hover:opacity-70 transition-opacity"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t(project.nameKey)}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 border border-[#E5E5E0] dark:border-[#1E1E1E] text-[#6B6B6B] dark:text-[#555]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Botões */}
          <div className="flex items-center gap-3">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-[#0A0A0A] dark:text-[#F0EFE9] hover:underline underline-offset-2 transition-colors"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Acessar Site ↗
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-[#6B6B6B] dark:text-[#888] hover:text-[#0A0A0A] dark:hover:text-[#F0EFE9] hover:underline underline-offset-2 transition-colors"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Repositório ↗
              </a>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {modalOpen && (
          <ProjectModal project={project} onClose={() => setModalOpen(false)} t={t} />
        )}
      </AnimatePresence>
    </>
  )
}

function GitHubCard({ index }: { index: number }) {
  return (
    <motion.a
      href="https://github.com/vitorCarnevalli"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
      className="group border border-[#E5E5E0] dark:border-[#1E1E1E] bg-[#FFFFFF] dark:bg-[#111111] hover:border-[#0A0A0A] dark:hover:border-[#F0EFE9] transition-colors duration-200 overflow-hidden block"
    >
      {/* Cover */}
      <div
        className="h-40 w-full flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)' }}
      >
        <svg className="w-10 h-10 text-white opacity-60" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      </div>

      {/* Conteúdo */}
      <div className="p-5">
        <h3
          className="text-lg font-bold text-[#0A0A0A] dark:text-[#F0EFE9] mb-1 leading-tight tracking-tight group-hover:opacity-70 transition-opacity"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          GitHub
        </h3>
        <p
          className="text-xs text-[#6B6B6B] dark:text-[#888] mb-4"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Ver todos os repositórios
        </p>
        <span
          className="text-xs text-[#6B6B6B] dark:text-[#888] hover:text-[#0A0A0A] dark:hover:text-[#F0EFE9] transition-colors"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Ver GitHub ↗
        </span>
      </div>
    </motion.a>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.nameKey} project={project} index={i} t={t} />
          ))}
          <GitHubCard index={projects.length} />
        </div>
      </div>
    </section>
  )
}
