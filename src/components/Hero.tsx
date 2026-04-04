import { motion, useScroll, useTransform } from 'framer-motion'

interface HeroProps {
  t: (key: string) => string
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
}

const fadeUp = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
}

const scaleIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Hero({ t }: HeroProps) {
  const { scrollYProgress } = useScroll()
  const blob1Y = useTransform(scrollYProgress, [0, 0.5], [0, -150])
  const blob2Y = useTransform(scrollYProgress, [0, 0.5], [0, -80])

  return (
    <section id="about" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax gradient blobs */}
      <motion.div style={{ y: blob1Y }} className="absolute top-10 left-0 w-[500px] h-[500px] bg-neutral-400/08 dark:bg-neutral-600/06 rounded-full blur-[120px] -z-10" />
      <motion.div style={{ y: blob2Y }} className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-neutral-400/06 dark:bg-neutral-600/04 rounded-full blur-[120px] -z-10" />

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
              variants={fadeUp}
              className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="text-[#0A0A0A] dark:text-[#F0EFE9] block">Vitor</span>
              <span className="text-[#0A0A0A] dark:text-[#F0EFE9] block">Carnevalli</span>
              <span className="block text-[#6B6B6B] dark:text-[#888]">
                de Almeida
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={fadeUp} className="text-lg text-[#6B6B6B] dark:text-[#888] mb-4 max-w-md">
              {t('hero.subtitle')}
            </motion.p>

            {/* Description */}
            <motion.div variants={fadeUp} className="max-w-lg mb-10 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>
              <span className="text-[#6B6B6B] dark:text-[#888]">{'<bio>'}</span>
              <p className="text-[#6B6B6B] dark:text-[#888] pl-4 my-1">
                {t('hero.description')}
              </p>
              <span className="text-[#6B6B6B] dark:text-[#888]">{'</bio>'}</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://github.com/vitorCarnevalli"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 w-full sm:w-auto bg-[#0A0A0A] dark:bg-[#F0EFE9] text-white dark:text-[#0A0A0A] text-sm font-bold hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/vitor-carnevalli-de-almeida/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 w-full sm:w-auto border border-[#E5E5E0] dark:border-[#1E1E1E] bg-[#FFFFFF] dark:bg-[#111111] text-[#0A0A0A] dark:text-[#F0EFE9] text-sm font-bold hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>

              <a
                href={`${import.meta.env.BASE_URL}curriculo.pdf`}
                download
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 w-full sm:w-auto border border-[#E5E5E0] dark:border-[#1E1E1E] bg-[#FFFFFF] dark:bg-[#111111] text-[#0A0A0A] dark:text-[#F0EFE9] text-sm font-bold hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                {t('hero.resume')}
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Photo */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="relative h-auto lg:h-[600px] flex items-center justify-center pb-4 lg:pb-0"
          >
            {/* Photo container */}
            <div className="relative z-10 w-56 lg:w-[280px]" style={{ aspectRatio: '3/4' }}>
              {/* Borda */}
              <div className="absolute -inset-[2px] rounded-3xl bg-[#0A0A0A] dark:bg-[#F0EFE9]" />

              {/* Foto */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}profile.jpeg`}
                  alt="Vitor Carnevalli de Almeida"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1"
      >
        <motion.svg
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-5 h-5 text-[#6B6B6B] dark:text-[#888]"
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
