import { useState, useCallback } from 'react'
import pt from '../i18n/pt.json'
import en from '../i18n/en.json'

type Lang = 'pt' | 'en'

const translations = { pt, en } as const

export function useLanguage() {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem('lang') as Lang) || 'pt'
  })
  const [isFadingOut, setIsFadingOut] = useState(false)

  const toggleLang = useCallback(() => {
    setIsFadingOut(true)
  }, [])

  const onFadeOutComplete = useCallback(() => {
    setLang(prev => {
      const next = prev === 'pt' ? 'en' : 'pt'
      localStorage.setItem('lang', next)
      return next
    })
    setIsFadingOut(false)
  }, [])

  const resolve = useCallback((key: string): unknown => {
    const keys = key.split('.')
    let value: unknown = translations[lang]
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = (value as Record<string, unknown>)[k]
      } else {
        return key
      }
    }
    return value
  }, [lang])

  const t = useCallback((key: string): string => {
    const value = resolve(key)
    return typeof value === 'string' ? value : key
  }, [resolve])

  const tArray = useCallback((key: string): string[] => {
    const value = resolve(key)
    return Array.isArray(value) ? (value as string[]) : []
  }, [resolve])

  return { lang, toggleLang, t, tArray, isFadingOut, onFadeOutComplete }
}
