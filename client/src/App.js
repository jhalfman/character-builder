import logo from './logo.svg';
import './App.css';
import { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/user/Login';
import UserHome from './components/gameplay/UserHome';
import { UserContext } from './components/context/user.js';
import { useNavigate } from 'react-router-dom';

function App() {
  const {user, setUser} = useContext(UserContext);
  let navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    else navigate(`/characters}`)
  }, [user, navigate])

  function logout() {
    fetch(`/logout`, {
      method: "DELETE"
    })
    setUser(null)
  }

  return (
    <div className="App">
      <button onClick={logout}>logout</button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Routes>
        <Route path='/characters' element ={<UserHome />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
