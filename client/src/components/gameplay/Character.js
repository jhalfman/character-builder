import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NavLink as Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Character = ( {setCharacters, characters, character, setCharacter} ) => {
    const [errors, setErrors] = useState(null)
    const hunger = useRef(0)
    const petCount = useRef(0)
    const pettingTarget = useRef(null)
    let {name} = useParams();
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showDeleteCharacter, setShowDeleteCharacter] = useState(false);
    const handleCloseDeleteCharacter = () => setShowDeleteCharacter(false);
    const handleShowDeleteCharacter = () => setShowDeleteCharacter(true);
    const [petForRelease, setPetForRelease] = useState(null)
    

    useEffect(() => {
        fetch(`/characters/${name}`)
        .then(resp => {
            if (resp.ok) {
                resp.json().then(character => {
                    console.log(character)
                    setCharacter({...character, pets: character.pets.sort(function(x, y) {return x.id - y.id})})
                })
            }
            else {
                resp.json().then(error => {
                    setErrors(error)
                }) 
            }
        })
    }, [name, setCharacter])

    useEffect(() => {
        const interval = setInterval(() => {
            hunger.current += 1
            if (Math.floor(Math.random() * 100) + 1 > 95) {
                const targetPet = character.pets[(Math.floor(Math.random() * character.pets.length))]
                if (targetPet.energy > 0) {
                    const newEnergy = {energy: targetPet.energy - 1}
                    fetch(`/pets/${targetPet.id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newEnergy)
                    })
                    .then(resp => {
                        if (resp.ok) {
                            resp.json().then(newPet => {
                                const newPetArray = character.pets.map(pet => {
                                    if (pet.id === newPet.id) {
                                        return newPet
                                    }
                                    else return pet
                                })
                                setCharacter({...character, pets: newPetArray})
                            })
                        }
                        else {
                            resp.json().then(error => {
                                setErrors(error)
                            }) 
                        }
                    })
                }
            }
            if (hunger.current === 3) {
                const targetPet = character.pets[(Math.floor(Math.random() * character.pets.length))]
                    if (targetPet.loyalty > 0) {
                        const newLoyalty = {loyalty: targetPet.loyalty - 1}
                        fetch(`/pets/${targetPet.id}`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(newLoyalty)
                        })
                        .then(resp => {
                            if (resp.ok) {
                                resp.json().then(newPet => {
                                    const newPetArray = character.pets.map(pet => {
                                        if (pet.id === newPet.id) {
                                            return newPet
                                        }
                                        else return pet
                                    })
                                    setCharacter({...character, pets: newPetArray})
                                })
                            }
                            else {
                                resp.json().then(error => {
                                    setErrors(error)
                                }) 
                            }
                        })
                    }
                hunger.current = 0
            }
        }, 10000);
      
        return () => clearInterval(interval);
      }, [character, setCharacter]);

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
        handleClose()
    }

    function releasePet(id) {
        fetch(`/pets/${id}`, {
            method: "DELETE"
        })
        .then(resp => {
            if (resp.ok) {
                    const newPets = character.pets.filter(pet => pet.id !== id)
                    setCharacter({...character, pets: newPets, money: character.money + 250})
            }
            else {
                resp.json().then(error => {
                    setErrors(error)
                }) 
            }
        })
        handleClose()
    }

    function feedPet(pet) {
        if (character.money >= 50 && pet.energy < 5) {
            fetch(`/pets/${pet.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({energy: pet.energy + 1})
            })
            .then(resp => {
                if (resp.ok) {
                    resp.json().then(newPet => {
                        const newPetArray = character.pets.map(pet => {
                            if (pet.id === newPet.id) {
                                return newPet
                            }
                            else return pet
                        })
                        setCharacter({...character, pets: newPetArray, money: character.money - 50})
                    })
                }
                else {
                    resp.json().then(error => {
                        setErrors(error)
                    }) 
                }
            })
        }
        else if (character.money < 50) {
            alert("Feeding pets costs 50 credits")
        }
        else {
            alert("Pet is not hungry")
        }
    }

    function petPet(pet) {
        if (pettingTarget.current === null) {
            pettingTarget.current = pet.id
            petCount.current += 1
        }
        else if (pettingTarget.current === pet.id && petCount.current < 9) {
            petCount.current += 1
        }
        else if (pettingTarget.current !== pet.id) {
            pettingTarget.current = pet.id
            petCount.current = 1
        }
        else {
            if (pet.loyalty < 5) {
                fetch(`/pets/${pet.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({loyalty: pet.loyalty + 1})
                })
                .then(resp => {
                    if (resp.ok) {
                        resp.json().then(newPet => {
                            const newPetArray = character.pets.map(pet => {
                                if (pet.id === newPet.id) {
                                    return newPet
                                }
                                else return pet
                            })
                            setCharacter({...character, pets: newPetArray})
                        })
                    }
                    else {
                        resp.json().then(error => {
                            setErrors(error)
                        }) 
                    }
                })
                petCount.current = 0
            }
            else {
                alert("Pet already loves you!")
            }
        }
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
                    const energyHearts = [];
                    const affectionHearts = [];
                    for (let i = 0; i < pet.loyalty; i++) {
                        affectionHearts.push(<span key={i} style={{disply: "inline"}}>&#x1F497;</span>)
                    }
                    for (let i = 0; i < pet.energy; i++) {
                        energyHearts.push(<span key={i} style={{disply: "inline"}}>&#x1F497;</span>)
                    }
                    return (
                    <div key={pet.name} className='' style={{padding: "5%"}}>
                        <h5 style={{textAlign: "center"}}>{pet.name}</h5>
                        <img src={`${pet.pet_archetype.image_url}`} style={{width: "50%", marginLeft: "25%"}} alt={pet.name}></img>
                        <div className=''>
                            <button type="button" className="btn btn-primary" style={{width: "25%", marginLeft: "6.25%"}} onClick={() => petPet(pet)}>Pet</button>
                            <button type="button" className="btn btn-primary" style={{width: "25%", marginLeft: "6.25%"}} onClick={() => feedPet(pet)}>Feed(-50)</button>
                            <button type="button" className="btn btn-primary" style={{width: "25%", marginLeft: "6.25%"}} onClick={() => {setPetForRelease(pet); handleShow()}}>Release</button>
                        </div>
                        <div style={{marginTop: "5px"}}>                     
                            Hunger: {energyHearts}
                            <br></br>
                            Affection: {affectionHearts}
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
            <Link to={`/characters/${name}/dive`} className="nav-link link-dark" style={{width: "50%", marginLeft: "25%", textAlign: "center"}}><button className="btn btn-success" style={{width: "100%"}}>Dive!</button></Link>
            </div>
            <div className="col">
            <Link to={`/characters/${name}/pets/create`} className="nav-link link-dark" style={{width: "50%", marginLeft: "25%", textAlign: "center"}}>
                <button className="btn btn-success" style={{width: "100%"}}>New Pet</button>
            </Link>
            </div>
        </div>
        <div className="row" style={{marginTop: "5px", marginBottom: "5px"}}>
            <div className="col">
                <button className="btn btn-primary" style={{width: "50%", marginLeft: "40%", textAlign: "center", height: "100%"}} onClick={handleShowDeleteCharacter}>Delete Character</button>
            </div>
            <div className="col">
                <Link to="/characters" className="nav-link link-dark" style={{width: "50%", marginLeft: "10%", textAlign: "center"}}><button className="btn btn-primary" style={{width: "100%"}} onClick={() => setCharacter(null)}>Back to Characters</button></Link>
            </div>
        </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Release Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>{petForRelease ? `Are you sure you want to release ${petForRelease.name}? You will receive 250 credits in return.` : null}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => releasePet(petForRelease.id)}>
            Release Pet
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteCharacter} onHide={handleCloseDeleteCharacter}>
        <Modal.Header closeButton>
          <Modal.Title>Character Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {character.name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => deleteCharacter()}>
            Delete Character
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default Character