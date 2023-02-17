import React from 'react';
import { NavLink as Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
            <Link to="/" className="navbar-brand link-light">Pet Diver<img style={{marginLeft: "10px"}}src='https://i.imgur.com/YC6rhTp.png' alt="Logo" width="50" height="40" class="d-inline-block align-text-top"></img></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link to="/characters" className="nav-link link-light" aria-current="page">Characters</Link>
                    <Link to="/" className="nav-link disabled">Pets</Link>
                    <Link to="/" className="nav-link disabled">Enemies</Link>
                    <Link to="/" className="nav-link disabled">Leaderboard</Link>
                </div>
                <div className="navbar-nav ms-auto">
                    <Link to="/newuser" className="nav-link link-light">Create Account</Link>
                    <Link to="/login" className="nav-link link-light">Login</Link>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar