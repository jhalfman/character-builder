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
import NewPet from './components/gameplay/NewPet';
import EditCharacter from './components/gameplay/EditCharacter';
import Dive from './components/gameplay/Dive';
import Leaderboard from './components/leaderboard/Leaderboard';

function App() {
  const {user} = useContext(UserContext);
  const navigate = useNavigate()
  const [characters, setCharacters] = useState(null)
  const [character, setCharacter] = useState(null)
  const [petTypes, setPetTypes] = useState(null)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    else navigate(`/characters`)
    //eslint-disable-next-line
  }, [user])

  useEffect(() => {
      fetch(`/pet_archetypes`)
      .then(resp => resp.json())
      .then(pets => setPetTypes(pets))
  }, [])

  return (
    <div className="bg-primary-subtle border border-primary">
      <Navbar setCharacters={setCharacters}/>
      <Routes>
        <Route path='/characters' element={<UserHome characters={characters} setCharacters={setCharacters} />} />
        <Route path='/characters/:name' element={<Character setCharacters={setCharacters} characters={characters} character={character} setCharacter={setCharacter}/>} />
        <Route path='/characters/:name/dive' element={<Dive character={character} setCharacter={setCharacter} setCharacters={setCharacters} characters={characters}/>} />
        <Route path='/characters/:name/edit' element={<EditCharacter character={character} setCharacter={setCharacter} setCharacters={setCharacters} characters={characters}/>} />
        <Route path='/characters/create' element={<NewCharacter setCharacters={setCharacters} characters={characters}/>} />
        <Route path='/pets' element={<PetTypes petTypes={petTypes}/>} />
        <Route path='/characters/:name/pets/create' element={<NewPet petTypes={petTypes} character={character}/>} />
        <Route path='/enemies' element={<EnemyTypes />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/newuser' element={<NewUser />} />
      </Routes>
    </div>
  );
}

export default App;
