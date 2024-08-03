import { createRoot } from 'react-dom/client'

import Button from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import ConfirmIcon from '@/icons/confirm.svg'
import CancelIcon from '@/icons/cancel.svg'

const prettyObject = (msg: any) => {
  const obj = msg

  if (typeof msg !== 'string') {
    msg = JSON.stringify(msg, null, '  ')
  }

  if (msg === '{}') {
    return obj.toString()
  }

  if (msg.startsWith('```json')) {
    return msg
  }

  return ['```json', msg, '```'].join('\n')
}

const showModal = (
  content: any,
  confirmButtonText: string,
  cancelButtonText: string
) => {
  const div = document.createElement('div')

  div.style.backgroundColor = '#00000080'
  div.style.width = '100vw'
  div.style.height = '100vh'
  div.style.position = 'fixed'
  div.style.top = '0'
  div.style.left = '0'
  div.style.zIndex = '9999'
  div.style.display = 'flex'
  div.style.justifyContent = 'center'
  div.style.alignItems = 'center'

  document.body.appendChild(div)

  const root = createRoot(div)

  const closeModal = () => {
    root.unmount()
    div.remove()
  }

  return new Promise<boolean>(resolve => {
    root.render(
      <Modal
        title={confirmButtonText}
        onClose={closeModal}
        actions={[
          <Button
            key="cancel"
            icon={<CancelIcon />}
            text={cancelButtonText}
            bordered
            onClick={() => {
              resolve(false)
              closeModal()
            }}></Button>,
          <Button
            key="confirm"
            icon={<ConfirmIcon />}
            text={confirmButtonText}
            bordered
            type="primary"
            autoFocus
            onClick={() => {
              resolve(true)
              closeModal()
            }}></Button>
        ]}>
        {content}
      </Modal>
    )
  })
}

export { prettyObject, showModal }
