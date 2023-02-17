import React, { useState } from 'react'

const NewCharacter = () => {
    const [newCharacterForm, setNewCharacterForm] = useState({
        name: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        luck: 0
    })
    const [attributePoints, setAttributePoints] = useState(20)

    function createCharacter(e) {
        e.preventDefault();
        console.log(newCharacterForm)
    }

    // function updateAttributeBank(characterForm) {
    //     const attributeSum = parseInt(characterForm.hp) + parseInt(characterForm.attack) + parseInt(characterForm.defense) + parseInt(characterForm.speed) + parseInt(characterForm.luck)
    //     setAttributePoints(20 - attributeSum)
    // }

    function editNewCharacterForm(e) {
        if (e.target.id === "name") {
            const updatedCharacterForm = {
                ...newCharacterForm,
                [e.target.id]: e.target.value
            }
            setNewCharacterForm(updatedCharacterForm)
        }
        else if (parseInt(newCharacterForm[e.target.id]) < parseInt(e.target.value)) {
            if (attributePoints > 0) {
                const updatedCharacterForm = {
                    ...newCharacterForm,
                    [e.target.id]: e.target.value
                }
                setNewCharacterForm(updatedCharacterForm)
                setAttributePoints(attributePoints - 1)
            }
            else alert("No Attribute Points Remaining")
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
                setAttributePoints(attributePoints + 1)
            }
        }
    }

  return (
    <div className="bg-primary-subtle border border-primary">
      <form onSubmit={createCharacter} className="row">
        <legend className="border-bottom border-primary" style={{textAlign: "center", width: "75%", marginLeft: "12.5%"}}>Create New Character</legend>
        <div className="mb-3" style={{width: "33%", marginLeft: "33%"}}>
          <label htmlFor="name" className="form-label">Character Name</label>
          <input type="text" className="form-control" id="name" onChange={editNewCharacterForm} value={newCharacterForm.name}/>
        </div>
        <div className="row">
            <div className="col-sm-4 mb-3"></div>
            <div className="col-sm-2 mb-3">
                <div>Attribute Bank</div>
                <input disabled style={{height: "60%", width: "50%"}} type="number" className="form-control" id="hp" aria-describedby="hpHelp" value={attributePoints}/>
            </div>
            <div className="col mb-3">
                <label htmlFor="hp" className="form-label">Hit Points</label>
                <input style={{width: "60%"}} type="number" className="form-control" id="hp" aria-describedby="hpHelp" onChange={editNewCharacterForm} value={newCharacterForm.hp}/>
                <label htmlFor="speed" className="form-label">Speed</label>
                <input style={{width: "60%"}} type="number" className="form-control" id="speed" aria-describedby="speedHelp" onChange={editNewCharacterForm} value={newCharacterForm.speed}/>
            </div>
            <div className="col mb-3">
                <label htmlFor="attack" className="form-label">Attack</label>
                <input style={{width: "60%"}} type="number" className="form-control" id="attack" aria-describedby="attackHelp" onChange={editNewCharacterForm} value={newCharacterForm.attack}/>
                <label htmlFor="luck" className="form-label">Luck</label>
                <input style={{width: "60%"}} type="number" className="form-control" id="luck" aria-describedby="luckHelp" onChange={editNewCharacterForm} value={newCharacterForm.luck}/>
            </div>
            <div className="col mb-3">
                <label htmlFor="defense" className="form-label">Defense</label>
                <input style={{width: "60%"}} type="number" className="form-control" id="defense" aria-describedby="defenseHelp" onChange={editNewCharacterForm} value={newCharacterForm.defense}/>
            </div>
            <div className="col-sm-3 mb-3"></div>
        </div>
        {/* <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" for="exampleCheck1">Keep me signed in</label>
        </div> */}
        <button type="submit" className="btn btn-primary" style={{width: "50%", marginLeft: "25%"}}>Create Character</button>
      </form>
    </div>
  )
}

export default NewCharacter