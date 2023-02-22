import React, { useState } from 'react';
import { NavLink as Link, useParams} from 'react-router-dom';

const NewPet = ( {petTypes} ) => {
    const [newPetForm, setNewPetForm] = useState({
        name: "",
        modifier: ""
    })
    const [errors, setErrors] = useState(null)
    let {name} = useParams();

  return (
    <div>
        {errors ? errors.map(error => <div className="errors" key={error}>{error}</div>) : null}
        <Link to={`/characters/${name}`} className="nav-link link-dark" style={{width: "15%", textAlign: "center"}}><button className="btn btn-warning" style={{width: "100%"}}>Back to Character</button></Link>
    </div>
  )
}

export default NewPet