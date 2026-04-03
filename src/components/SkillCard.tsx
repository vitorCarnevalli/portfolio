import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import type { Skill } from '../data/skills'

interface SkillCardProps {
  skill: Skill
  levelLabel: string
  index: number
}

export function SkillCard({ skill, levelLabel, index }: SkillCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const circumference = 2 * Math.PI * 36
  const offset = circumference - (skill.percentage / 100) * circumference

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative p-5 rounded-2xl glass hover:shadow-xl transition-shadow duration-300 cursor-default"
      style={{
        boxShadow: `0 0 0 0px ${skill.color}00`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px -8px ${skill.color}40, 0 0 0 1px ${skill.color}30`
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0px ${skill.color}00`
      }}
    >
      <div className="flex items-center gap-4">
        {/* Logo + radial progress */}
        <div className="relative w-20 h-20 flex-shrink-0">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
            <circle
              cx="40" cy="40" r="36"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-slate-200 dark:text-slate-700"
            />
            <motion.circle
              cx="40" cy="40" r="36"
              fill="none"
              stroke={skill.color}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={isInView ? { strokeDashoffset: offset } : {}}
              transition={{ duration: 1.2, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <i className={`${skill.icon} text-2xl`} />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
            {skill.name}
          </h3>
          <span
            className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: `${skill.color}15`,
              color: skill.color,
            }}
          >
            {levelLabel}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
