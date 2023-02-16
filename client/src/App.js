import logo from './logo.svg';
import { useContext } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/user/Login';
import { NavLink as Link, useNavigate} from 'react-router-dom';
import { UserContext } from './components/context/user.js';

function App() {
  let navigate = useNavigate()
  const user = useContext(UserContext);

  console.log(user, "from app")

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
