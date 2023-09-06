import { Avatar, Card, Space, Tag, Image } from 'antd'
import ReactMarkdown from 'react-markdown'
import { getOptionLabel } from '../utils/selectTags'
import { Note } from '../types'
import tree from '/tree.jpg'
import apart from '/apart.png'
import { useContext } from 'react'
import { AuthContext } from '../contexts'

const NoteCard = ({ id, title, text, tags, uid, email }: Note) => {
  const auth = useContext(AuthContext)
  const isOwner = auth.uid === uid

  const imgPreview = (
    <Image.PreviewGroup items={[tree, apart]}>
      <Image src={tree} style={{borderRadius: 0}} />
    </Image.PreviewGroup>
  )

  const extra = isOwner
    ? (<a href={`/${id}`} style={{ color: 'red' }}>Edit</a>)
    : (<a href={`/${id}`}>More</a>)

  return (
    <Card hoverable title={title} extra={extra} cover={imgPreview} >
      <Space style={{display: 'flex'}}>
        <Avatar src={tree} />
        <span style={{fontSize: '1.5em', fontWeight: 'bold'}}>{email}</span>
      </Space>
      <div style={{ textAlign: 'start'}}>
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Space size={[0, 8]} wrap>
          {tags.map((tag, i) => <Tag key={i}>{getOptionLabel(tag)}</Tag>)}
        </Space>
        <Space size={[0, 8]} wrap>
          <span style={{color: 'red'}}>♡</span>
          <span>520</span>
        </Space>
      </div>
    </Card>
  )
}

export default NoteCard