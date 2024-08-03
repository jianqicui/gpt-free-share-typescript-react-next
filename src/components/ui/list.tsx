const List = (props: { children: React.ReactNode }) => {
  return (
    <div className="mb-[20px] rounded-[10px] border-[1px] border-solid border-[#DEDEDE] bg-white dark:border-[#FFFFFF1A] dark:bg-[#1E1E1E]">
      {props.children}
    </div>
  )
}

export default List
