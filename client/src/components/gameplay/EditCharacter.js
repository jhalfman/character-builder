import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const EditCharacter = ( {setCharacter, character, characters, setCharacters} ) => {
    const [newCharacterForm, setNewCharacterForm] = useState({
        name: character.name,
        hp: character.hp,
        attack: character.attack,
        defense: character.defense,
        speed: character.speed,
        luck: character.luck,
        avatar_url: character.avatar_url
    })
    const [attributePoints, setAttributePoints] = useState(0)
    const [errors, setErrors] = useState(null)
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function editNewCharacterForm(e) {
        if (e.target.id === "name" || e.target.id === "avatar_url") {
            const updatedCharacterForm = {
                ...newCharacterForm,
                [e.target.id]: e.target.value
            }
            setNewCharacterForm(updatedCharacterForm)
        }
        else if (parseInt(newCharacterForm[e.target.id]) < parseInt(e.target.value)) {
            if ((e.target.value - newCharacterForm[e.target.id]) > attributePoints) {
                alert("Not enough Attribute Points Remaining")
            }
            else {
                const updatedCharacterForm = {
                    ...newCharacterForm,
                    [e.target.id]: e.target.value
                }
                setNewCharacterForm(updatedCharacterForm)
                setAttributePoints(attributePoints - (e.target.value - newCharacterForm[e.target.id]))
            }
        }
        else {
            if (e.target.value < 0) {
                alert("Cannot go below zero")
            }
            else {
                const updatedCharacterForm = {
                    ...newCharacterForm,
                    [e.target.id]: e.target.value
                }
                setNewCharacterForm(updatedCharacterForm)
                setAttributePoints(attributePoints + (newCharacterForm[e.target.id] - e.target.value))
            }
        }
    }

    function updateCharacter(e) {
        e.preventDefault();
        if (attributePoints !== 0) {
            alert(`You must use all attribute points (${attributePoints} points remaining)`)
        }
        else if (newCharacterForm.name === "") {
            alert('Character name cannot be blank')
        }
        else if (character.money < 500) {
            alert("Not enough funds to purchase new pet")
        }
        else {
            fetch(`/characters/${character.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({...newCharacterForm, current_hp: newCharacterForm.hp})
            })
            .then(resp => {
                if (resp.ok) {
                    resp.json().then(character => {
                        setCharacter(character)
                        const newCharacterList = characters.map(char => {
                            if (character.id === char.id) {
                                return character
                            }
                            else {
                                return char
                            }
                        })
                        setCharacters(newCharacterList)
                        navigate(`/characters/${character.name}`)
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
        handleClose();
    }

  return (
    <div className="bg-primary-subtle border border-primary">
        {errors ? errors.map(error => <div className="errors" key={error}>{error}</div>) : null}
      <form className="row" onSubmit={updateCharacter}>
        <legend className="border-bottom border-primary" style={{textAlign: "center", width: "75%", marginLeft: "12.5%"}}>Create New Character</legend>
        <div className="mb-3" style={{width: "33%", marginLeft: "33%"}}>
          <label htmlFor="name" className="form-label">Character Name</label>
          <input type="text" className="form-control" id="name" onChange={editNewCharacterForm} value={newCharacterForm.name}/>
        </div>
        <div className="mb-3" style={{width: "33%", marginLeft: "33%"}}>
          <label htmlFor="avatar_url" className="form-label">Avatar URL</label>
          <input type="text" className="form-control" id="avatar_url" onChange={editNewCharacterForm} value={newCharacterForm.avatar_url}/>
        </div>
        <div className="row">
            <div className="col-sm-4 mb-3"></div>
            <div className="col-sm-2 mb-3">
                <div>Attribute Bank</div>
                <input disabled style={{height: "60%", width: "50%"}} type="number" className="form-control" id="hp" aria-describedby="hpHelp" value={attributePoints}/>
            </div>
            <div className="col mb-3">
                <label htmlFor="hp" className="form-label">Hit Points</label>
                <input style={{width: "80%"}} type="number" className="form-control" id="hp" aria-describedby="hpHelp" onChange={editNewCharacterForm} value={newCharacterForm.hp}/>
                <label htmlFor="speed" className="form-label">Speed</label>
                <input style={{width: "80%"}} type="number" className="form-control" id="speed" aria-describedby="speedHelp" onChange={editNewCharacterForm} value={newCharacterForm.speed}/>
            </div>
            <div className="col mb-3">
                <label htmlFor="attack" className="form-label">Attack</label>
                <input style={{width: "80%"}} type="number" className="form-control" id="attack" aria-describedby="attackHelp" onChange={editNewCharacterForm} value={newCharacterForm.attack}/>
                <label htmlFor="luck" className="form-label">Luck</label>
                <input style={{width: "80%"}} type="number" className="form-control" id="luck" aria-describedby="luckHelp" onChange={editNewCharacterForm} value={newCharacterForm.luck}/>
            </div>
            <div className="col mb-3">
                <label htmlFor="defense" className="form-label">Defense</label>
                <input style={{width: "80%"}} type="number" className="form-control" id="defense" aria-describedby="defenseHelp" onChange={editNewCharacterForm} value={newCharacterForm.defense}/>
            </div>
            <div className="col-sm-3 mb-3"></div>
        </div>
        <div className="row border-top border-primary" style={{paddingTop: "10px", width: "75%", marginLeft: "12.5%"}}>
        <p className="fs-5" style={{width: "25%", marginLeft: "27%"}}>Cost: 500 credits</p>
        <p className="fs-5" style={{width: "25%", marginLeft: "5%"}}>Available funds: {character.money} credits</p>
        </div>
        <button type="button" className="btn btn-primary" style={{width: "50%", marginLeft: "25%"}} onClick={handleShow}>Update Character</button>
      </form>
      <button type="button" className="btn btn-warning" style={{width: "30%", marginLeft: "35%", marginTop: "20px", marginBottom: "20px"}} onClick={() => navigate(`/characters/${character.name}`)}>Back to Character</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to edit your character?  This will cost 500 credits.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={updateCharacter}>
            Update Character
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditCharacter