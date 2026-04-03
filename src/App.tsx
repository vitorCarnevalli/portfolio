import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Skills } from './components/Skills'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { Footer } from './components/Footer'
import { BackgroundGrid } from './components/BackgroundGrid'
import { useTheme } from './hooks/useTheme'
import { useLanguage } from './hooks/useLanguage'
import { useSmoothScroll } from './hooks/useSmoothScroll'

function App() {
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang, t, tArray } = useLanguage()
  useSmoothScroll()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">
<BackgroundGrid />
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        lang={lang}
        toggleLang={toggleLang}
        t={t}
      />
      <main>
        <Hero t={t} />
        <Skills t={t} />
        <Experience t={t} tArray={tArray} />
        <Projects t={t} />
      </main>
      <Footer t={t} />
    </div>
  )
}

export default App
