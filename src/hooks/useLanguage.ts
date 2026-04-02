import { useState, useCallback } from 'react'
import pt from '../i18n/pt.json'
import en from '../i18n/en.json'

type Lang = 'pt' | 'en'

const translations = { pt, en } as const

export function useLanguage() {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem('lang') as Lang) || 'pt'
  })

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const next = prev === 'pt' ? 'en' : 'pt'
      localStorage.setItem('lang', next)
      return next
    })
  }, [])

  const t = useCallback((key: string): string => {
    const keys = key.split('.')
    let value: unknown = translations[lang]
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = (value as Record<string, unknown>)[k]
      } else {
        return key
      }
    }
    return typeof value === 'string' ? value : key
  }, [lang])

  return { lang, toggleLang, t }
}
