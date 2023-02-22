import React, { useEffect, useState } from 'react'

const PetTypes = () => {
    const [pets, setPets] = useState(null)

    useEffect(() => {
        fetch(`/pet_archetypes`)
        .then(resp => resp.json())
        .then(data => setPets(data))
    }, [])

  return (
    <div className="container">
        <div className="row">
            <div className="col-sm-12 "><h1 style={{textAlign: "center", marginTop: "10px"}}>Pet Types</h1></div>
            {pets ? pets.map(pet => {
                return (
                    <div className="col-sm-4 border border-primary" key={pet.name} style={{marginTop: "20px", paddingRight: "20px", paddingLeft: "20px"}}> 
                        <div className="row justify-content-center">
                            <h3 style={{textAlign: "center"}}>{pet.name}</h3>
                        </div>
                        <div className="row justify-content-center"> 
                            <img src={`${pet.image_url}`} style={{width: "200px"}} alt={pet.name}></img>
                        </div>
                        <div className="row">
                            <p>Description: {pet.description}</p>
                            <ul style={{marginLeft: "10px", marginTop: "-10px"}}>
                                <li>Attack: {Math.trunc(pet.attack * 100)}%</li>
                                <li>Defense: {Math.trunc(pet.defense * 100)}%</li>
                                <li>Speed: {Math.trunc(pet.speed * 100)}%</li>
                            </ul>
                        </div>
                    </div>
                )
            }) : null}
        </div>
    </div>
  )
}

export default PetTypes