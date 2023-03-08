import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Dive = ( {character }) => {
  const [currentLevel, setCurrentLevel] = useState(1)
  const [currentDirections, setCurrentDirections] = useState("Choose your battle actions")
    console.log(character)

    if (!character) {
      return <div>Loading Character...</div>
  }

  return (
    <Container fluid>
      <Row className='border border-warning'>
        Current Level: {currentLevel}
      </Row>
      <Row>
        <Col className='border border-primary'>
          <Row className='border border-info'>
            <Col xs={4} className='border border-dark'>
              {character.pets ? character.pets.map(pet => {
                return <img src={pet.pet_archetype.image_url} alt={pet.name} style={{width: "80%"}} key={pet.name}></img>
              }) : null}
            </Col>
            <Col>
              <img src={character.avatar_url} alt={character.name} style={{width: "80%"}} key={character.name}></img>
            </Col>
          </Row>
        </Col>
        <Col xs={2} className='border border-primary'>
          <Row>
            <p>{currentDirections}</p>
          </Row>
          <Row>
            <Button variant="warning" className='border border-dark' onClick={() => console.log(character)}>Confirm Choices</Button>
          </Row>
        </Col>
        <Col className='border border-primary'>2 of 2</Col>
      </Row>
      <Row>
        <Col className='border border-primary'>1 of 2</Col>
        <Col xs={2} className='border border-primary'>2 of 3 (wider)</Col>
        <Col className='border border-primary'>3 of 3</Col>
      </Row>
    </Container>
  )
}

export default Dive