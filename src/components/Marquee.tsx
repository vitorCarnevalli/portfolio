interface MarqueeProps {
  items: string[]
}

export function Marquee({ items }: MarqueeProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center py-4">
      {items.map((item, i) => (
        <span
          key={i}
          className="px-5 py-2.5 glass rounded-full text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
        >
          {item}
        </span>
      ))}
    </div>
  )
}
