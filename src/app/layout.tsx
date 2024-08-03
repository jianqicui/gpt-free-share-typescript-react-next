import type { Metadata } from 'next'

import '@/styles/globals.css'
import '@/styles/markdown.scss'

export const metadata: Metadata = {
  title: 'GPT Free Share',
  description: 'OpenAI API sharing solution'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body className="m-0 flex h-screen w-screen select-none items-center justify-center overflow-hidden p-0">
        {children}
      </body>
    </html>
  )
}
