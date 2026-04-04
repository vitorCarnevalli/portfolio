import { motion } from 'framer-motion'
import type { Skill } from '../data/skills'

interface SkillCardProps {
  skill: Skill
  levelLabel: string
  index: number
}

export function SkillCard({ skill, levelLabel, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative p-6 rounded-2xl glass hover:shadow-xl transition-shadow duration-300 cursor-default overflow-hidden"
      style={{ borderLeft: `3px solid ${skill.color}` }}
    >
      {/* Watermark icon */}
      <div className="absolute -right-3 -top-2 opacity-[0.06] pointer-events-none select-none" aria-hidden>
        <i className={`${skill.icon} text-[7rem]`} />
      </div>

      {/* Header: icon + badge */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <i className={`${skill.icon} text-3xl`} />
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full bg-[#0A0A0A]/[0.06] text-[#0A0A0A] dark:bg-[#F0EFE9]/[0.08] dark:text-[#F0EFE9]"
        >
          {levelLabel}
        </span>
      </div>

      {/* Skill name */}
      <h3
        className="text-2xl font-bold text-[#0A0A0A] dark:text-[#F0EFE9] relative z-10"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {skill.name}
      </h3>
    </motion.div>
  )
}
