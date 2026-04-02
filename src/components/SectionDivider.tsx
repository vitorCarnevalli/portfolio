export function SectionDivider() {
  return (
    <div className="relative h-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 dark:via-blue-400/5 to-transparent" />
      <svg
        className="absolute bottom-0 w-full text-white dark:text-slate-900/50 opacity-50"
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
      >
        <path
          d="M0,20 C360,40 720,0 1080,20 C1260,30 1360,25 1440,20 L1440,40 L0,40 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}
