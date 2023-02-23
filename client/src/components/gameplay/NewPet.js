import React, { useState } from 'react';
import { useNavigate, NavLink as Link, useParams} from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

const NewPet = ( {petTypes, character} ) => {
    const [newPetForm, setNewPetForm] = useState({
        name: "",
        modifier: "",
        pet_archetype_id: ""
    })
    const [selectedPet, setSelectedPet] = useState(null)
    const [errors, setErrors] = useState(null)
    const modifierDescriptions = {
        Lucky: "This modifier increases the owner's luck by 10%, improving odds at dodging attacks, getting bonus experience, or finding extra treasure.",
        Loyal: "This modifier decreases the amount of attention a pet requires to stay loyal.  Affection will decrease less quickly, and actions improve relationships by double the amount.",
        Hungry: "This modifier increases the amount of feeding a pet requires, but increases the power of their abilities.  Keeping a hungry pet fed will produce a stronger pet."
    }
    let {name} = useParams();
    const navigate = useNavigate()

    function selectPet(type) {
        setNewPetForm({...newPetForm, pet_archetype_id: type.id, name: ""})
        setSelectedPet(type)
    }

    function updateName(e) {
        setNewPetForm({...newPetForm, name: e.target.value})
    }

    function updateModifier(e) {
        setNewPetForm({
            ...newPetForm,
            modifier: e.target.id
        })
    }

    function buyPet(e) {
        e.preventDefault();
        if (character.money < 500) {
            alert("Not enough funds to purchase new pet")
        }
        else {
            fetch(`/pets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({...newPetForm, character_id: character.id})
            })
            .then(resp => {
                if (resp.ok) {
                    resp.json().then(pet => {
                       console.log(pet)
                       navigate(`/characters/${name}`)
                    })
                }
                else {
                    resp.json().then(error => {
                        console.log(error)
                        setErrors(error)
                    }) 
                }
            })
        }
    }

  return (
    <div>
        {errors ? errors.map(error => <div className="errors" key={error}>{error}</div>) : null}
        <h1 style={{textAlign: "center"}}>Buy New Pet</h1>
        <form className="row border border-success" style={{width: "75%", marginLeft: "12.5%"}} onSubmit={buyPet}>
            <div className="col-4 border border-warning">
                <h3 style={{textAlign: "center"}}>Types</h3>
                <div className="border-bottom border-dark" style={{marginTop: "30px"}}>
                    {petTypes ? petTypes.map(type => {
                        return <img src={type.image_url} alt={type.name} key={type.name} className={(selectedPet && selectedPet.name === type.name) ? "border border-primary border-4" : null} style={{width: "20%", marginLeft: "10%", marginBottom:"10px"}}onClick={() => selectPet(type)}></img>
                    }) : null}
                </div>
                {selectedPet ? <p className="fs-5" style={{textAlign: "center", marginTop: "5px", width: "90%", marginLeft: "5%"}}>{selectedPet.name}: {selectedPet.description}</p> : null}
                {selectedPet ? 
                    <ul className="fs-5 border-bottom border-dark" style={{listStyleType: "none", paddingBottom: "10px"}}>
                        <li className="">Attack: {Math.trunc(selectedPet.attack * 10)}</li>
                        <li className="">Defense: {Math.trunc(selectedPet.defense * 10)}</li>
                        <li className="">Speed: {Math.trunc(selectedPet.speed * 10)}</li>
                    </ul> : null}
                {selectedPet ? <Dropdown as={ButtonGroup} style={{width: "100%", marginTop: "-5px"}}>
                    <Dropdown.Toggle>{newPetForm.modifier || "Choose a Pet Modifier"}</Dropdown.Toggle>
                    <Dropdown.Menu style={{width: "50%"}}>
                        <Dropdown.Item id="Lucky" onClick={updateModifier}>Lucky</Dropdown.Item>
                        <Dropdown.Item id="Loyal" onClick={updateModifier}>Loyal</Dropdown.Item>
                        <Dropdown.Item id="Hungry" onClick={updateModifier}>Hungry</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> : null}
                {newPetForm.modifier ? <p className="fs-5 border-bottom border-dark" style={{textAlign: "center", marginTop: "10px", width: "90%", marginLeft: "5%"}}>{newPetForm.modifier} Modifier: {modifierDescriptions[newPetForm.modifier]}</p> : <p><br></br><br></br><br></br><br></br><br></br><br></br></p>}
                <Link to={`/characters/${name}`} className="nav-link link-dark" style={{width: "100%", textAlign: "center"}}><button className="btn btn-warning" style={{width: "100%"}}>Back to Character</button></Link>
            </div>
            <div className="col-8 border border-info" style={{}}>
                {selectedPet ? <h3 style={{textAlign: "center"}}>{selectedPet.name}</h3> : null}
                {selectedPet ? <img src={selectedPet.image_url} alt={selectedPet.name} style={{width: "50%", marginLeft: "25%", marginBottom:"10px"}}></img>: null}
                {selectedPet ? <div className="mb-3 border-top border-primary form-group row" style={{width: "95%", marginLeft: "5%", paddingTop: "10px"}}>
                                    <label htmlFor="name" className="col-form-label col-sm-3">Pet's Name:</label>
                                    <input type="text" className="col-form-control col-sm-6" id="name" onChange={updateName} value={newPetForm.name} style={{marginLeft: "-4%"}}/>
                                </div> : null}
                {selectedPet ? <div className="mb-3 border-top border-primary form-group row disabled" style={{width: "95%", marginLeft: "5%", paddingTop: "10px"}}>
                                    <label htmlFor="modifier" className="col-form-label col-sm-3">Pet's Modifier:</label>
                                    <input type="text" readOnly className="col-form-control col-sm-6 form-control-plaintext" id="modifier" value={newPetForm.modifier} style={{marginLeft: "-4%", width: "50%"}}/>
                                </div> : null}
                                {selectedPet ? <div className="border-top border-primary" style={{width: "93%", marginLeft: "6.5%", paddingTop: "5px"}}>
                                    <p>Cost: 500 credits</p>
                                    <p>Available funds: {character.money} credits</p>
                                    </div> : null}
                {newPetForm.modifier && (selectedPet && newPetForm.name !== "") && <button className="btn btn-info" style={{width: "90%", marginLeft: "5%"}}>Purchase New Pet</button>}
            </div>
        </form>
        
    </div>
  )
}

export default NewPet