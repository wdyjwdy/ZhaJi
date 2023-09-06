import { createContext } from "react";
import { AuthContextType, MessageContextType, NoteContextType, UserInfoContextType } from "../types";
import NoteProvider from './NoteProvider'
import { AuthProvider, RequireAuth } from './AuthProvider'
import MessageProvider from './MessageProvider'
import UserInfoProvider from './UserInfoProvider'

const initAuth = {
  uid: '',
  email: '',
  signin: () => {},
  signout: () => {},
  signup: () => {},
}

export const NoteContext = createContext<NoteContextType>(null!)
export const AuthContext = createContext<AuthContextType>(initAuth)
export const MessageContext = createContext<MessageContextType>(null!)
export const UserInfoContext = createContext<UserInfoContextType>(null!)

export {
  NoteProvider,
  AuthProvider,
  RequireAuth,
  MessageProvider,
  UserInfoProvider
}