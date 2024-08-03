import { Locale } from '@/models/settingsModels'
import en from '@/i18n/en'
import cn from '@/i18n/cn'

const translations = {
  [Locale.EN]: en,
  [Locale.CN]: cn
}

const getDefaultLocale = () => {
  try {
    const language = navigator.language

    const locale = language
      .substring(language.length - 2)
      .toLowerCase() as Locale

    return locale
  } catch {
    return Locale.EN
  }
}

const getLang = (locale: Locale) => {
  return locale === Locale.CN ? 'zh-Hans' : (locale as string)
}

function getTranslation(obj: any, path: string): any {
  return path.split('.').reduce((o, i) => (o ? o[i] : undefined), obj)
}

const useTranslation = () => {
  const defaultLocale = getDefaultLocale()

  const t = (locale: Locale, key: string) =>
    getTranslation(translations[locale], key)

  return { defaultLocale, getLang, t }
}

export default useTranslation
