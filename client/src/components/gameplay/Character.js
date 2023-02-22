import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NavLink as Link} from 'react-router-dom';

const Character = ( {setCharacters, characters, character, setCharacter} ) => {
    const [errors, setErrors] = useState(null)
    let {name} = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`/characters/${name}`)
        .then(resp => {
            if (resp.ok) {
                resp.json().then(character => {
                    setCharacter(character)
                })
            }
            else {
                resp.json().then(error => {
                    setErrors(error)
                }) 
            }
        })
    }, [name])

    function deleteCharacter() {
        fetch(`/characters/${character.id}`, {
            method: "DELETE"
        })
        .then(resp => {
            if (resp.ok) {
                    const newCharacterList = characters.filter(char => char.id !== character.id)
                    setCharacters(newCharacterList)
                    navigate("/characters")
            }
            else {
                resp.json().then(error => {
                    setErrors(error)
                }) 
            }
        })
    }

    function releasePet(id) {
        fetch(`/pets/${id}`, {
            method: "DELETE"
        })
        .then(resp => {
            if (resp.ok) {
                    const newPets = character.pets.filter(pet => pet.id !== id)
                    setCharacter({...character, pets: newPets})
            }
            else {
                resp.json().then(error => {
                    setErrors(error)
                }) 
            }
        })
    }
    
if (!character) {
    return <div>Loading Character...</div>
}

  return (
    <div className="container border border-primary">
        {errors ? errors.map(error => <div className="errors" key={error}>{error}</div>) : null}
        <div className="row border border-success">
            <div className="col-8 border border-warning">
                <h3 style={{textAlign: "center"}}>{character.name}</h3>
                <img src={character.avatar_url} style={{width: "40%", marginLeft: "30%"}} alt={character.name}></img>
                <div className="border border-light">
                    <ul style={{}}>
                        <li>Attack: {character.attack}</li>
                        <li>Defense: {character.defense}</li>
                        <li>Hit Points: {character.hp}</li>
                        <li>Speed: {character.speed}</li>
                        <li>Luck: {character.luck}</li>
                        <li>Current Experience: {character.experience}</li>
                        <li>Money: {character.money} credits</li>
                        <li>Level: {character.experience/500}</li>
                    </ul>
                </div>
            </div>
            <div className="col-4 border border-info" style={{overflowY: "auto", height: "700px"}}>
                <h3 style={{textAlign: "center"}}>{character.name}'s Pets</h3>
                {character ? character.pets.map(pet => {
                    return (
                    <div key={pet.name} className='border border-warning' style={{padding: "5%"}}>
                        <h5 style={{textAlign: "center"}}>{pet.name}</h5>
                        <img src={`${pet.pet_archetype.image_url}`} style={{width: "50%", marginLeft: "25%"}} alt={pet.name}></img>
                        <div className='border border-primary'>
                            <button type="button" className="btn btn-primary" style={{width: "20%", marginLeft: "10%"}}>Pet</button>
                            <button type="button" className="btn btn-primary" style={{width: "20%", marginLeft: "10%"}}>Feed</button>
                            <button type="button" className="btn btn-primary" style={{width: "20%", marginLeft: "10%"}} onClick={() => releasePet(pet.id)}>Release</button>
                        </div>
                        <div style={{marginTop: "5px"}}>
                            Happiness: &#128151; &#128151; &#128151; &#128151; &#128151; &#128151; &#128151; &#128151;
                        </div>
                    </div>
                    )
                }) : null}
            </div>
        </div>
        <div className="row border border-success">
            <div className="col border border-secondary">
            <Link to="" className="nav-link link-dark border border-danger" style={{width: "50%", marginLeft: "25%", textAlign: "center"}}>Edit Stats (500 credits)</Link>
            </div>
            <div className="col border border-secondary">
            <Link to="" className="nav-link link-dark border border-danger" style={{width: "50%", marginLeft: "25%", textAlign: "center"}}>Dive!</Link>
            </div>
            <div className="col border border-secondary">
            <Link to={`/characters/${name}/pets/create`} className="nav-link link-dark border border-danger" style={{width: "50%", marginLeft: "25%", textAlign: "center"}}>
                <button className="btn btn-success" style={{width: "100%"}}>New Pet</button>
            </Link>
            </div>
        </div>
        <div className="row border border-success" style={{marginTop: "10px"}}>
            <div className="col border border-secondary">
                <button className="btn btn-primary" style={{width: "50%", marginLeft: "40%", textAlign: "center"}} onClick={deleteCharacter}>Delete Character</button>
            </div>
            <div className="col border border-secondary">
                <Link to="/characters" className="nav-link link-dark border border-danger" style={{width: "50%", marginLeft: "10%", textAlign: "center"}}><button className="btn btn-primary" style={{width: "100%"}} onClick={() => setCharacter(null)}>Back to Characters</button></Link>
            </div>
        </div>
    </div>
  )
}

export default Character