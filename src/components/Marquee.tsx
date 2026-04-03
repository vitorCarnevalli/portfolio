interface MarqueeProps {
  items: string[]
}

export function Marquee({ items }: MarqueeProps) {
  const doubledItems = [...items, ...items]

  return (
    <div className="relative overflow-hidden py-4">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 dark:from-slate-900/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 dark:from-slate-900/50 to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex gap-4 w-max">
        {doubledItems.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="px-5 py-2.5 glass rounded-full text-sm font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
