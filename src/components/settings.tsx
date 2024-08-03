'use client'

import { useRouter } from 'next/navigation'

import useChatStore from '@/store/chatStore'
import useSettingsStore from '@/store/settingsStore'
import useTranslation from '@/i18n'
import { Path } from '@/constants'
import { LangOptions, Locale, Theme } from '@/models/settingsModels'
import { showModal } from '@/utils'
// import { showModal } from '@/components/ui/modalUtil'
import Button from '@/components/ui/button'
import Select from '@/components/ui/select'
import List from '@/components/ui/list'
import ListItem from '@/components/ui/listItem'
import CloseIcon from '@/icons/close.svg'

const Settings = () => {
  const [locale, setLocale] = useSettingsStore(state => [
    state.locale!,
    state.setLocale
  ])
  const [theme, setTheme] = useSettingsStore(state => [
    state.theme,
    state.setTheme
  ])

  const { defaultLocale, t } = useTranslation()

  const router = useRouter()

  const resetSettings = useSettingsStore(state => state.reset)
  const resetChat = useChatStore(state => state.reset)

  const confirmButtonText = t(locale, 'UI.Confirm')
  const cancelButtonText = t(locale, 'UI.Cancel')

  const resetConfirmText = t(locale, 'Settings.Danger.Reset.Confirm')
  const clearConfirmText = t(locale, 'Settings.Danger.Clear.Confirm')

  return (
    <>
      <div className="flex items-center justify-between border-b-[1px] border-solid border-[#0000001A] px-[20px] py-[14px]">
        <div className="max-w-[calc(100%-100px)] overflow-hidden">
          <div className="max-w-[50vw] overflow-hidden text-ellipsis whitespace-nowrap text-[20px] font-bold">
            {t(locale, 'Settings.Title')}
          </div>
        </div>
        <div className="inline-flex">
          <div className="[&:not(:first-child)]:ml-[10px]">
            <Button
              icon={<CloseIcon />}
              bordered
              onClick={() => router.push(Path.Home)}
            />
          </div>
        </div>
      </div>
      <div className="overflow-auto p-[20px]">
        <List>
          <ListItem title={t(locale, 'Settings.Theme')}>
            <Select
              value={theme}
              onChange={e => {
                setTheme(e.target.value as Theme)
              }}>
              {Object.values(Theme).map(v => (
                <option value={v} key={v}>
                  {v}
                </option>
              ))}
            </Select>
          </ListItem>
          <ListItem title={t(locale, 'Settings.Lang')}>
            <Select
              value={locale}
              onChange={e => {
                setLocale(e.target.value as Locale)
              }}>
              {Object.values(Locale).map(v => (
                <option value={v} key={v}>
                  {LangOptions[v]}
                </option>
              ))}
            </Select>
          </ListItem>
        </List>
        <List>
          <ListItem
            title={t(locale, 'Settings.Danger.Reset.Title')}
            subTitle={t(locale, 'Settings.Danger.Reset.SubTitle')}>
            <Button
              text={t(locale, 'Settings.Danger.Reset.Action')}
              type="danger"
              onClick={async () => {
                if (
                  await showModal(
                    resetConfirmText,
                    confirmButtonText,
                    cancelButtonText
                  )
                ) {
                  resetSettings()

                  if (defaultLocale !== locale) {
                    setLocale(defaultLocale)
                  }
                }
              }}
            />
          </ListItem>
          <ListItem
            title={t(locale, 'Settings.Danger.Clear.Title')}
            subTitle={t(locale, 'Settings.Danger.Clear.SubTitle')}>
            <Button
              text={t(locale, 'Settings.Danger.Clear.Action')}
              type="danger"
              onClick={async () => {
                if (
                  await showModal(
                    clearConfirmText,
                    confirmButtonText,
                    cancelButtonText
                  )
                ) {
                  resetChat()
                }
              }}
            />
          </ListItem>
        </List>
      </div>
    </>
  )
}

export default Settings
