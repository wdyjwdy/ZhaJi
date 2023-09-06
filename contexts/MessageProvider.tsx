import { MessageProviderProps } from '../types'
import { MessageContext } from '.'
import { message } from 'antd'

const MessageProvider = ({ children }: MessageProviderProps) => {
  const [messageApi, contextHolder] = message.useMessage()
  const success = (text: string) => {messageApi.open({ type: 'success', content: text })}
  const error = (text: string) => {messageApi.open({ type: 'error', content: text })}

  const value = { success, error }
  
  return (
    <MessageContext.Provider value={value}>
      {contextHolder}
      {children}
    </MessageContext.Provider>)
}

export default MessageProvider