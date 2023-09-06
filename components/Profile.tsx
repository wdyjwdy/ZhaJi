import { Descriptions, List } from 'antd'
import { useContext } from 'react'
import NoteCard from './NoteCard'
import { AuthContext, NoteContext } from '../contexts'

const Profile = () => {
  const { uid, email } = useContext(AuthContext)
  const { notes } = useContext(NoteContext)
  const filteredNotes = notes.filter(n => n.uid === uid)

  const items = [
    { key: '1', label: 'Email', children: email },
    { key: '2', label: 'Nickname', children: email },
    { key: '3', label: 'Gender', children: email },
    { key: '4', label: 'Age', children: email },
    { key: '5', label: 'Country', children: email },
    { key: '6', label: 'Religion', children: email },
  ]
  
  return (
    <div style={{textAlign: 'left'}}>
      <h2>Profile</h2>
      <Descriptions items={items} />
      <h2>My Notes</h2>
      <List
        style={{minWidth: 800}}
        grid={{ gutter: 16, column: 4}}
        dataSource={filteredNotes}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <NoteCard {...item}/>
          </List.Item>
        )}
      />
    </div>
  )
}

export default Profile