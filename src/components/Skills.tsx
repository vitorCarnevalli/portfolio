import { motion } from 'framer-motion'
import { skills, tools } from '../data/skills'
import { SkillCard } from './SkillCard'

const toolIcons: Record<string, string> = {
  'Git':     'devicon-git-plain colored',
  'MongoDB': 'devicon-mongodb-plain colored',
  'VS Code': 'devicon-vscode-plain colored',
}

interface SkillsProps {
  t: (key: string) => string
}

export function Skills({ t }: SkillsProps) {
  return (
    <section id="skills" className="py-24 px-8 lg:px-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/20 dark:via-blue-950/08 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-14 max-w-xl"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0A0A0A] dark:text-[#F0EFE9] mb-3 tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('skills.title')}
          </h2>
          <div className="w-12 h-[2px] bg-[#0066FF] mb-3" />
          <p className="text-[#6B6B6B] dark:text-[#888] text-lg">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
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
          <h3 className="text-center text-xs font-bold text-[#6B6B6B] dark:text-[#555] uppercase tracking-widest mb-6" style={{ fontFamily: 'var(--font-mono)' }}>
            {t('skills.tools')}
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {tools.map((tool) => (
              <span
                key={tool}
                className="flex items-center gap-2.5 px-5 py-2.5 border border-[#E5E5E0] dark:border-[#1E1E1E] bg-[#FFFFFF] dark:bg-[#111111] text-sm font-medium text-[#6B6B6B] dark:text-[#888] hover:text-[#0066FF] dark:hover:text-[#0066FF] transition-colors"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {toolIcons[tool] ? (
                  <i className={`${toolIcons[tool]} text-base`} />
                ) : (
                  <span className="font-mono text-xs font-bold text-emerald-500 leading-none select-none">&gt;_</span>
                )}
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
