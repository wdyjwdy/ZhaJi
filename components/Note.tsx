import { useParams } from 'react-router-dom'
import { Button, Space, Tag, Image } from 'antd'
import { getOptionLabel } from '../utils/selectTags'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import tree from '/tree.jpg'
import apart from '/apart.png'
import { useContext, useEffect, useState } from 'react'
import { AuthContext, NoteContext } from '../contexts'
import { PopButton } from '.'
import Comment from './Comment'
 
const Note = () => {
  const { notes, deleteNote } = useContext(NoteContext)
  const { id } = useParams()
  const auth = useContext(AuthContext)
  // const note = notes.filter(n => n.id === id)[0]
  const [note, setNote] = useState({title: '', text: '', tags: [], uid: ''})
  const { title, text, tags, uid } = note

  const isOwner = auth.uid === uid

  useEffect(() => {
    fetch('http://127.0.0.1:5000/notes/' + id)
      .then(res => res.json())
      .then(json => setNote(JSON.parse(JSON.stringify(json))[0]))
  }, [])

  const onDelete = () => {
    if (id !== undefined){
      deleteNote(id)
    }
  }

  return (
    <div>
      <h1 style={{paddingTop: 50}}>{title}</h1>
      <Space style={{justifyContent: 'space-between', minWidth: '80vw'}}>
        <Space size={[0, 8]} wrap>
          {tags.map((tag, i) => <Tag key={i}>{getOptionLabel(tag)}</Tag>)}
        </Space>
        {
          isOwner ? (
            <Space align='end'>
              <Button type="primary" href={`/${id}/edit`}>Edit</Button>
              <PopButton onClick={onDelete} popTitle='确认删除吗' alertText='删除成功'>Delete</PopButton>
              <Button href='/'>Back</Button>
            </Space>
          ) : (
            <Space align='end'>
              <Button href='/'>Back</Button>
            </Space>
          )
        }
      </Space>
      <Space size={50} style={{alignItems: 'start', marginTop: 50}}>
        <Image.PreviewGroup items={[tree, apart]}>
          <Image width={300} src={tree} style={{borderRadius: 10}}/>
        </Image.PreviewGroup>
        <div style={{ textAlign: 'start', width: '60vw'}}>
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </Space>
      <Comment />

    </div>
  )
}

export default Note