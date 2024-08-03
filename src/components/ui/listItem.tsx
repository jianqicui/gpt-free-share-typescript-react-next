const ListItem = (props: {
  title: string
  subTitle?: string
  children?: JSX.Element | JSX.Element[]
}) => {
  return (
    <div className="flex min-h-[40px] items-center justify-between border-b-[1px] border-solid border-[#DEDEDE] px-[20px] py-[10px] last:border-none dark:border-[#FFFFFF1A]">
      <div className="text-[14px] font-bold">
        <div>{props.title}</div>
        {props.subTitle && (
          <div className="text-[12px] font-normal">{props.subTitle}</div>
        )}
      </div>
      {props.children}
    </div>
  )
}

export default ListItem
