import { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/user/Login';
import UserHome from './components/gameplay/UserHome';
import { UserContext } from './components/context/user.js';
import { useNavigate } from 'react-router-dom';
import NewUser from './components/user/NewUser';

function App() {
  const {user, setUser} = useContext(UserContext);
  let navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    else navigate(`/characters`)
  }, [user])

  function logout() {
    fetch(`/logout`, {
      method: "DELETE"
    })
    setUser(null)
  }

  function characters() {
    navigate(`/characters`)
  }

  function newUser() {
    navigate(`/newuser`)
  }

  return (
    <div className="bg-primary-subtle border border-primary">
      <button onClick={logout}>logout</button>
      <button onClick={characters}>characters</button>
      <button onClick={newUser}>newUser</button>
      <Routes>
        <Route path='/characters' element ={<UserHome />} />
        <Route path='/login' element={<Login />} />
        <Route path='/newuser' element={<NewUser />} />
      </Routes>
    </div>
  );
}

export default App;
