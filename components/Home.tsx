import { Input, Form, Select, List } from 'antd'
import { options } from '../utils/selectTags'
import { useState, useContext, useEffect } from 'react'
import zhajiLogo from '/logo.png'
import NoteCard from './NoteCard'
import { NoteContext } from '../contexts'

const { Search } = Input

const Home = () => {
  const { notes } = useContext(NoteContext)
  const [form] = Form.useForm()
  const [filteredNotes, setFilteredNotes] = useState(notes)
  
  useEffect(() => {setFilteredNotes(notes)}, [notes])

  const onValuesChange = (values: any) => {
    const key = Object.keys(values)[0]
    switch(key) {
      case 'search': {
        const searchValue = values['search'].toLowerCase()
        const filteredNotes = notes.filter(note => {
          return note.title.toLowerCase().includes(searchValue)
        })
        setFilteredNotes(filteredNotes)
        break
      }
      case 'tags': {
        const currentTags: number[] = values['tags']
        if(currentTags.length === 0) {
          setFilteredNotes(notes)
        } else {
          const filteredNotes = notes.filter(note => {
            const flags = currentTags.map(tag => note.tags.includes(tag))
            return flags.reduce((prev, value) => prev && value)
          })
          setFilteredNotes(filteredNotes)
        }
        break
      }
      default: {

      }
    }
  }

  return (
    <div>
      <h1>Discover</h1>
      <img src={zhajiLogo} className="logo" alt="Vite logo" />
      <Form form={form} onValuesChange={onValuesChange}>
        <Form.Item name='search'>
          <Search style={{ width: 400 }} enterButton placeholder="search" />
        </Form.Item>
        <Form.Item name='tags' initialValue={[]}>
          <Select
            style={{ width: 400 }} 
            mode="multiple"
            allowClear
            placeholder="tags"
            options={options}
          />
        </Form.Item>
      </Form>
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

export default Home