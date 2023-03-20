import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Dive = ( { character }) => {
  const [currentLevel, setCurrentLevel] = useState(null)
  const [currentDirections, setCurrentDirections] = useState("Choose your battle actions")
  const [currentDive, setCurrentDive] = useState(null)
  const [currentEnemies, setCurrentEnemies] = useState(null)
  const [selectPetsForm, setSelectPetsForm] = useState({
    pet_id_1: null,
    pet_id_2: null
  })
  const [currentPets, setCurrentPets] = useState([])
  const [errors, setErrors] = useState(null)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [turn, setTurn] = useState(true)
  const [diveStats, setDiveStats] = useState({
    teamAttack: 0,
    teamDefense: 0,
    teamSpeed: 0,
    teamLuck: 0
  })

  useEffect(() => {
    if (character) {
      fetch(`/dives/${character.id}`)
      .then(resp => {
        if (resp.ok) {
            resp.json().then(dive => {
              setSelectPetsForm({pet_id_1: dive.pet_id_1, pet_id_2: dive.pet_id_2})
              setCurrentEnemies(dive.enemies)
              setCurrentDive(dive.id)
              setCurrentLevel(dive.level_reached)
              const newPetList = character.pets.filter(pet => pet.id === dive.pet_id_1 || pet.id === dive.pet_id_2)
              setCurrentPets(newPetList)
              updateDiveStats()
            })
        }
        else {
            resp.json().then(noDiveError => {
                console.log(noDiveError)
            }) 
        }
      })
    }
  }, [])

  function createDive() {
    fetch(`/dives`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({character_id: character.id, ...selectPetsForm})
    })
    .then(resp => {
      if (resp.ok) {
          resp.json().then(dive => {
            setCurrentDive(dive.id)
            setCurrentLevel(1)
            const newPetList = character.pets.filter(pet => pet.id === dive.pet_id_1 || pet.id === dive.pet_id_2)
            setCurrentPets(newPetList)
            updateDiveStats()
            handleClose();
          })
      }
      else {
          resp.json().then(error => {
              setErrors(error)
              handleClose();
          }) 
      }
    })
  }

  function generateEnemies() {
    const numberOfEnemies = Math.floor(Math.random() * 3) + 1
    fetch(`/enemies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({dive_id: currentDive, numberOfEnemies: numberOfEnemies, currentLevel: currentLevel})
    })
    .then(resp => {
      if (resp.ok) {
          resp.json().then(enemies => {
            console.log(enemies)
            setCurrentDirections("Choose an attack type and target")
            setCurrentEnemies(enemies)
          })
      }
      else {
          resp.json().then(error => {
              setErrors(error)
          }) 
      }
    })
  }

  function damageEnemy(id, newHp) {
    fetch(`/enemies/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({hp: newHp})
    })
    .then(resp => {
      if (resp.ok) {
          resp.json().then(enemy => {
            const updatedEnemies = currentEnemies.map(e => {
              if (e.id === enemy.id) {
                return enemy
              }
              else {
                return e
              }
            })
            setCurrentEnemies(updatedEnemies)
          })
      }
      else {
          resp.json().then(error => {
              setErrors(error)
          }) 
      }
    })
  }

  function killEnemy(id) {
    fetch(`/enemies/${id}`, {
      method: "DELETE"
    })
    .then(resp => {
      if (resp.ok) {
          const updatedEnemies = currentEnemies.filter(enemy => enemy.id !== id)
          setCurrentEnemies(updatedEnemies)
      }
      else {
          resp.json().then(error => {
              setErrors(error)
          }) 
      }
    })
  }

  function selectPet(e) {
    if (e.target.checked) {
      if (!selectPetsForm.pet_id_1) {
        setSelectPetsForm({...selectPetsForm, pet_id_1: e.target.id})
      }
      else {
        setSelectPetsForm({...selectPetsForm, pet_id_2: e.target.id})
      }
    }
    else {
      if (selectPetsForm.pet_id_1 === e.target.id) {
        setSelectPetsForm({...selectPetsForm, pet_id_1: null})
      }
      else {
        setSelectPetsForm({...selectPetsForm, pet_id_2: null})
      }
    }
  }

  function updateDiveStats() {
    let newAttack = character.attack
    let newDefense = character.defense
    let newSpeed = character.speed
    let newLuck = character.luck

    currentPets.forEach(pet => {
      newAttack += pet.pet_archetype.attack * (pet.energy + pet.loyalty)
      newDefense += pet.pet_archetype.defense * (pet.energy + pet.loyalty)
      newSpeed += pet.pet_archetype.speed * (pet.energy + pet.loyalty)
    })
    setDiveStats({
      teamAttack: newAttack,
      teamDefense: newDefense,
      teamSpeed: newSpeed,
      teamLuck: newLuck
    })
  }

  function attackSingle() {
    console.log(diveStats, character, currentPets, currentEnemies)
  }

  function attackMultiple() {
    currentEnemies.forEach(enemy => {
      if (enemy.hp > (diveStats.teamAttack - enemy.defense)) {
        const damage = enemy.hp - (diveStats.teamAttack - enemy.defense)
        damageEnemy(enemy.id, damage)
      }
      else {
        killEnemy(enemy.id)
      }
    })
  }

    if (!character) {
      return <div>Loading Character...</div>
  }

  return (
    <Container fluid>
      <Row className='border border-warning'>
        {currentLevel ? `Current Level: ${currentLevel}` : "Initializing Dive Attempt..."}
      </Row>
      <Row>
        <Col className='border border-primary'>
          <Row className='border border-info'>
            <Col xs={4} className='border border-dark'>
              <Form>
              {!currentDive ? character.pets ? character.pets.map(pet => {
                return <Form.Check key={pet.name} disabled={(selectPetsForm.pet_id_1 && selectPetsForm.pet_id_2) ? (parseInt(selectPetsForm.pet_id_1) === pet.id || parseInt(selectPetsForm.pet_id_2) === pet.id) ? false : true : false} type={'checkbox'} id={pet.id} label={<img src={pet.pet_archetype.image_url} alt={pet.name} style={{width: "80%", marginLeft: "10%"}}></img>} value={pet.id} onChange={selectPet}/>
              }) : null : character.pets.map(pet => {
                if (pet.id === selectPetsForm.pet_id_1 || pet.id === selectPetsForm.pet_id_2) {
                  return <img key={pet.name} src={pet.pet_archetype.image_url} alt={pet.name} style={{width: "80%", marginLeft: "10%"}}></img>
                }
                else return null
              })}
              </Form>
            </Col>
            <Col className='border border-primary align-self-center'>
              <img src={character.avatar_url} alt={character.name} style={{width: "80%", marginLeft: "10%"}} key={character.name}></img>
              {currentEnemies ? <Row><Button style={{width: "35%", marginLeft: "10%"}} onClick={attackSingle}>Attack Single</Button><Button style={{width: "35%", marginLeft: "10%"}} onClick={attackMultiple}>Attack Multiple</Button></Row> : null}
            </Col>
          </Row>
        </Col>
        <Col xs={2} className='border border-primary align-self-center'>
          <Row>
            <p style={{textAlign: "center"}}>{currentDive ? currentDirections : "Choose companions and then click button for new adventure"}</p>
          </Row>
          <Row>
            {currentDive ? currentEnemies ? null : <Button variant="warning" className='border border-dark' onClick={generateEnemies}>Generate Enemies</Button> : <Button variant="warning" className='border border-dark' onClick={handleShow}>Begin Dive</Button>}
          </Row>
        </Col>
        <Col className='border border-primary align-self-center'>
              {currentEnemies ? currentEnemies.map(enemy => {
                return <Row key={enemy.id} className='border border-primary' ><img src={enemy.enemy_archetype.image_url} alt={enemy.enemy_archetype.name} style={{width: "20%", marginLeft: "40%"}}></img><h4 style={{width: "20%"}}>hp: {enemy.hp}</h4></Row>
              }) : null}
        </Col>
      </Row>
      <Row>
        <Col className='border border-primary'>1 of 2</Col>
        <Col xs={2} className='border border-primary'>2 of 3 (wider)</Col>
        <Col className='border border-primary'>3 of 3</Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Start New Dive</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to begin a new dive with the selected pets?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={createDive}>
            Start Dive
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Dive