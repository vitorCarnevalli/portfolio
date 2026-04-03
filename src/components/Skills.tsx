import { motion } from 'framer-motion'
import { skills, tools } from '../data/skills'
import { SkillCard } from './SkillCard'
import { Marquee } from './Marquee'

interface SkillsProps {
  t: (key: string) => string
}

export function Skills({ t }: SkillsProps) {
  return (
    <section id="skills" className="py-24 px-8 lg:px-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-50/50 dark:via-amber-950/10 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header — left aligned on desktop */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-xl"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('skills.title')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        {/* 4 cols on large desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
          {skills.map((skill, i) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              levelLabel={t(`skills.levels.${skill.level}`)}
              index={i}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-center text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
            {t('skills.tools')}
          </h3>
          <Marquee items={tools} />
        </motion.div>
      </div>
    </section>
  )
}
