import { motion } from 'framer-motion'

interface FooterProps {
  t: (key: string) => string
}

export function Footer({ t }: FooterProps) {
  return (
    <footer className="relative py-12 px-6 border-t border-slate-200/50 dark:border-slate-800/50">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            VA
          </span>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
            &copy; {new Date().getFullYear()} Vitor Almeida &middot; {t('footer.rights')}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-600 mt-1">
            {t('footer.madeWith')}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
