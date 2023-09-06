import { UserInfoContext } from '../contexts'
import { useSessionStorage } from '../utils/useSessionStorage'
import { UserInfoProviderProps } from '../types'

const UserInfoProvider = ({ children }: UserInfoProviderProps) => {
  const [userInfo, setUserInfo] = useSessionStorage('UserInfo', {uid: '', email: ''})

  const value = { userInfo, setUserInfo }
  
  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>)
}

export default UserInfoProvider