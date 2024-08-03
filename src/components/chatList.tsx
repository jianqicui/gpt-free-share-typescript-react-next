import { useRouter } from 'next/navigation'

import useChatStore from '@/store/chatStore'
import useSettingsStore from '@/store/settingsStore'
import useTranslation from '@/i18n'
import { Path } from '@/constants'
import ChatItem from '@/components/chatItem'

const ChatList = () => {
  const locale = useSettingsStore(state => state.locale!)
  const [sessions, selectSession, deleteSession] = useChatStore(state => [
    state.sessions,
    state.selectSession,
    state.deleteSession
  ])

  const { t } = useTranslation()

  const router = useRouter()

  return (
    <div>
      {sessions.map(session => (
        <ChatItem
          key={session.id}
          title={session.topic || t(locale, 'Store.DefaultTopic')}
          messageCount={session.messages.length}
          time={new Date(session.lastUpdateTime).toLocaleString()}
          selected={session.active}
          onClick={() => {
            router.push(Path.Home)

            selectSession(session.id)
          }}
          onDelete={() => {
            deleteSession(session.id)
          }}
        />
      ))}
    </div>
  )
}

export default ChatList
