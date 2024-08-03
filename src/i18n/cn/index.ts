const cn = {
  ChatItem: {
    ChatItemCount: (count: number) => `${count} 条对话`
  },
  Chat: {
    Input: 'Enter 发送，Shift + Enter 换行',
    Send: '发送'
  },
  Home: {
    NewChat: '新的聊天'
  },
  Settings: {
    Title: '设置',
    Theme: '主题',
    Lang: '语言',
    Danger: {
      Reset: {
        Title: '重置所有设置',
        SubTitle: '重置所有设置项回默认值',
        Action: '立即重置',
        Confirm: '确认重置所有设置？'
      },
      Clear: {
        Title: '清除所有聊天记录',
        SubTitle: '清除所有聊天记录',
        Action: '立即清除',
        Confirm: '确认清除所有聊天记录？'
      }
    }
  },
  Store: {
    DefaultTopic: '新的聊天',
    Prompt: {
      Topic: '使用三到四个字直接返回上面这句话的主题，要求简短、不要标点符号。'
    }
  },
  UI: {
    Confirm: '确认',
    Cancel: '取消'
  }
}

export default cn
