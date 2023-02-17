import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.js';

const Login = () => {
  const [errors, setErrors] = useState(null)
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  })
  const {setUser} = useContext(UserContext);
  let navigate = useNavigate()

  function editUserForm(e) {
    setLoginForm({
      ...loginForm,
      [e.target.id]: e.target.value
    })
  }

  function loginUser(e) {
    e.preventDefault();
      fetch(`/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({...loginForm, username: loginForm.username[0].toUpperCase() + loginForm.username.slice(1).toLowerCase()})
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
              setErrors(error)
            }) 
        }
    })
  }
  
  return (
    <div className="bg-primary-subtle border border-primary">
      {errors ? errors.map(error => <div className="errors" key={error}>{error}</div>) : null}
      <form onSubmit={loginUser} className="row">
        <legend className="border-bottom border-primary" style={{textAlign: "center", width: "75%", marginLeft: "12.5%"}}>Log In to Existing Account</legend>
        <div className="form-floating mb-3" style={{width: "33%", marginLeft: "33%"}}>
          <input type="text" className="form-control" id="username" placeholder="username" onChange={editUserForm} value={loginForm.username}/>
          <label htmlFor="username" className="form-label">Username</label>
        </div>
        <div className="form-floating mb-3" style={{width: "33%", marginLeft: "33%"}}>
          <input type="password" className="form-control" id="password" aria-describedby="passwordHelp" placeholder="password" onChange={editUserForm} value={loginForm.password}/>
          <label htmlFor="password" className="form-label">Password</label>
        </div>
        {/* <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" for="exampleCheck1">Keep me signed in</label>
        </div> */}
        <button type="submit" className="btn btn-primary" style={{width: "50%", marginLeft: "25%"}}>Enter Pet Diver</button>
        <legend className="border-bottom border-top border-primary" style={{textAlign: "center", marginTop: "40px", width: "50%", marginLeft: "25%"}}>Not A Diver Yet?</legend>
        <button type="button" className="btn btn-primary" style={{width: "30%", marginLeft: "35%"}} onClick={() => navigate(`/newuser`)}>Create New User</button>
      </form>
    </div>
  )
}

export default Login