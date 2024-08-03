import { nanoid } from 'nanoid'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { StoreKey } from '@/constants'
import {
  ChatMessage,
  ChatMessageRole,
  ChatSession,
  ChatState
} from '@/models/chatModels'
import { chat } from '@/client/chatClient'
import { prettyObject } from '@/utils'

const createEmptySession = (): ChatSession => {
  return {
    id: nanoid(),
    messages: [],
    lastUpdateTime: Date.now(),
    active: true
  }
}

const getActiveSession = (sessions: ChatSession[]) => {
  return sessions.find(s => s.active)!
}

const setActiveSession = (sessions: ChatSession[], sessionId: string) => {
  const foundSession = sessions.find(session => session.id === sessionId)

  if (foundSession) {
    sessions.forEach(session => {
      session.active = session.id === sessionId
    })
  }
}

const createMessage = (role: ChatMessageRole, content: string): ChatMessage => {
  return {
    id: nanoid(),
    date: Date.now(),
    role,
    content
  }
}

const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      sessions: [createEmptySession()],

      activeSession: () => {
        const sessions = get().sessions

        return getActiveSession(sessions)
      },

      selectSession: (sessionId: string) => {
        const sessions = get().sessions

        setActiveSession(sessions, sessionId)

        set({ sessions })
      },

      deleteSession: (sessionId: string) => {
        const filteredSessions = get().sessions.filter(
          session => session.id !== sessionId
        )

        if (filteredSessions.length === 0) {
          filteredSessions.push(createEmptySession())
        } else {
          filteredSessions[0].active = true
        }

        set({ sessions: filteredSessions })
      },

      newSession: () => {
        const sessions = get().sessions
        const session = createEmptySession()

        sessions.unshift(session)

        setActiveSession(sessions, session.id)

        set({ sessions })
      },

      setSessionTitle: (topicContent: string) => {
        const sessions = get().sessions
        const session = getActiveSession(sessions)

        const options = {
          stream: false,
          content: topicContent,

          onText(text: string | null) {
            if (text) {
              session.topic = text

              set({ sessions })
            }
          }
        }

        chat(options)
      },

      chatUserInput: (userContent: string) => {
        const sessions = get().sessions
        const session = getActiveSession(sessions)
        const messages = session.messages

        const userMessage = createMessage(ChatMessageRole.USER, userContent)
        const botMessage = createMessage(ChatMessageRole.BOT, '')

        messages.push(userMessage, botMessage)

        const options = {
          stream: true,
          content: userContent,

          onText(text: string | null) {
            if (text) {
              botMessage.content = text
            } else {
              session.lastUpdateTime = Date.now()
            }

            set({ sessions })
          },

          onError(error: Error) {
            botMessage.content +=
              '\n\n' +
              prettyObject({
                error: true,
                message: error.message
              })

            set({ sessions })
          }
        }

        chat(options)
      },

      reset: () => set({ sessions: [createEmptySession()] })
    }),
    {
      name: StoreKey.Chat
    }
  )
)

export default useChatStore
