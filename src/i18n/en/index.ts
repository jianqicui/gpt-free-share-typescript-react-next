const en = {
  ChatItem: {
    ChatItemCount: (count: number) => `${count} messages`
  },
  Chat: {
    Input: 'Enter to send, Shift + Enter to wrap',
    Send: 'Send'
  },
  Home: {
    NewChat: 'New Chat'
  },
  Settings: {
    Title: 'Settings',
    Theme: 'Theme',
    Lang: 'Language',
    Danger: {
      Reset: {
        Title: 'Reset All Settings',
        SubTitle: 'Reset all setting items to default',
        Action: 'Reset',
        Confirm: 'Confirm to reset all settings to default?'
      },
      Clear: {
        Title: 'Clear All Messages',
        SubTitle: 'Clear all messages',
        Action: 'Clear',
        Confirm: 'Confirm to clear all messages?'
      }
    }
  },
  Store: {
    DefaultTopic: 'New Conversation',
    Prompt: {
      Topic:
        'Use three to four words to directly return to the topic of the above sentence. Keep it short and without punctuation.'
    }
  },
  UI: {
    Confirm: 'Confirm',
    Cancel: 'Cancel'
  }
}

export default en
