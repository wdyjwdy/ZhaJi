// 笔记

export type Note = {
  id: string,
  uid: string,
  email: string,
  title: string,
  text: string,
  tags: number[]
}

export type Notes = Note[]

export type Draft = {
  uid: string,
  title: string,
  text: string,
  tags: number[]
}

export type Drafts = Draft[]

export type NewNoteProps = {
  drafts: Drafts,
  setDrafts: any
}

export type MessageContextType = {
  success: (text: string) => void,
  error: (text: string) => void
}

export type User = {
  username: string,
  password: string,
  email: string
}

export type Users = User[]

export type PopButtonProps = {
  onClick: any,
  popTitle: string,
  alertText?: string,
  children: React.ReactNode
}

// 登录功能

export type SignUpInfo = {
  email: string,
  password: string,
}

export type SignInInfo = {
  email: string,
  password: string,
}

export type UserInfo = {
  uid: string,
  email: string
}

export type UserInfoContextType = {
  userInfo: UserInfo,
  setUserInfo: any
}

// 上下文

export type AuthContextType = {
  uid: string,
  email: string,
  signin: (signInInfo: SignInInfo) => void,
  signout: () => void,
  signup: (signUpInfo: SignUpInfo) => void
}

export type NoteContextType = {
  notes: Notes,
  addNote: (note: Note) => void,
  deleteNote: (id: string) => void,
  changeNote: (note: Note) => void,
}

export type AuthProviderProps = {
  children: React.ReactNode
}

export type NoteProviderProps = {
  children: React.ReactNode
}

export type MessageProviderProps = {
  children: React.ReactNode
}

export type UserInfoProviderProps = {
  children: React.ReactNode
}