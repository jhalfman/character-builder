import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.js';

const UserHome = () => {
    const {user} = useContext(UserContext);
    let navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate(`/login`)
        }
        else {
            console.log(user)
            // fetch user data
        }
    }, [user])

  return (
    <div>UserHome</div>
  )
}

export default UserHome