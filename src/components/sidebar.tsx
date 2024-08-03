import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import useChatStore from '@/store/chatStore'
import useSettingsStore from '@/store/settingsStore'
import useTranslation from '@/i18n'
import { Path } from '@/constants'
import { Theme } from '@/models/settingsModels'
import Button from '@/components/ui/button'
import AddIcon from '@/icons/add.svg'
import ChatGptIcon from '@/icons/chatgpt.svg'
import SettingsIcon from '@/icons/settings.svg'

const ChatList = dynamic(() => import('@/components/chatList'), {
  loading: () => null
})

const useSwitchTheme = () => {
  const theme = useSettingsStore(state => state.theme)

  if (theme === Theme.Light) {
    document.body.classList.remove('dark')
  } else if (theme === Theme.Dark) {
    document.body.classList.add('dark')
  }

  document.body.setAttribute('data-theme', theme)
}

const useHtmlLang = () => {
  const [locale, setLocale] = useSettingsStore(state => [
    state.locale,
    state.setLocale
  ])

  const { defaultLocale, getLang } = useTranslation()

  let lang

  if (locale) {
    lang = getLang(locale)
  } else {
    setLocale(defaultLocale)

    lang = getLang(defaultLocale)
  }

  const htmlLang = document.documentElement.lang

  if (lang !== htmlLang) {
    document.documentElement.lang = lang
  }
}

const Sidebar = () => {
  useSwitchTheme()
  useHtmlLang()

  const locale = useSettingsStore(state => state.locale!)

  const { t } = useTranslation()

  const newSession = useChatStore(state => state.newSession)

  const router = useRouter()

  const startChat = () => {
    newSession()

    router.push(Path.Home)
  }

  return (
    <div className="flex h-full w-full flex-col bg-[#E7F8FF] p-[20px] dark:bg-[#1B262A]">
      <div className="flex justify-between pb-[20px] pt-[20px]">
        <div>
          <div className="text-[20px] font-bold">GPT Free Share</div>
          <div className="text-[12px] font-normal">
            OpenAI API sharing solution.
          </div>
        </div>
        <ChatGptIcon />
      </div>

      <div className="flex-1 overflow-auto overflow-x-hidden">
        <ChatList />
      </div>

      <div className="flex justify-between pt-[20px]">
        <div className="inline-flex">
          <div className="[&:not(:last-child)]:mr-[15px]">
            <Link href={Path.Settings}>
              <Button icon={<SettingsIcon />} />
            </Link>
          </div>
        </div>
        <div>
          <Button
            icon={<AddIcon />}
            text={t(locale, 'Home.NewChat')}
            onClick={() => startChat()}
          />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
