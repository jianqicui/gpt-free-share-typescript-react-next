import { RefObject, useEffect, useRef } from 'react'

import hljs from 'highlight.js'
import renderMathInElement from 'katex/dist/contrib/auto-render'
import { marked } from 'marked'
import 'katex/dist/katex.min.css'

import useSettingsStore from '@/store/settingsStore'

marked.use({
  pedantic: false,
  gfm: true,
  breaks: true
})

hljs.configure({
  ignoreUnescapedHTML: true,
  throwUnescapedHTML: false
})

const replaceText = (text: string, prefix: string, suffix: string) => {
  const replacedText = text.replace(/\n/g, '')

  return `${prefix}${replacedText}${suffix}`
}

const escapeDelimiter = (
  content: string,
  pattern: RegExp,
  prefix: string,
  suffix: string
) => {
  return content.replace(pattern, (_, text) =>
    replaceText(text, prefix, suffix)
  )
}

const escapeDollars = (content: string) => {
  const pattern = /\$\$([\s\S]*?)\$\$/g

  return escapeDelimiter(content, pattern, '$$', '$$')
}

const escapeBrackets = (content: string) => {
  const pattern = /\\\[([\s\S]*?)\\\]/g

  return escapeDelimiter(content, pattern, '$$', '$$')
}

const escapeParentheses = (content: string) => {
  const pattern = /\\\(([\s\S]*?)\\\)/g

  return escapeDelimiter(content, pattern, '$', '$')
}

const escapeContent = (content: string) => {
  const escapedContent = escapeParentheses(
    escapeBrackets(escapeDollars(content))
  )

  return escapedContent
}

const useSetStyle = (divRef: RefObject<HTMLDivElement>) => {
  const theme = useSettingsStore(state => state.theme)

  useEffect(() => {
    const element = divRef.current!
    const parentElement = element.parentElement!

    const computedStyle = window.getComputedStyle(parentElement)

    const backgroundColor = computedStyle.backgroundColor
    const fontSize = computedStyle.fontSize
    const fontFamily = computedStyle.fontFamily

    element.style.backgroundColor = backgroundColor
    element.style.fontSize = fontSize
    element.style.fontFamily = fontFamily
  }, [theme, divRef])
}

const useSetContent = (content: string, divRef: RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const escapedContent = escapeContent(content)
    const htmlContent = marked.parse(escapedContent) as string

    const element = divRef.current!
    element.innerHTML = htmlContent

    renderMathInElement(element, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\[', right: '\\]', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false }
      ],
      throwOnError: false
    })

    element.querySelectorAll('pre code').forEach(e => {
      try {
        hljs.highlightElement(e as HTMLElement)
      } catch {}
    })
  }, [content, divRef])
}

const Markdown = (props: { content: string }) => {
  const markdownDivRef = useRef<HTMLDivElement>(null)

  useSetStyle(markdownDivRef)
  useSetContent(props.content, markdownDivRef)

  return <div ref={markdownDivRef} className="markdown-body" dir="auto" />
}

export default Markdown
