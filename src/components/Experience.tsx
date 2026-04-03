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
              {/* Top meta row */}
              <div className="flex items-baseline justify-between mb-3">
                <span
                  className="text-xs text-[#6B6B6B] dark:text-[#555] tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {item.org} — {item.period}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#0A0A0A] dark:bg-[#F0EFE9] mb-6" />

              {/* Role — newspaper headline */}
              <h3
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#0A0A0A] dark:text-[#F0EFE9] mb-8"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {item.role}
              </h3>

              {/* Description */}
              <p className="text-base text-[#6B6B6B] dark:text-[#888] leading-relaxed max-w-2xl mb-6">
                {item.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-14">
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
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
