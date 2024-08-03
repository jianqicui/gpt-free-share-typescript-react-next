import { fetchEventSource } from '@microsoft/fetch-event-source'

import { ChatOptions } from '@/models/chatModels'

type ChatPayload = { method: string; body: string }

const chat = async (options: ChatOptions) => {
  const stream = options.stream
  const content = options.content

  const reqBodyJson = {
    stream,
    content
  }

  try {
    const chatPath = '/api/chat'

    const chatPayload = {
      method: 'POST',
      body: JSON.stringify(reqBodyJson)
    }

    if (stream) {
      chatWithStreaming(chatPath, chatPayload, options)
    } else {
      await chatWithoutStreaming(chatPath, chatPayload, options)
    }
  } catch (e) {
    options.onError?.(e as Error)
  }
}

const chatWithStreaming = (
  chatPath: string,
  chatPayload: ChatPayload,
  options: ChatOptions
) => {
  const remainingTextList: string[] = []
  const responseTextList: string[] = []

  const animateResponseText = () => {
    if (remainingTextList.length > 0) {
      const responseText = remainingTextList.shift()

      responseTextList.push(responseText!)

      options.onText(responseTextList.join(''))
    }

    requestAnimationFrame(animateResponseText)
  }

  animateResponseText()

  fetchEventSource(chatPath, {
    ...chatPayload,
    openWhenHidden: true,
    async onopen(res) {
      const contentType = res.headers.get('content-type')

      if (contentType !== 'text/event-stream') {
        return
      }
    },
    onmessage(msg) {
      if (msg.data === '[DONE]') {
        options.onText(null)

        return
      }

      const text = msg.data
      const json = JSON.parse(text)
      const content = json.choices?.[0]?.delta?.content

      if (content) {
        remainingTextList.push(...content.split(''))
      }
    },
    onclose() {
      if (responseTextList.length > 0) {
        options.onText(null)
      } else {
        options.onError?.(new Error('Empty response from server'))
      }
    },
    onerror(e) {
      options.onError?.(e)
    }
  })
}

const chatWithoutStreaming = async (
  chatPath: string,
  chatPayload: ChatPayload,
  options: ChatOptions
) => {
  const res = await fetch(chatPath, chatPayload)

  const resJson = await res.json()
  const text = resJson.choices?.[0]?.message?.content

  if (text) {
    options.onText(text)
  }
}

export { chat }
