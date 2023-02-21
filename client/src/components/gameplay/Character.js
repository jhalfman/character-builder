import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Character = () => {
    const [character, setCharacter] = useState(null)
    const [errors, setErrors] = useState(null)
    let {name} = useParams();

    useEffect(() => {
        fetch(`/characters/${name}`)
        .then(resp => {
            if (resp.ok) {
                resp.json().then(character => {
                    setCharacter(character)
                })
            }
            else {
                resp.json().then(error => {
                    setErrors(error)
                }) 
            }
        })
    }, [name])

  return (
    <div>
        {errors ? errors.map(error => <div className="errors" key={error}>{error}</div>) : null}
        {character ? character.name : null}
    </div>
  )
}

export default Character