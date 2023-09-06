import { Button, Popconfirm, message } from 'antd'
import { PopButtonProps } from '../types'

const PopButton = ({ onClick, popTitle, children, alertText}: PopButtonProps) => {
  const confirm = () => {
    if (alertText !== null) {
      message.success(alertText)
    }
    onClick()
  }

  return (
      <Popconfirm
        title={popTitle}
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <Button danger>{children}</Button>
      </Popconfirm>
  )
}

export default PopButton