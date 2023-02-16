import React, { useState } from 'react';

const Login = () => {
  const [newUserForm, setNewUserForm] = useState({
    email: "",
    username: "",
    password: "",
    password_confirmation: ""
  })

  function editUserForm(e) {
    setNewUserForm({
      ...newUserForm,
      [e.target.id]: e.target.value
    })
  }

  function createNewUser(e) {
    e.preventDefault();
    console.log(newUserForm)
  }
  
  return (
      <form onSubmit={createNewUser}>
        <div className="form-floating mb-3">
          <input type="email" className="form-control" id="email" placeholder="name@email.com" onChange={editUserForm} value={newUserForm.email}/>
          <label htmlFor="email" className="form-label">Email Address</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="username" placeholder="username" onChange={editUserForm} value={newUserForm.username}/>
          <label htmlFor="username" className="form-label">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" id="password" aria-describedby="passwordHelp" placeholder="password" onChange={editUserForm} value={newUserForm.password}/>
          <label htmlFor="password" className="form-label">Password</label>
          <div id="passwordHelp" className="form-text" style={{textAlign: "left"}}>Must be at least 8-15 characters with one special character</div>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" id="password_confirmation" placeholder="password" onChange={editUserForm} value={newUserForm.password_confirmation}/>
          <label htmlFor="passwordConfirmation" className="form-label">Password Confirmation</label>
          <div id="passwordConfirmationHelp" className="form-text" style={{textAlign: "left"}}>Must be at least 8-15 characters with one special character</div>
        </div>
        {/* <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" for="exampleCheck1">Keep me signed in</label>
        </div> */}
        <button type="submit" className="btn btn-primary" style={{float: "left"}}>Create New Account</button>
      </form>
  )
}

export default Login