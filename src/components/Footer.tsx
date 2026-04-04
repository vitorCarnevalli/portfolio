interface FooterProps {
  t: (key: string) => string
}

export function Footer({ t }: FooterProps) {
  return (
    <footer className="relative overflow-hidden">
      <div className="h-px bg-[#E5E5E0] dark:bg-[#1E1E1E]" />
      <div className="py-8 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#AAAAAA] dark:text-[#555]" style={{ fontFamily: 'var(--font-mono)' }}>
            &copy; {new Date().getFullYear()} Vitor Almeida &middot; {t('footer.rights')}
          </p>
          <p className="text-xs text-[#AAAAAA] dark:text-[#555]" style={{ fontFamily: 'var(--font-mono)' }}>
            {t('footer.madeWith')}
          </p>
        </div>
      </div>
    </footer>
  )
}
