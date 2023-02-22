import { useEffect, useContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/user/Login';
import UserHome from './components/gameplay/UserHome';
import { UserContext } from './components/context/user.js';
import { useNavigate } from 'react-router-dom';
import NewUser from './components/user/NewUser';
import Navbar from './components/navigation/Navbar';
import NewCharacter from './components/gameplay/NewCharacter';
import Character from './components/gameplay/Character';
import PetTypes from './components/archetypes/PetTypes';
import EnemyTypes from './components/archetypes/EnemyTypes';

function App() {
  const {user} = useContext(UserContext);
  const navigate = useNavigate()
  const [characters, setCharacters] = useState(null)

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
        <Route path='/characters' element={<UserHome characters={characters} setCharacters={setCharacters}/>} />
        <Route path='/characters/:name' element={<Character />} />
        <Route path='/characters/create' element={<NewCharacter setCharacters={setCharacters} characters={characters}/>} />
        <Route path='/pets' element={<PetTypes />} />
        <Route path='/enemies' element={<EnemyTypes />} />
        <Route path='/login' element={<Login />} />
        <Route path='/newuser' element={<NewUser />} />
      </Routes>
    </div>
  );
}

export default App;
