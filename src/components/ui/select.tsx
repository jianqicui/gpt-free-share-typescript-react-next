import DownIcon from '@/icons/down.svg'

const Select = (
  props: React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >
) => {
  const { children, ...otherProps } = props

  return (
    <div className="relative max-w-fit">
      <select
        className="h-full cursor-pointer appearance-none rounded-[10px] border-[1px] border-solid border-[#DEDEDE] bg-white py-[10px] pl-[10px] pr-[35px] text-center text-[#303030] outline-none dark:border-[#FFFFFF1A] dark:bg-[#1E1E1E] dark:text-[#BBBBBB]"
        {...otherProps}>
        {children}
      </select>
      <DownIcon className="pointer-events-none absolute right-[10px] top-[50%] -translate-y-[50%] transform" />
    </div>
  )
}

export default Select
