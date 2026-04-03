import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import type { Skill } from '../data/skills'
import { levelPercentage } from '../data/skills'

interface SkillCardProps {
  skill: Skill
  levelLabel: string
  index: number
}

export function SkillCard({ skill, levelLabel, index }: SkillCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const percentage = levelPercentage[skill.level]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative p-6 rounded-2xl glass hover:shadow-xl transition-shadow duration-300 cursor-default overflow-hidden"
      style={{ borderLeft: `3px solid ${skill.color}` }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px -8px ${skill.color}40, 0 0 0 1px ${skill.color}20`
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = ''
      }}
    >
      {/* Watermark icon */}
      <div className="absolute -right-3 -top-2 opacity-[0.06] pointer-events-none select-none" aria-hidden>
        <i className={`${skill.icon} text-[7rem]`} />
      </div>

      {/* Header: icon + badge */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <i className={`${skill.icon} text-3xl`} />
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ backgroundColor: `${skill.color}18`, color: skill.color }}
        >
          {levelLabel}
        </span>
      </div>

      {/* Skill name */}
      <h3
        className="text-2xl font-bold text-[#0A0A0A] dark:text-[#F0EFE9] mb-5 relative z-10"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {skill.name}
      </h3>

      {/* Progress bar */}
      <div className="relative z-10">
        <div className="h-1.5 bg-[#E5E5E0] dark:bg-[#1E1E1E] overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: skill.color }}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${percentage}%` } : {}}
            transition={{ duration: 1.2, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
          />
        </div>
        <div className="flex justify-end mt-1.5">
          <span className="text-xs font-medium tabular-nums" style={{ color: skill.color }}>
            {percentage}%
          </span>
        </div>
      </div>
    </motion.div>
  )
}
