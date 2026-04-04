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
                      ? 'text-[#0A0A0A] dark:text-[#F0EFE9]'
                      : 'text-[#6B6B6B] dark:text-[#888] hover:text-[#0A0A0A] dark:hover:text-[#F0EFE9]'
                  }`}
                  data-hover
                >
                  {t(link.key)}
                  {isActive && (
                    <motion.span
                      layoutId="active-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#0A0A0A] dark:bg-[#F0EFE9]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Direita: Controles */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleLang}
              aria-label="Toggle language"
              data-hover
              className="relative flex items-center rounded-full focus:outline-none"
              style={{
                width: 64,
                height: 28,
                background: theme === 'light' ? '#E0E0E0' : '#1E1E1E',
                boxShadow: theme === 'light'
                  ? '4px 4px 8px #BEBEBE, -4px -4px 8px #FFFFFF'
                  : '4px 4px 8px #0A0A0A, -4px -4px 8px #2A2A2A',
              }}
            >
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                className="rounded-full absolute"
                style={{
                  width: 28,
                  height: 20,
                  top: 4,
                  left: lang === 'pt' ? 4 : 32,
                  background: theme === 'light' ? '#F5F5F5' : '#2A2A2A',
                  boxShadow: theme === 'light'
                    ? '2px 2px 5px #BEBEBE, -2px -2px 5px #FFFFFF'
                    : '2px 2px 5px #0A0A0A, -2px -2px 5px #3A3A3A',
                }}
              />
              <span className="absolute left-0 w-1/2 text-center text-[10px] font-bold z-10" style={{
                color: lang === 'pt'
                  ? (theme === 'light' ? '#0A0A0A' : '#F0EFE9')
                  : (theme === 'light' ? '#999' : '#555'),
                fontFamily: 'var(--font-mono)',
              }}>PT</span>
              <span className="absolute right-0 w-1/2 text-center text-[10px] font-bold z-10" style={{
                color: lang === 'en'
                  ? (theme === 'light' ? '#0A0A0A' : '#F0EFE9')
                  : (theme === 'light' ? '#999' : '#555'),
                fontFamily: 'var(--font-mono)',
              }}>EN</span>
            </button>

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              data-hover
              className="relative flex items-center rounded-full transition-all duration-200 focus:outline-none"
              style={{
                width: 52,
                height: 28,
                background: theme === 'light' ? '#E0E0E0' : '#1E1E1E',
                boxShadow: theme === 'light'
                  ? '4px 4px 8px #BEBEBE, -4px -4px 8px #FFFFFF'
                  : '4px 4px 8px #0A0A0A, -4px -4px 8px #2A2A2A',
              }}
            >
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                className="rounded-full"
                style={{
                  width: 20,
                  height: 20,
                  position: 'absolute',
                  left: theme === 'light' ? 4 : 28,
                  background: theme === 'light' ? '#F5F5F5' : '#2A2A2A',
                  boxShadow: theme === 'light'
                    ? '2px 2px 5px #BEBEBE, -2px -2px 5px #FFFFFF'
                    : '2px 2px 5px #0A0A0A, -2px -2px 5px #3A3A3A',
                }}
              />
            </button>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="relative flex items-center rounded-full focus:outline-none"
              style={{
                width: 52,
                height: 28,
                background: theme === 'light' ? '#E0E0E0' : '#1E1E1E',
                boxShadow: theme === 'light'
                  ? '4px 4px 8px #BEBEBE, -4px -4px 8px #FFFFFF'
                  : '4px 4px 8px #0A0A0A, -4px -4px 8px #2A2A2A',
              }}
            >
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                className="rounded-full"
                style={{
                  width: 20,
                  height: 20,
                  position: 'absolute',
                  left: theme === 'light' ? 4 : 28,
                  background: theme === 'light' ? '#F5F5F5' : '#2A2A2A',
                  boxShadow: theme === 'light'
                    ? '2px 2px 5px #BEBEBE, -2px -2px 5px #FFFFFF'
                    : '2px 2px 5px #0A0A0A, -2px -2px 5px #3A3A3A',
                }}
              />
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
                      ? 'text-[#0A0A0A] dark:text-[#F0EFE9]'
                      : 'text-[#6B6B6B] dark:text-[#888] hover:text-[#0A0A0A] dark:hover:text-[#F0EFE9]'
                  }`}
                >
                  {t(link.key)}
                </button>
              )
            })}
            <div className="pt-3 border-t border-[#E5E5E0] dark:border-[#1E1E1E]">
              <button
                onClick={() => { toggleLang(); setMenuOpen(false); }}
                aria-label="Toggle language"
                className="relative flex items-center rounded-full focus:outline-none"
                style={{
                  width: 64,
                  height: 28,
                  background: theme === 'light' ? '#E0E0E0' : '#1E1E1E',
                  boxShadow: theme === 'light'
                    ? '4px 4px 8px #BEBEBE, -4px -4px 8px #FFFFFF'
                    : '4px 4px 8px #0A0A0A, -4px -4px 8px #2A2A2A',
                }}
              >
                <motion.div
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  className="rounded-full absolute"
                  style={{
                    width: 28,
                    height: 20,
                    top: 4,
                    left: lang === 'pt' ? 4 : 32,
                    background: theme === 'light' ? '#F5F5F5' : '#2A2A2A',
                    boxShadow: theme === 'light'
                      ? '2px 2px 5px #BEBEBE, -2px -2px 5px #FFFFFF'
                      : '2px 2px 5px #0A0A0A, -2px -2px 5px #3A3A3A',
                  }}
                />
                <span className="absolute left-0 w-1/2 text-center text-[10px] font-bold z-10" style={{
                  color: lang === 'pt'
                    ? (theme === 'light' ? '#0A0A0A' : '#F0EFE9')
                    : (theme === 'light' ? '#999' : '#555'),
                  fontFamily: 'var(--font-mono)',
                }}>PT</span>
                <span className="absolute right-0 w-1/2 text-center text-[10px] font-bold z-10" style={{
                  color: lang === 'en'
                    ? (theme === 'light' ? '#0A0A0A' : '#F0EFE9')
                    : (theme === 'light' ? '#999' : '#555'),
                  fontFamily: 'var(--font-mono)',
                }}>EN</span>
              </button>
            </div>
          </div>
        </motion.div>
      </nav>
    </>
  )
}
