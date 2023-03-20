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
  const [errors, setErrors] = useState(null)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    if (character) {
      fetch(`/dives/${character.id}`)
      .then(resp => {
        if (resp.ok) {
            resp.json().then(dive => {
              setSelectPetsForm({pet_id_1: dive.pet_id_1, pet_id_2: dive.pet_id_2})
              setCurrentDive(dive.id)
              setCurrentLevel(dive.level_reached)
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
    console.log(currentDive, character.id)
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
          })
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
            </Col>
          </Row>
        </Col>
        <Col xs={2} className='border border-primary align-self-center'>
          <Row>
            <p style={{textAlign: "center"}}>{currentDive ? currentDirections : "Choose companions and then click button for new adventure"}</p>
          </Row>
          <Row>
            {currentDive ? <Button variant="warning" className='border border-dark' onClick={generateEnemies}>Generate Enemies</Button> : <Button variant="warning" className='border border-dark' onClick={handleShow}>Begin Dive</Button>}
          </Row>
        </Col>
        <Col className='border border-primary'>2 of 2</Col>
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