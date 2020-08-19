import React, { createContext, useState } from 'react'

interface ContextProps {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  // currentUser: User | null;
  // cUserQuery: QueryResult<any, Record<string, any>>;
  // cUser: User;
  // orders: Order[];

}
export const AuthContext = createContext({} as ContextProps)

const AuthContextProvider = (props: { children: React.ReactNode }) => {

  const [token, setToken] = useState(window.localStorage.getItem('pop-shop-user-token'))
  // const client = useApolloClient()
  // const cUserQuery = useQuery(ME) //queries current user and stores data in 'me' object in cache on reload or returning user, however, doesn't cache current user data on login.  On login, current user data is passed from the server with the Token
  // let cUser;
  // const userOrders = useQuery(GET_ORDERS)
  // let orders: [] = []

  // if (!currentUser || userOrders.loading || !userOrders.data) {
  //   orders = []
  // } else {
  //   orders = userOrders.data.getOrders
  // }
  // if (!currentUser || cUserQuery.loading || !cUserQuery.data) {
  //   cUser = {
  //     id: undefined,
  //     firstName: undefined,
  //     lastName: undefined,
  //     email: undefined,
  //     favoriteFlavor: undefined,
  //     cart: [],
  //     paymentInfo: {}
  //   }
  // } else {
  //   cUser = cUserQuery.data.me
  // }

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {props.children}
    </AuthContext.Provider>
  )

}
export default AuthContextProvider