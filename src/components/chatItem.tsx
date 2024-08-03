import clsx from 'clsx'
import { usePathname } from 'next/navigation'

import useSettingsStore from '@/store/settingsStore'
import useTranslation from '@/i18n'
import { Path } from '@/constants'
import DeleteIcon from '@/icons/delete.svg'

const ChatItem = (props: {
  title: string
  messageCount: number
  time: string
  selected: boolean
  onClick: () => void
  onDelete: () => void
}) => {
  const locale = useSettingsStore(state => state.locale!)
  const { t } = useTranslation()

  const pathname = usePathname()

  return (
    <div
      className={clsx(
        'group relative mb-[10px] cursor-pointer rounded-[10px] border-solid bg-white px-[14px] py-[10px] hover:bg-[#f3f3f3] dark:bg-[#1E1E1E] dark:hover:bg-[#323232]',
        props.selected &&
          pathname === Path.Home &&
          'border-[2px] border-[#1D93AB]'
      )}
      onClick={props.onClick}>
      <div className="w-[calc(100%-15px)] overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-bold">
        {props.title}
      </div>
      <div className="mt-[8px] flex justify-between text-[12px] text-[#A6A6A6]">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">
          {t(locale, 'ChatItem.ChatItemCount')(props.messageCount)}
        </div>
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">
          {props.time}
        </div>
      </div>

      <div
        className="absolute right-[4px] top-[4px] cursor-pointer opacity-0 transition-all duration-300 ease-in-out group-hover:-translate-x-[2px] group-hover:transform group-hover:opacity-50 group-hover:hover:opacity-100"
        onClick={e => {
          props.onDelete()
          e.stopPropagation()
        }}>
        <DeleteIcon />
      </div>
    </div>
  )
}

export default ChatItem
