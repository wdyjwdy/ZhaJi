import { useContext, useState } from 'react'
import viteLogo from '/vite.svg'
import { Avatar, Button, Space } from 'antd'
import { AuthContext } from '../contexts'
import tree from '/tree.jpg'
import { PopButton } from '.'

const Navbar = () => {
  const auth = useContext(AuthContext)
  const [theme, setTheme] = useState(true)

  const handleLogOut = () => {
    auth.signout()
  }
  
  return (
    <header>
      <nav style={{display: 'flex', justifyContent: 'space-between', width: '95vw'}}>
        <a href='/'>
          <img src={viteLogo} alt="Vite logo" />
          <span>Vite</span>
        </a>
        <Space>
          <Button onClick={() => {setTheme(t => !t)}} shape='circle'>{theme ? '🔆' : '🌙'}</Button>
          {auth.uid !== '' ? (
            <Space>
              <Avatar src={tree} />
              <span style={{fontSize: '1.5em', fontWeight: 'bold'}}>{auth.email}</span>
              <Button type="primary" htmlType="button" href='/new'>Post</Button>
              <Button href='/test'>Test</Button>
              <Button href='/'>Discover</Button>
              <Button href='/profile'>Profile</Button>
              <PopButton onClick={handleLogOut} popTitle='确认退出吗'>Log Out</PopButton>
            </Space>
          ) : (
            <Space>
              <Button href='/signin'>Sign In</Button>
              <Button href='/signup'>Sign Up</Button>
            </Space>
          )}
        </Space>
      </nav>
    </header>
  )
}

export default Navbar