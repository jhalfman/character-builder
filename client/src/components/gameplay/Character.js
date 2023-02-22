import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink as Link} from 'react-router-dom';

const Character = () => {
    const [character, setCharacter] = useState(null)
    const [errors, setErrors] = useState(null)
    let {name} = useParams();

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
    console.log(character)

  return (
    <div className="container border border-primary">
        {errors ? errors.map(error => <div className="errors" key={error}>{error}</div>) : null}
        <div className="row border border-success" style={{height: "700px"}}>
            <div className="col-8 border border-warning">
                <h3 style={{textAlign: "center"}}>{character.name}</h3>
                <img src={character.avatar_url} style={{width: "50%", marginLeft: "25%"}}></img>
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
            <div className="col-4 border border-info" style={{overflowY: "auto", height: "100%"}}>
                {character ? character.pets.map(pet => {
                    return (
                    <div className='border border-warning' style={{padding: "5%"}}>
                        <h5 style={{textAlign: "center"}}>{pet.name}</h5>
                        <img src={`${pet.pet_archetype.image_url}`} style={{width: "50%", marginLeft: "25%"}}></img>
                        <div className='border border-primary'>
                            <button type="button" class="btn btn-primary" style={{width: "20%", marginLeft: "10%"}}>Pet</button>
                            <button type="button" class="btn btn-primary" style={{width: "20%", marginLeft: "10%"}}>Feed</button>
                            <button type="button" class="btn btn-primary" style={{width: "20%", marginLeft: "10%"}}>Release</button>
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
            <div class="col border border-secondary">
            <Link to="" className="nav-link link-dark border border-danger" style={{width: "50%", marginLeft: "25%", textAlign: "center"}}>Edit Stats (500 credits)</Link>
            </div>
            <div class="col border border-secondary">
            <Link to="" className="nav-link link-dark border border-danger" style={{width: "50%", marginLeft: "25%", textAlign: "center"}}>Dive!</Link>
            </div>
            <div class="col border border-secondary">
            <Link to="" className="nav-link link-dark border border-danger" style={{width: "50%", marginLeft: "25%", textAlign: "center"}}>New Pet</Link>
            </div>
        </div>
    </div>
  )
}

export default Character

{/* {errors ? errors.map(error => <div className="errors" key={error}>{error}</div>) : null}
        {character ? character.name : null}
        {character ? character.pets.map(pet => {
            return <img src={`${pet.pet_archetype.image_url}`} style={{width: "200px"}}></img>
        }) : null} */}