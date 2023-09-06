import { Avatar, Button, List, Space } from "antd"

import tree from '/tree.jpg'
import TextArea from "antd/es/input/TextArea"
import { useState } from "react"

const aaa = '最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。'

const comments = [
  {name: 'xxc', avatar: tree, comment: aaa},
  {name: 'xxc', avatar: tree, comment: aaa},
  {name: 'xxc', avatar: tree, comment: aaa},
  {name: 'xxc', avatar: tree, comment: aaa}
]


const Comment = () => {
  const [commentOpen, setCommentOpen] = useState(false)
  
  return (
    <div style={{textAlign: 'left', paddingTop: 50}}>
      <Space style={{justifyContent: "space-between", width: '90vw'}}>
        <h2>评论区</h2>
        <Button type="primary" onClick={() => {setCommentOpen(c => !c)}}>Add</Button>
      </Space>
      {commentOpen && <TextArea style={{ height: 100, resize: 'none' }}/>}
      <List
        style={{ width: '90vw'}}
        pagination={{pageSize: 3}}
        dataSource={comments}
        renderItem={(item) => (
          <List.Item key={item.name} style={{flexDirection: 'column', alignItems: 'start'}}>
            <Space style={{}}>
              <Avatar src={tree} />
              <span style={{fontSize: '1.5em', fontWeight: 'bold'}}>{item.name}</span>
            </Space>
            <div style={{paddingLeft: 40}}>{item.comment}</div>
          </List.Item>
        )}
      />
    </div>
  )
}

export default Comment