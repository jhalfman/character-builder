import React, { useEffect, useState } from 'react'

const UserContext = React.createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)
    console.log("base context loading", user)

    useEffect(() => {
      console.log("inside useEffect in context", user)
        fetch('/users/current')
        .then(resp => {
            if (resp.ok) {
              resp.json().then(user => {setUser(user); console.log("inside setting context fetch request", user)})
            }
          })
          console.log("end of fetch request inside context", user)
    }, [])

  return (
    <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
  )
}

export {UserContext, UserProvider}