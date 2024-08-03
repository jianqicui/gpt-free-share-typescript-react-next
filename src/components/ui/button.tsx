import clsx from 'clsx'

type ButtonType = 'primary' | 'danger'

const buttonTypeClassName = {
  primary: 'bg-[#1D93AB] text-white',
  danger: 'bg-[#FF00001A] text-[#FF0000CC]'
}

const Button = (props: {
  icon?: JSX.Element
  text?: string
  bordered?: boolean
  className?: string
  type?: ButtonType
  autoFocus?: boolean
  onClick?: () => void
}) => {
  return (
    <button
      className={clsx(
        'flex cursor-pointer select-none items-center justify-between overflow-hidden rounded-[10px] p-[10px] outline-none transition-all duration-300 ease-in-out hover:brightness-90 focus:brightness-95',
        props.bordered &&
          'border-[1px] border-solid border-[#DEDEDE] dark:border-[#FFFFFF1A]',
        props.className,
        props.type
          ? buttonTypeClassName[props.type]
          : 'bg-white text-[#303030] dark:bg-[#1E1E1E] dark:text-[#BBBBBB]'
      )}
      role="button"
      onClick={props.onClick}
      autoFocus={props.autoFocus}>
      {props.icon && (
        <div className="h-[16px] w-[16px] dark:invert">{props.icon}</div>
      )}
      {props.text && (
        <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[12px] [&:not(:first-child)]:ml-[5px]">
          {props.text}
        </div>
      )}
    </button>
  )
}

export default Button
