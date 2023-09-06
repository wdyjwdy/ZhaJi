import { useContext } from 'react'
import { AuthProviderProps, SignInInfo, SignUpInfo } from '../types'
import { Navigate, useLocation } from 'react-router-dom'
import { UserInfoContext } from '../contexts'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from '../utils/firebase'
import { MessageContext } from '../contexts'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '.'

function AuthProvider({ children }: AuthProviderProps) {
  const { success, error } = useContext(MessageContext)
  const navigate = useNavigate()
  const { userInfo, setUserInfo } = useContext(UserInfoContext)
  const auth_firebase = getAuth(app)
  
  const signin = ({ email, password }: SignInInfo) => {
    signInWithEmailAndPassword(auth_firebase, email, password)
      .then(userCredential => {
        const user = userCredential.user
        user.getIdToken().then(token => {
          localStorage.setItem('note-jwt', token)
        })
        const { uid, email } = user
        setUserInfo({ uid, email })
        success('登录成功')
        navigate('/')
      })
      .catch(e => {error(e.code.replace('auth/', ''))})
  }

  const signout = () => {
    signOut(auth_firebase)
    .then(() => {
      setUserInfo({ uid: '', email: '' })
      success('您已退出')
      navigate('/')
    })
    .catch(e => {error(e.code.replace('auth/', ''))})
    localStorage.removeItem('note-jwt')
  }

  const signup = ({ email, password }: SignUpInfo) => {
    createUserWithEmailAndPassword(auth_firebase, email, password)
    .then(() => {
      success('注册成功')
      navigate('/signin')
    })
    .catch(e => {error(e.code.replace('auth/', ''))})
  }

  const value = { ...userInfo, signin, signout, signup }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext)
  const location = useLocation()

  if (auth.uid === '') {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  return children;
}

export { AuthProvider, RequireAuth }