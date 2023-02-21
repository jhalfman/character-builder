import React, { useEffect, useState } from 'react'

const PetTypes = () => {
    const [pets, setPets] = useState(null)

    useEffect(() => {
        fetch(`/pet_archetypes`)
        .then(resp => resp.json())
        .then(data => setPets(data))
    }, [])

  return (
    <div>{pets ? pets.map(pet => <img src={`${pet.image_url}`} style={{width: "50px"}}/>) : null}</div>
  )
}

export default PetTypes