import { useScroll, useTransform, motion } from 'framer-motion'

export function BackgroundGrid() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <motion.div
      style={{ y }}
      className="fixed inset-0 -z-20 opacity-[0.12] dark:opacity-[0.08] pointer-events-none"
    >
      <svg width="100%" height="100%">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="#f59e0b" />
          </pattern>
        </defs>
        <rect width="100%" height="200%" fill="url(#grid)" />
      </svg>
    </motion.div>
  )
}
