import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { StoreKey } from '@/constants'
import { Locale, SettingsState, Theme } from '@/models/settingsModels'

const defaultSettingsState = {
  theme: Theme.Light
}

const useSettingsStore = create<SettingsState>()(
  persist(
    set => ({
      ...defaultSettingsState,

      setTheme: (theme: Theme) => set({ theme }),

      setLocale: (locale: Locale) => set({ locale }),

      reset: () => set({ ...defaultSettingsState })
    }),
    {
      name: StoreKey.Settings
    }
  )
)

export default useSettingsStore
