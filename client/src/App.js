import { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/user/Login';
import UserHome from './components/gameplay/UserHome';
import { UserContext } from './components/context/user.js';
import { useNavigate } from 'react-router-dom';
import NewUser from './components/user/NewUser';
import Navbar from './components/navigation/Navbar';
import NewCharacter from './components/gameplay/NewCharacter';

function App() {
  const {user} = useContext(UserContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    else navigate(`/characters`)
    //eslint-disable-next-line
  }, [user])

  return (
    <div className="bg-primary-subtle border border-primary">
      <Navbar />
      <Routes>
        <Route path='/characters' element ={<UserHome />} />
        <Route path='/characters/create' element ={<NewCharacter />} />
        <Route path='/login' element={<Login />} />
        <Route path='/newuser' element={<NewUser />} />
      </Routes>
    </div>
  );
}

export default App;
