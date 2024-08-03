'use client'

import { useState, useEffect } from 'react'

import Sidebar from '@/components/sidebar'
import BotIcon from '@/icons/bot.svg'
import LoadingIcon from '@/icons/three-dots.svg'

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <BotIcon />
      <LoadingIcon />
    </div>
  )
}

const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false)

  useEffect(() => {
    setHasHydrated(true)
  }, [])

  return hasHydrated
}

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="bg-[#FAFAFA] dark:bg-[#151515]">
      {useHasHydrated() ? (
        <div className="flex h-[90vh] min-h-[370px] w-[90vw] min-w-[600px] max-w-[1200px] overflow-hidden rounded-[20px] border-[1px] border-solid border-[#DEDEDE] bg-white text-[#303030] dark:border-[#FFFFFF1A] dark:bg-[#1E1E1E] dark:text-[#BBBBBB]">
          <div className="w-[300px]">
            <Sidebar />
          </div>
          <div className="w-[calc(100%-300px)]">{children}</div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Layout
