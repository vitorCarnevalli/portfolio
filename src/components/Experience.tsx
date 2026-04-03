import { motion } from 'framer-motion'

interface ExperienceProps {
  t: (key: string) => string
  tArray: (key: string) => string[]
}

export function Experience({ t, tArray }: ExperienceProps) {
  const items = [
    {
      index: '01',
      period: t('experience.puc.period'),
      role: t('experience.puc.role'),
      org: t('experience.puc.org'),
      description: t('experience.puc.description'),
      color: '#0066FF',
      tags: tArray('experience.puc.tags'),
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
      color: '#0066FF',
      tags: tArray('experience.unicamp.tags'),
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
          className="mb-16 max-w-xl pl-5 border-l-2 border-[#0066FF]"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0A0A0A] dark:text-[#F0EFE9] mb-3 tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('experience.title')}
          </h2>
          <p className="text-[#6B6B6B] dark:text-[#888] text-lg">
            {t('experience.subtitle')}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl border border-[#E5E5E0] dark:border-[#1E1E1E] bg-[#FFFFFF] dark:bg-[#111111] overflow-hidden transition-shadow duration-300"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  `0 20px 60px -12px ${item.color}20, 0 0 0 1px ${item.color}15`
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = ''
              }}
            >
              {/* Barra de acento no topo */}
              <div
                className="h-[2px] w-full"
                style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
              />

              <div className="p-8 relative">
                {/* Ícone + período */}
                <div className="flex items-center gap-3 mb-6 relative">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${item.color}10`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <span
                    className="text-xs font-bold px-3 py-1 border"
                    style={{
                      borderColor: `${item.color}30`,
                      color: item.color,
                      backgroundColor: `${item.color}08`,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {item.period}
                  </span>
                </div>

                {/* Cargo / Curso */}
                <h3
                  className="text-2xl font-bold text-[#0A0A0A] dark:text-[#F0EFE9] mb-2 leading-tight relative"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {item.role}
                </h3>

                {/* Instituição */}
                <p className="text-sm font-medium text-[#6B6B6B] dark:text-[#888] mb-5 flex items-center gap-2 relative">
                  <span
                    className="inline-block w-4 h-px flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.org}
                </p>

                {/* Divider */}
                <div className="h-px bg-[#E5E5E0] dark:bg-[#1E1E1E] mb-5" />

                {/* Descrição */}
                <p className="text-sm text-[#6B6B6B] dark:text-[#888] leading-relaxed relative mb-5">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2.5 py-1 border"
                      style={{
                        backgroundColor: `${item.color}08`,
                        color: item.color,
                        borderColor: `${item.color}20`,
                        fontFamily: 'var(--font-mono)',
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
