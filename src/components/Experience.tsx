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
      tags: tArray('experience.puc.tags'),
    },
    {
      index: '02',
      period: t('experience.unicamp.period'),
      role: t('experience.unicamp.role'),
      org: t('experience.unicamp.org'),
      description: t('experience.unicamp.description'),
      tags: tArray('experience.unicamp.tags'),
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
          className="mb-16 flex items-baseline gap-6"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0A0A0A] dark:text-[#F0EFE9] tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('experience.title')}
          </h2>
          <div className="flex-1 h-px bg-[#E5E5E0] dark:bg-[#1E1E1E] self-center" />
        </motion.div>

        {/* Items */}
        <div>
          {items.map((item, i) => (
            <motion.article
              key={item.index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            >
              {/* Separador superior */}
              <div className="h-px bg-[#E5E5E0] dark:bg-[#1E1E1E] mb-8" />

              {/* Grid CV: coluna esquerda fixa + coluna direita flex */}
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-12 mb-12">

                {/* Coluna esquerda: período + organização */}
                <div className="flex flex-row md:flex-col gap-2 md:gap-1">
                  <span
                    className="text-xs text-[#6B6B6B] dark:text-[#888] tracking-widest uppercase"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {item.period}
                  </span>
                  <span
                    className="text-xs text-[#6B6B6B] dark:text-[#888] tracking-widest uppercase font-semibold"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {item.org}
                  </span>
                </div>

                {/* Coluna direita: cargo + descrição + tags */}
                <div>
                  <h3
                    className="text-2xl font-bold text-[#0A0A0A] dark:text-[#F0EFE9] leading-tight tracking-tight mb-3"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.role}
                  </h3>

                  <p className="text-base text-[#6B6B6B] dark:text-[#888] leading-relaxed mb-5">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2.5 py-1 border border-[#E5E5E0] dark:border-[#1E1E1E] text-[#6B6B6B] dark:text-[#888]"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}

          {/* Separador final */}
          <div className="h-px bg-[#E5E5E0] dark:bg-[#1E1E1E]" />
        </div>
      </div>
    </section>
  )
}
