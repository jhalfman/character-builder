import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.js';

const NewUser = () => {
    const [errors, setErrors] = useState(null)
  const [newUserForm, setNewUserForm] = useState({
    email: "",
    username: "",
    password: "",
    password_confirmation: ""
  })
  const {setUser} = useContext(UserContext);
  let navigate = useNavigate()

  function editUserForm(e) {
    setNewUserForm({
      ...newUserForm,
      [e.target.id]: e.target.value
    })
  }

  function createNewUser(e) {
    e.preventDefault();
    if (newUserForm.password !== newUserForm.password_confirmation) {
      alert("password and confirmation must match")
    }
    else {
      fetch(`/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({...newUserForm, username: newUserForm.username[0].toUpperCase() + newUserForm.username.slice(1).toLowerCase()})
      })
      .then(resp => {
        if (resp.ok) {
            resp.json().then(user => {
                setUser(user)
                navigate(`/characters`)
            })
        }
        else {
            resp.json().then(error => {
              if (errors) {
                if (!errors.includes(error[0])) {
                  setErrors([...errors, ...error])
                  console.log([...errors, ...error])
                }
              }
              else setErrors(error)
            }) 
        }
    })
    }
  }
  
  return (
    <div className="bg-primary-subtle border border-primary">
      {errors ? errors.map(error => <div className="errors" key={error}>{error}</div>) : null}
      <form onSubmit={createNewUser} className="row">
        <legend style={{textAlign: "center"}}>Create a New Account</legend>
        <div className="form-floating mb-3" style={{width: "33%", marginLeft: "33%"}}>
          <input type="email" className="form-control" id="email" placeholder="name@email.com" onChange={editUserForm} value={newUserForm.email}/>
          <label htmlFor="email" className="form-label">Email Address</label>
        </div>
        <div className="form-floating mb-3" style={{width: "33%", marginLeft: "33%"}}>
          <input type="text" className="form-control" id="username" placeholder="username" onChange={editUserForm} value={newUserForm.username}/>
          <label htmlFor="username" className="form-label">Username</label>
        </div>
        <div className="form-floating mb-3" style={{width: "33%", marginLeft: "33%"}}>
          <input type="password" className="form-control" id="password" aria-describedby="passwordHelp" placeholder="password" onChange={editUserForm} value={newUserForm.password}/>
          <label htmlFor="password" className="form-label">Password</label>
          <div id="passwordHelp" className="form-text" style={{textAlign: "left"}}>Must be at least 8-15 characters with one special character</div>
        </div>
        <div className="form-floating mb-3" style={{width: "33%", marginLeft: "33%"}}>
          <input type="password" className="form-control" id="password_confirmation" placeholder="password" onChange={editUserForm} value={newUserForm.password_confirmation}/>
          <label htmlFor="passwordConfirmation" className="form-label">Password Confirmation</label>
          <div id="passwordConfirmationHelp" className="form-text" style={{textAlign: "left"}}>Must be at least 8-15 characters with one special character</div>
        </div>
        {/* <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" for="exampleCheck1">Keep me signed in</label>
        </div> */}
        <button type="submit" className="btn btn-primary" style={{width: "60%", marginLeft: "20%"}}>Create New Account</button>
      </form>
    </div>
  )
}

export default NewUser