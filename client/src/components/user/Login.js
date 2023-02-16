import { React, useContext } from 'react';
import { UserContext } from '../context/user.js';

const Login = () => {
  const user = useContext(UserContext);

  console.log(user, "from login")
  
  return (
    <div>Login</div>
  )
}

export default Login