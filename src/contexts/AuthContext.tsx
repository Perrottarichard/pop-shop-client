import React, { createContext, useState } from 'react'

interface ContextProps {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}
export const AuthContext = createContext({} as ContextProps)

const AuthContextProvider = (props: { children: React.ReactNode }) => {

  const [token, setToken] = useState(window.localStorage.getItem('pop-shop-user-token'))

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {props.children}
    </AuthContext.Provider>
  )

}
export default AuthContextProvider