import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { dict } from './dict.js'

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'en'
    return localStorage.getItem('bmw_lang') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('bmw_lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggle = useCallback(() => setLang(l => (l === 'en' ? 'es' : 'en')), [])

  const t = useCallback((key) => {
    const node = key.split('.').reduce((acc, k) => (acc ? acc[k] : undefined), dict[lang])
    if (node === undefined) {
      const fallback = key.split('.').reduce((acc, k) => (acc ? acc[k] : undefined), dict.en)
      return fallback ?? key
    }
    return node
  }, [lang])

  return (
    <I18nContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
