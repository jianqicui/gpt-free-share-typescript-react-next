import CloseIcon from '@/icons/close.svg'

const Modal = (props: {
  title: string
  onClose?: () => void
  children?: any
  actions?: React.ReactNode[]
}) => {
  return (
    <div className="w-[80vw] min-w-[300px] max-w-[600px] rounded-[12px] bg-white text-[#303030] dark:bg-[#1E1E1E] dark:text-[#BBBBBB]">
      <div className="flex items-center justify-between border-b-[1px] border-solid border-[#DEDEDE] p-[20px] dark:border-[#FFFFFF1A]">
        <div className="text-[16px] font-bold">{props.title}</div>
        <div className="flex">
          <div
            className="cursor-pointer hover:brightness-200 dark:invert [&:not(:last-child)]:mr-[20px]"
            onClick={props.onClose}>
            <CloseIcon />
          </div>
        </div>
      </div>
      <div className="max-h-[40vh] overflow-auto p-[20px]">
        {props.children}
      </div>
      <div className="flex justify-end border-t-[1px] border-solid border-[#DEDEDE] p-[20px] dark:border-[#FFFFFF1A]">
        <div className="flex items-center">
          {props.actions?.map((action, i) => (
            <div key={i} className="[&:not(:last-child)]:mr-[20px]">
              {action}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Modal
