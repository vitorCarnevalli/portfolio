import { motion } from 'framer-motion'

interface ExperienceProps {
  t: (key: string) => string
}

export function Experience({ t }: ExperienceProps) {
  const items = [
    {
      index: '01',
      period: t('experience.puc.period'),
      role: t('experience.puc.role'),
      org: t('experience.puc.org'),
      description: t('experience.puc.description'),
      color: '#f59e0b',
      tags: ['Java', 'Banco de Dados', 'Eng. de Software', 'Análise de Sistemas'],
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
    },
    {
      index: '02',
      period: t('experience.unicamp.period'),
      role: t('experience.unicamp.role'),
      org: t('experience.unicamp.org'),
      description: t('experience.unicamp.description'),
      color: '#10b981',
      tags: ['Hardware', 'Help Desk', 'Redes', 'Windows', 'Suporte Técnico'],
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ]

  return (
    <section id="experience" className="py-24 px-8 lg:px-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-16 max-w-xl pl-5 border-l-2 border-amber-500"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('experience.title')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            {t('experience.subtitle')}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-3xl glass overflow-hidden transition-shadow duration-300"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  `0 20px 60px -12px ${item.color}30, 0 0 0 1px ${item.color}20`
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = ''
              }}
            >
              {/* Barra de acento no topo */}
              <div
                className="h-1 w-full"
                style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
              />

              <div className="p-8 relative">
                {/* Ícone + período */}
                <div className="flex items-center gap-3 mb-6 relative">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    {item.period}
                  </span>
                </div>

                {/* Cargo / Curso */}
                <h3
                  className="text-2xl font-bold text-slate-900 dark:text-white mb-2 leading-tight relative"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {item.role}
                </h3>

                {/* Instituição */}
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-5 flex items-center gap-2 relative">
                  <span
                    className="inline-block w-4 h-px flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.org}
                </p>

                {/* Divider */}
                <div className="h-px bg-slate-200/60 dark:bg-slate-700/60 mb-5" />

                {/* Descrição */}
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed relative mb-5">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: `${item.color}10`,
                        color: item.color,
                        border: `1px solid ${item.color}25`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
