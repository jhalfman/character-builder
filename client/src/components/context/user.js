import React from 'react'

const UserContext = React.createContext();

const UserProvider = ({children}) => {
  return (
    <UserContext.Provider value={"context!"}>{children}</UserContext.Provider>
  )
}

export {UserContext, UserProvider}