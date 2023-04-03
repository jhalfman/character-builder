import React, { useEffect, useState } from 'react'

const UserContext = React.createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch('/users/current')
        .then(resp => {
            if (resp.ok) {
              resp.json().then(user => setUser(user))
            }
          })
    }, [])

  return (
    <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
  )
}

export {UserContext, UserProvider}