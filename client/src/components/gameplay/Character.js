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
    }, [name, setCharacter])

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
                    setCharacter({...character, pets: newPets, money: character.money + 250})
                    console.log(character)
            }
            else {
                resp.json().then(error => {
                    console.log(error)
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
        <div className="row align-items-center border-bottom border-primary">
            <div className="col-8">
                <h3 className="border-bottom border-primary" style={{textAlign: "center", paddingBottom: "10px", width: "50%", marginLeft: "25%"}}>{character.name}</h3>
                <img src={character.avatar_url} style={{width: "40%", marginLeft: "30%", marginBottom: "20px", marginTop: "10px"}} alt={character.name}></img>
                <div className="border-top border-primary" style={{paddingTop: "20px"}}>
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
                <h3 className='border-bottom border-primary' style={{textAlign: "center", marginTop: "10px", paddingBottom: "10px"}}>{character.name}'s Pets</h3>
                {character ? character.pets.map(pet => {
                    return (
                    <div key={pet.name} className='' style={{padding: "5%"}}>
                        <h5 style={{textAlign: "center"}}>{pet.name}</h5>
                        <img src={`${pet.pet_archetype.image_url}`} style={{width: "50%", marginLeft: "25%"}} alt={pet.name}></img>
                        <div className=''>
                            <button type="button" className="btn btn-primary" style={{width: "25%", marginLeft: "6.25%"}}>Pet</button>
                            <button type="button" className="btn btn-primary" style={{width: "25%", marginLeft: "6.25%"}}>Feed</button>
                            <button type="button" className="btn btn-primary" style={{width: "25%", marginLeft: "6.25%"}} onClick={() => releasePet(pet.id)}>Release</button>
                        </div>
                        <div style={{marginTop: "5px"}}>
                            Happiness: &#128151; &#128151; &#128151; &#128151; &#128151; &#128151; &#128151; &#128151;
                        </div>
                    </div>
                    )
                }) : null}
            </div>
        </div>
        <div className="row border-bottom border-primary" style={{paddingBottom: "5px", marginTop: "5px"}}>
            <div className="col">
            <Link to={`/characters/${name}/edit`} className="nav-link link-dark" style={{width: "50%", marginLeft: "25%", textAlign: "center"}}><button className="btn btn-success" style={{width: "100%"}}>Edit Stats</button></Link>
            </div>
            <div className="col">
            <Link to="" className="nav-link link-dark" style={{width: "50%", marginLeft: "25%", textAlign: "center"}}>Dive!</Link>
            </div>
            <div className="col">
            <Link to={`/characters/${name}/pets/create`} className="nav-link link-dark" style={{width: "50%", marginLeft: "25%", textAlign: "center"}}>
                <button className="btn btn-success" style={{width: "100%"}}>New Pet</button>
            </Link>
            </div>
        </div>
        <div className="row" style={{marginTop: "5px", marginBottom: "5px"}}>
            <div className="col">
                <button className="btn btn-primary" style={{width: "50%", marginLeft: "40%", textAlign: "center", height: "100%"}} onClick={deleteCharacter}>Delete Character</button>
            </div>
            <div className="col">
                <Link to="/characters" className="nav-link link-dark" style={{width: "50%", marginLeft: "10%", textAlign: "center"}}><button className="btn btn-primary" style={{width: "100%"}} onClick={() => setCharacter(null)}>Back to Characters</button></Link>
            </div>
        </div>
    </div>
  )
}

export default Character