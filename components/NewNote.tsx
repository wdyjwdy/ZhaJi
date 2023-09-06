import { Button, Form, Input, Select, Space } from 'antd'
import { v4 as uuidV4 } from 'uuid'
import { options } from '../utils/selectTags'
import { Draft, NewNoteProps } from '../types'
import { MessageContext } from '../contexts'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext, NoteContext } from '../contexts'

const { TextArea } = Input

const NewNote = ({ drafts, setDrafts }: NewNoteProps) => {
  const { addNote } = useContext(NoteContext)
  const { uid, email } = useContext(AuthContext)
  const { success } = useContext(MessageContext)
  const navigate = useNavigate()
  const [form] = Form.useForm() 

  let draft: Draft
  const out = drafts.filter(d => d.uid === uid)
  if (out.length === 0) {
    draft = {title: '', text: '', tags: [], uid: uid}
    setDrafts([...drafts, draft])
  } else {
    draft = out[0]
  }
  const { title, text, tags } = draft

  const onFinish = (values: any) => {
    const newNote = { ...values, id: uuidV4(), uid: uid, email: email }
    addNote(newNote)
    setDrafts(drafts.map(d => {
      if (d.uid === uid) {
       return {title: '', text: '', tags: [], uid: uid}
      } else {
       return d
      }
     }))
  }

  const onCancel = () => {
    const values = form.getFieldsValue()
    const newDraft: Draft = {...draft, ...values}
    setDrafts(drafts.map(d => {
     if (d.uid === uid) {
      return newDraft
     } else {
      return d
     }
    }))
    navigate('/')
    success('已保存草稿')
  }

  const onReset = () => {
    form.setFieldValue('title', '')
    form.setFieldValue('tags', [])
    form.setFieldValue('text', '')
  }

  return (
    <div>
      <h1>New Note</h1>
      <Form form={form} style={{ width: 600, margin: '0 auto'}} onFinish={onFinish}>
        <Form.Item name='title'  initialValue={title}>
          <Input placeholder="title" required/>
        </Form.Item>
        <Form.Item name='tags' required initialValue={tags}>
          <Select
            mode="multiple"
            allowClear
            placeholder="tags"
            options={options}
          />
        </Form.Item>
        <Form.Item name='text' required initialValue={text}>
          <TextArea
            showCount
            maxLength={100}
            style={{ height: 200, resize: 'none' }}
            placeholder="text"
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">Save</Button>
            <Button onClick={onReset} htmlType="button">Reset</Button>
            <Button onClick={onCancel} danger htmlType="button">Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default NewNote