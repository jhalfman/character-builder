import React, { useState } from 'react';
import { NavLink as Link, useParams} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const NewPet = ( {petTypes} ) => {
    const [newPetForm, setNewPetForm] = useState({
        name: "",
        modifier: "",
        pet_archetype_id: ""
    })
    const [selectedPet, setSelectedPet] = useState(null)
    const [errors, setErrors] = useState(null)
    let {name} = useParams();

    function selectPet(type) {
        setNewPetForm({...newPetForm, pet_archetype_id: type.id, name: ""})
        setSelectedPet(type)
    }

    function updateName(e) {
        setNewPetForm({...newPetForm, name: e.target.value})
    }

  return (
    <div>
        {errors ? errors.map(error => <div className="errors" key={error}>{error}</div>) : null}
        <h1 style={{textAlign: "center"}}>Buy New Pet</h1>
        <form className="row border border-success">
            <div className="col-4 border border-warning">
                <h3 style={{textAlign: "center"}}>Types</h3>
                <div className="border border-light" style={{marginTop: "30px"}}>
                    {petTypes ? petTypes.map(type => {
                        return <img src={type.image_url} alt={type.name} style={{width: "20%", marginLeft: "10%", marginBottom:"10px"}}onClick={() => selectPet(type)}></img>
                    }) : null}
                </div>
                <DropdownButton id="dropdown-item-button" title="Pet's Modifier" style={{width: "100%"}}>
                    <Dropdown.ItemText>Choose a modifierr</Dropdown.ItemText>
                    <Dropdown.Item as="button">Action</Dropdown.Item>
                    <Dropdown.Item as="button">Another action</Dropdown.Item>
                    <Dropdown.Item as="button">Something else</Dropdown.Item>
                </DropdownButton>
            </div>
            <div className="col-8 border border-info" style={{overflowY: "auto", height: "700px"}}>
                {selectedPet ? <h3 style={{textAlign: "center"}}>{selectedPet.name}</h3> : null}
                {selectedPet ? <img src={selectedPet.image_url} alt={selectedPet.name} style={{width: "50%", marginLeft: "25%", marginBottom:"10px"}}></img>: null}
                {selectedPet ? <div className="mb-3 border-top border-primary form-group row" style={{width: "95%", marginLeft: "5%", paddingTop: "10px"}}>
                                    <label htmlFor="name" className="col-form-label col-sm-3">Pet's Name:</label>
                                    <input type="text" className="col-form-control col-sm-6" id="name" onChange={updateName} value={newPetForm.name} style={{marginLeft: "-4%"}}/>
                                </div> : null}
                {selectedPet ? <div className="mb-3 border-top border-primary form-group row disabled" style={{width: "95%", marginLeft: "5%", paddingTop: "10px"}}>
                                    <label htmlFor="modifier" className="col-form-label col-sm-3">Pet's Modifier:</label>
                                    <input type="text" readOnly className="col-form-control form-control-plaintext col-sm-6" id="modifier" value={newPetForm.modifier} style={{marginLeft: "-4%"}}/>
                                </div> : null}
            </div>
        </form>
        <Link to={`/characters/${name}`} className="nav-link link-dark" style={{width: "15%", textAlign: "center"}}><button className="btn btn-warning" style={{width: "100%"}}>Back to Character</button></Link>
    </div>
  )
}

export default NewPet