export enum Theme {
  Light = 'light',
  Dark = 'dark'
}

export enum Locale {
  EN = 'en',
  CN = 'cn'
}

export const LangOptions = {
  [Locale.EN]: 'English',
  [Locale.CN]: '简体中文'
}

export interface SettingsState {
  theme: Theme
  locale?: Locale
  setTheme: (theme: Theme) => void
  setLocale: (locale: Locale) => void
  reset: () => void
}
