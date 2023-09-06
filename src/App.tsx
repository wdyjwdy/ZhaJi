import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import { NewNote, Home, Note, EditNote, Test, SignIn, SignUp, Navbar, Footer, Profile } from '../components'
import { useLocalStorage } from '../utils/useLocalStorage'
import { AuthProvider, RequireAuth, NoteProvider, MessageProvider, UserInfoProvider } from '../contexts'
import { UserInfoContextType } from '../types'
import { createContext } from 'react'

export const UserInfoContext = createContext<UserInfoContextType>(null!)

function App() {
  const [drafts, setDrafts] = useLocalStorage('Drafts', [])
  
  return (
    <UserInfoProvider>
      <MessageProvider>
        <AuthProvider>
          <NoteProvider>
            <Navbar />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/new' element={<RequireAuth><NewNote drafts={drafts} setDrafts={setDrafts} /></RequireAuth>} />
                <Route path='/:id' >
                  <Route index element={<Note />} />
                  <Route path='edit' element={<RequireAuth><EditNote /></RequireAuth>} />
                </Route>
                <Route path='*' element={<Navigate to='/' />} />
                <Route path='/test' element={<RequireAuth><Test /></RequireAuth>} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/profile' element={<RequireAuth><Profile /></RequireAuth>} />
              </Routes>
            <Footer />
          </NoteProvider>
        </AuthProvider>
      </MessageProvider>
    </UserInfoProvider>
  )
}

export default App
 