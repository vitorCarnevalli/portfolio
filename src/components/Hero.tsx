import { Suspense, lazy } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MagneticButton } from './MagneticButton'

const HeroBackground = lazy(() =>
  import('./HeroBackground').then(m => ({ default: m.HeroBackground }))
)

interface HeroProps {
  t: (key: string) => string
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const slideRight = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Hero({ t }: HeroProps) {
  const { scrollYProgress } = useScroll()
  const blob1Y = useTransform(scrollYProgress, [0, 0.5], [0, -150])
  const blob2Y = useTransform(scrollYProgress, [0, 0.5], [0, -80])

  return (
    <section id="about" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax gradient blobs */}
      <motion.div style={{ y: blob1Y }} className="absolute top-10 left-0 w-[500px] h-[500px] bg-amber-400/20 dark:bg-amber-600/10 rounded-full blur-[120px] -z-10" />
      <motion.div style={{ y: blob2Y }} className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-400/15 dark:bg-orange-600/10 rounded-full blur-[120px] -z-10" />

      {/* Desktop: split layout | Mobile: stacked */}
      <div className="w-full max-w-7xl mx-auto px-8 lg:px-16 py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center lg:min-h-screen">

          {/* Left: Text content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10 lg:pr-8"
          >
            {/* Name */}
            <motion.h1
              variants={slideRight}
              className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="text-slate-900 dark:text-white block">Vitor</span>
              <span className="text-slate-900 dark:text-white block">Carnevalli</span>
              <span className="block bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent animate-gradient">
                de Almeida
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={slideRight} className="text-lg text-slate-500 dark:text-slate-400 mb-4 max-w-md">
              {t('hero.subtitle')}
            </motion.p>

            {/* Description */}
            <motion.p variants={slideRight} className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg mb-10">
              {t('hero.description')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={slideRight} className="flex gap-4 flex-wrap">
              <MagneticButton
                href="https://github.com/vitorCarnevalli"
                className="shimmer inline-flex items-center gap-2.5 px-7 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-sm font-bold shadow-xl shadow-slate-900/20 dark:shadow-white/10"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub
              </MagneticButton>

              <MagneticButton
                href="https://www.linkedin.com/in/vitor-carnevalli-de-almeida/"
                className="shimmer inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#0077b5] text-white rounded-2xl text-sm font-bold shadow-xl shadow-[#0077b5]/20"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </MagneticButton>

              <MagneticButton
                href="/curriculo.pdf"
                download
                className="inline-flex items-center gap-2.5 px-7 py-3.5 glass text-slate-700 dark:text-slate-300 rounded-2xl text-sm font-bold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                {t('hero.resume')}
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right: Photo + 3D Scene */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="relative h-auto lg:h-[600px] flex items-center justify-center pb-4 lg:pb-0"
          >
            {/* 3D canvas — desktop only, atrás da foto */}
            <div className="hidden lg:block absolute inset-0">
              <Suspense fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 blur-2xl animate-pulse" />
                </div>
              }>
                <HeroBackground />
              </Suspense>
            </div>

            {/* Photo placeholder */}
            <div className="relative z-10 w-56 h-64 lg:w-72 lg:h-80">
              {/* Borda gradiente animada */}
              <div
                className="absolute -inset-[1px] rounded-3xl animate-gradient opacity-60"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #f97316, #f59e0b)',
                  backgroundSize: '200% 200%',
                }}
              />

              {/* Glass interior */}
              <div className="relative w-full h-full rounded-3xl glass flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5" />

                {/* Cantos decorativos — estilo frame de foto */}
                <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-amber-400/50 rounded-tl" />
                <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-amber-400/50 rounded-tr" />
                <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-orange-400/50 rounded-bl" />
                <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-orange-400/50 rounded-br" />

                {/* Iniciais */}
                <span
                  className="relative text-7xl font-black text-slate-300 dark:text-slate-600 select-none"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  VA
                </span>

                {/* Hint de câmera */}
                <div className="relative mt-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-xs text-slate-400 font-medium">foto em breve</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator — bottom center, desktop only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1"
      >
        <motion.svg
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-5 h-5 text-amber-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.div>
    </section>
  )
}
