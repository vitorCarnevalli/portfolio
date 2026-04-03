import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface NavbarProps {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  lang: 'pt' | 'en'
  toggleLang: () => void
  t: (key: string) => string
}

export function Navbar({ theme, toggleTheme, lang, toggleLang, t }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['about', 'skills', 'experience', 'projects']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const navLinks = [
    { key: 'nav.about', href: '#about' },
    { key: 'nav.skills', href: '#skills' },
    { key: 'nav.experience', href: '#experience' },
    { key: 'nav.projects', href: '#projects' },
  ]

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAFAF8]/95 dark:bg-[#0A0A0A]/95 border-b border-[#E5E5E0] dark:border-[#1E1E1E]'
          : 'bg-transparent'
      }`}>
        <div className="px-8 lg:px-16 h-16 flex items-center justify-between">

          {/* Esquerda: Logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
            data-hover
          >
            <span
              className="text-xl font-bold text-[#0A0A0A] dark:text-[#F0EFE9]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              VC
            </span>
          </motion.a>

          {/* Centro: Links de navegação */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map(link => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#0066FF]'
                      : 'text-[#6B6B6B] dark:text-[#888] hover:text-[#0A0A0A] dark:hover:text-[#F0EFE9]'
                  }`}
                  data-hover
                >
                  {t(link.key)}
                  {isActive && (
                    <motion.span
                      layoutId="active-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#0066FF]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Direita: Controles */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center border border-[#E5E5E0] dark:border-[#1E1E1E] rounded-lg p-0.5 bg-[#FFFFFF] dark:bg-[#111111]">
              {(['pt', 'en'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => lang !== l && toggleLang()}
                  className="relative px-2.5 py-1.5 rounded-md text-xs font-bold"
                  data-hover
                >
                  {lang === l && (
                    <motion.div
                      layoutId="lang-indicator"
                      className="absolute inset-0 rounded-md bg-[#0066FF]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-150 ${
                    lang === l ? 'text-white' : 'text-[#888] dark:text-[#555]'
                  }`}>
                    {l.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#E5E5E0] dark:border-[#1E1E1E] bg-[#FFFFFF] dark:bg-[#111111] text-sm transition-opacity duration-150 hover:opacity-70 active:scale-95"
              aria-label="Toggle theme"
              data-hover
            >
              {theme === 'light' ? (
                <svg className="w-4 h-4 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
              ) : (
                <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
              )}
            </button>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#E5E5E0] dark:border-[#1E1E1E] bg-[#FFFFFF] dark:bg-[#111111]"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-4 h-4 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
              ) : (
                <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
              )}
            </button>
            <button
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#E5E5E0] dark:border-[#1E1E1E] bg-[#FFFFFF] dark:bg-[#111111] text-[#6B6B6B] dark:text-[#888]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={menuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="bg-[#FAFAF8]/98 dark:bg-[#0A0A0A]/98 border-t border-[#E5E5E0] dark:border-[#1E1E1E] px-6 py-4 space-y-1">
            {navLinks.map(link => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`block w-full text-left py-3 px-4 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#0066FF]'
                      : 'text-[#6B6B6B] dark:text-[#888] hover:text-[#0A0A0A] dark:hover:text-[#F0EFE9]'
                  }`}
                >
                  {t(link.key)}
                </button>
              )
            })}
            <div className="pt-3 border-t border-[#E5E5E0] dark:border-[#1E1E1E]">
              <div className="flex items-center border border-[#E5E5E0] dark:border-[#1E1E1E] rounded-lg p-0.5 w-fit bg-[#FFFFFF] dark:bg-[#111111]">
                {(['pt', 'en'] as const).map(l => (
                  <button
                    key={l}
                    onClick={() => { if (lang !== l) toggleLang(); setMenuOpen(false); }}
                    className="relative px-3 py-1.5 rounded-md text-xs font-bold"
                  >
                    {lang === l && (
                      <motion.div
                        layoutId="lang-indicator-mobile"
                        className="absolute inset-0 rounded-md bg-[#0066FF]"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 transition-colors duration-150 ${
                      lang === l ? 'text-white' : 'text-[#888] dark:text-[#555]'
                    }`}>
                      {l.toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </nav>
    </>
  )
}
