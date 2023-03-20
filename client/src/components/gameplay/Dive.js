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
  const [currentEnemies, setCurrentEnemies] = useState([])
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
  const [targetSelect, setTargetSelect] = useState(false)
  const [defending, setDefending] = useState(false)

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
              setCurrentDirections("Choose an attack type")
              updateDiveStats(newPetList)
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
            updateDiveStats(newPetList)
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
            setCurrentDirections("Choose an attack type")
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
          console.log("Enemy Defeated!")
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

  function updateDiveStats(pets) {
    let newAttack = character.attack
    let newDefense = character.defense
    let newSpeed = character.speed
    let newLuck = character.luck

    pets.forEach(pet => {
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

  function singleTarget() {
    setTargetSelect(true)
    setCurrentDirections("Select single target")
  }

  function attackSingle(enemy) {
    if (enemy.hp > (diveStats.teamAttack - enemy.defense)) {
      const damage = enemy.hp - (diveStats.teamAttack - enemy.defense)
      damageEnemy(enemy.id, damage)
      enemyAttack(currentEnemies, false)
    }
    else {
      killEnemy(enemy.id)
      const updatedEnemies = currentEnemies.filter(e => e.id !== enemy.id)
      setCurrentEnemies(updatedEnemies)
      if (updatedEnemies.length === 0) {
        setCurrentDirections(`${currentLevel} completed! Click to start level ${currentLevel + 1}`)
        fetch(`/dives/${currentDive}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({level_reached: currentLevel + 1})
        })
        .then(resp => {
          if (resp.ok) {
                setCurrentLevel(currentLevel + 1)
          }
          else {
              resp.json().then(error => {
                  setErrors(error)
              }) 
          }
        })
      }
      else {
        enemyAttack(updatedEnemies, false)
      }
    }
    setTargetSelect(false)
  }


  function attackMultiple() {
    let updatedEnemies = [...currentEnemies]
    currentEnemies.forEach(enemy => {
      if (enemy.hp > (diveStats.teamAttack - enemy.defense)) {
        const damage = enemy.hp - (diveStats.teamAttack - enemy.defense)
        damageEnemy(enemy.id, damage)
      }
      else {
        killEnemy(enemy.id)
        updatedEnemies = updatedEnemies.filter(e => e.id !== enemy.id)
      }
    })
    setCurrentEnemies(updatedEnemies)
    if (updatedEnemies.length === 0) {
      setCurrentDirections(`${currentLevel} completed! Click to start level ${currentLevel + 1}`)
      fetch(`/dives/${currentDive}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({level_reached: currentLevel + 1})
      })
      .then(resp => {
        if (resp.ok) {
              setCurrentLevel(currentLevel + 1)
        }
        else {
            resp.json().then(error => {
                setErrors(error)
            }) 
        }
      })
    }
    else enemyAttack(updatedEnemies, false)
  }

  function defendAttack() {
    setDefending(true);
    enemyAttack(currentEnemies, true);
  }
  
  function enemyAttack(enemyList, defense) {
    let returnDamage = 0;
    enemyList.forEach(enemy => {
      if (defense) {
        if (enemy.attack > diveStats.teamDefense) {
          console.log(enemy.attack - diveStats.teamDefense, "A")
        }
        else {
          console.log(enemy.attack - diveStats.teamDefense, "B")
        }
      }
      else {
        if (enemy.attack > diveStats.teamDefense/5) {
          returnDamage += enemy.attack - diveStats.teamDefense/5
        }
        else {
          console.log(enemy.attack - diveStats.teamDefense/5, "2")
        }
      }
    })
    // fetch(`/character/${character.id}`)
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
            <Col xs={4} className='border border-dark align-self-center'>
              <Form>
              {!currentDive ? character.pets ? character.pets.map(pet => {
                return <Form.Check key={pet.name} disabled={(selectPetsForm.pet_id_1 && selectPetsForm.pet_id_2) ? (parseInt(selectPetsForm.pet_id_1) === pet.id || parseInt(selectPetsForm.pet_id_2) === pet.id) ? false : true : false} type={'checkbox'} id={pet.id} label={<img src={pet.pet_archetype.image_url} alt={pet.name} style={{width: "80%", marginLeft: "10%"}}></img>} value={pet.id} onChange={selectPet}/>
              }) : null : character.pets.map(pet => {
                if (pet.id === parseInt(selectPetsForm.pet_id_1) || pet.id === parseInt(selectPetsForm.pet_id_2)) {
                  return <img key={pet.name} src={pet.pet_archetype.image_url} alt={pet.name} style={{width: "80%", marginLeft: "10%"}}></img>
                }
                else return null
              })}
              </Form>
            </Col>
            <Col className='border border-primary align-self-center'>
              <img src={character.avatar_url} alt={character.name} style={{width: "80%", marginLeft: "10%"}} key={character.name}></img>
            </Col>
          </Row>
        </Col>
        <Col xs={2} className='border border-primary align-self-center'>
          <Row>
            <p style={{textAlign: "center"}}>{currentDive ? currentDirections : "Choose companions and then click button for new adventure"}</p>
          </Row>
          <Row>
            {currentDive ? currentEnemies.length !== 0 ? null : <Button variant="warning" className='border border-dark' onClick={generateEnemies}>Generate Enemies</Button> : <Button variant="warning" className='border border-dark' onClick={handleShow}>Begin Dive</Button>}
          </Row>
        </Col>
        <Col className='border border-primary align-self-center'>
              {currentEnemies ? currentEnemies.map(enemy => {
                return <Row key={enemy.id} className='border border-primary' ><img src={enemy.enemy_archetype.image_url} alt={enemy.enemy_archetype.name} style={{width: "20%", marginLeft: "40%"}} onClick={targetSelect ? () => attackSingle(enemy) : null}></img><h4 style={{width: "20%"}}>hp: {enemy.hp}</h4></Row>
              }) : null}
        </Col>
      </Row>
      <Row>
        <Col className='border border-primary'>{currentEnemies.length > 0 ? <Row style={{paddingTop: "5px", paddingBottom: "5px"}}><Button style={{width: "25%", marginLeft: "5%"}} onClick={singleTarget}>Attack Single</Button><Button style={{width: "25%", marginLeft: "5%"}} onClick={attackMultiple}>Attack Multiple</Button><Button style={{width: "25%", marginLeft: "5%"}} onClick={defendAttack}>Defend</Button></Row> : null}
        <Row><h4>hp: {character.hp}</h4></Row>
        </Col>
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