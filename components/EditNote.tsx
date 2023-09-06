import { Button, Form, Input, Select, Space } from 'antd'
import { options } from '../utils/selectTags'
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { NoteContext } from '../contexts'

const { TextArea } = Input

const EditNote = () => {
  const { notes, changeNote } = useContext(NoteContext)
  const [form] = Form.useForm() 
  const { id } = useParams()
  // const note = notes.filter(n => n.id === id)[0]
  const [note, setNote] = useState({title: '', text: '', tags: []})
  const { title, text, tags } = note

  useEffect(() => {
    fetch('http://127.0.0.1:5000/notes/' + id)
      .then(res => res.json())
      .then(json => {
        const note = JSON.parse(JSON.stringify(json))[0]
        setNote(note)
        form.setFieldValue('title', note.title)
        form.setFieldValue('tags', note.tags)
        form.setFieldValue('text', note.text)
      })
  }, [])

  const onFinish = (values: any) => {
    const editedNotes = {...note, ...values}
    changeNote(editedNotes)
  }

  const onReset = () => {
    form.setFieldValue('title', '')
    form.setFieldValue('tags', [])
    form.setFieldValue('text', '')
  }

  return (
    <div>
      <h1>Edit Note</h1>
      <Form form={form} style={{ width: 600, margin: '0 auto'}} onFinish={onFinish}>
        <Form.Item name='title' initialValue={title}>
          <Input placeholder="title" required />
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
            <Button href={`/${id}`} htmlType="button">Back</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default EditNote