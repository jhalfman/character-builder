import React, { useContext } from 'react';
import { UserContext } from '../context/user.js';

const Login = () => {
  const user = useContext(UserContext);
  
  return (
      <form>
        <div className="form-floating mb-3">
          <input type="email" className="form-control" id="email" placeholder="name@email.com"/>
          <label for="email" className="form-label">Email Address</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="username" placeholder="username"/>
          <label for="username" className="form-label">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" id="password" aria-describedby="passwordHelp" placeholder="password"/>
          <label for="password" className="form-label">Password</label>
          <div id="passwordHelp" className="form-text">Must be at least 8-15 characters with one special character</div>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" id="passwordConfirmation" placeholder="password"/>
          <label for="passwordConfirmation" className="form-label">Password Confirmation</label>
        </div>
        {/* <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" for="exampleCheck1">Keep me signed in</label>
        </div> */}
        <button type="submit" className="btn btn-primary">Create New Account</button>
      </form>
  )
}

export default Login