'use client'

import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { useState, useRef, useEffect, RefObject } from 'react'

import useChatStore from '@/store/chatStore'
import useSettingsStore from '@/store/settingsStore'
import useTranslation from '@/i18n'
import { ChatMessageRole } from '@/models/chatModels'
import Button from '@/components/ui/button'
import BotIcon from '@/icons/bot.svg'
import LoadingIcon from '@/icons/three-dots.svg'
import SendWhiteIcon from '@/icons/send-white.svg'

const Markdown = dynamic(() => import('@/components/ui/markdown'), {
  loading: () => <LoadingIcon />
})

const useScrollToBottom = (scrollRef: RefObject<HTMLDivElement>) => {
  const scrollDomToBottom = () => {
    const dom = scrollRef.current

    if (dom) {
      requestAnimationFrame(() => {
        dom.scrollTo(0, dom.scrollHeight)
      })
    }
  }

  useEffect(() => {
    scrollDomToBottom()
  })

  return {
    scrollDomToBottom
  }
}

const Chat = () => {
  const locale = useSettingsStore(state => state.locale!)
  const [activeSession, setSessionTitle, chatUserInput] = useChatStore(
    state => [state.activeSession, state.setSessionTitle, state.chatUserInput]
  )

  const { t } = useTranslation()

  const session = activeSession()
  const messages = session.messages

  const userInputRef = useRef<HTMLTextAreaElement>(null)
  const [userInput, setUserInput] = useState('')

  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollDomToBottom } = useScrollToBottom(scrollRef)

  const scrollToBottom = () => {
    scrollDomToBottom()
  }

  const onUserInput = (text: string) => {
    setUserInput(text)
  }

  const onUserInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      doSubmit()
      e.preventDefault()
    }
  }

  const doSubmit = () => {
    if (userInput.trim() === '') {
      return
    }

    if (messages.length === 0) {
      const topicContent = userInput + '\n' + t(locale, 'Store.Prompt.Topic')

      setSessionTitle(topicContent)
    }

    chatUserInput(userInput)

    setUserInput('')
    userInputRef.current?.focus()
  }

  useEffect(() => {
    userInputRef.current?.focus()
  }, [session.id])

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b-[1px] border-solid border-[#0000001A] px-[20px] py-[14px]">
        <div className="max-w-[calc(100%-100px)] overflow-hidden">
          <div className="max-w-[50vw] overflow-hidden text-ellipsis whitespace-nowrap text-[20px] font-bold">
            {session.topic || t(locale, 'Store.DefaultTopic')}
          </div>
        </div>
      </div>
      <div
        className="pb-[40px flex-1 overflow-auto overflow-x-hidden overscroll-none p-[20px]"
        ref={scrollRef}
        onMouseDown={() => userInputRef.current?.blur()}>
        {messages.map(message => {
          return (
            <div
              key={message.id}
              className={clsx(
                'flex',
                message.role === ChatMessageRole.USER
                  ? 'flex-row-reverse'
                  : 'flex-row'
              )}>
              <div
                className={clsx(
                  'flex max-w-[80%] flex-col',
                  message.role === ChatMessageRole.USER
                    ? 'items-end'
                    : 'items-start'
                )}>
                {message.role === ChatMessageRole.BOT && (
                  <div className="mt-[20px] flex items-center">
                    <BotIcon />
                  </div>
                )}
                <div
                  className={clsx(
                    'mt-[10px] max-w-full select-text break-all rounded-[10px] border-[#DEDEDE] p-[10px] text-[14px] transition-all duration-300 ease-in-out dark:border-[#FFFFFF1A]',
                    message.role === ChatMessageRole.USER &&
                      'bg-[#E7F8FF] dark:bg-[#1B262A]'
                  )}>
                  {message.content.length === 0 ? (
                    <LoadingIcon />
                  ) : (
                    <Markdown content={message.content} />
                  )}
                </div>
                <div className="duration-600 z-1 pointer-events-none w-full whitespace-nowrap pr-[10px] text-right text-[12px] text-[#303030] opacity-20 transition-all ease-in-out dark:text-[#BBBBBB]">
                  {new Date(message.date).toLocaleString()}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="relative w-full flex-col border-t-[1px] border-solid border-[#DEDEDE] p-[20px] pt-[10px] dark:border-[#FFFFFF1A]">
        <label
          className="flex flex-1 cursor-text rounded-[10px] border-[1px] border-solid border-[#DEDEDE] dark:border-[#FFFFFF1A]"
          htmlFor="chat-input">
          <textarea
            id="chat-input"
            className="h-full min-h-[68px] w-full resize-none rounded-[10px] border bg-white py-[10px] pl-[14px] pr-[90px] text-[#303030] outline-none focus:border-[#1D93AB] dark:bg-[#1E1E1E] dark:text-[#BBBBBB]"
            ref={userInputRef}
            value={userInput}
            placeholder={t(locale, 'Chat.Input')}
            onInput={e => onUserInput(e.currentTarget.value)}
            onKeyDown={onUserInputKeyDown}
            onFocus={scrollToBottom}
            onClick={scrollToBottom}
          />
          <Button
            icon={
              <div className="dark:invert">
                <SendWhiteIcon className="fill-white" />
              </div>
            }
            text={t(locale, 'Chat.Send')}
            className="absolute bottom-[36px] right-[30px] border-[#1D93AB]"
            type="primary"
            onClick={() => doSubmit()}
          />
        </label>
      </div>
    </div>
  )
}

export default Chat
