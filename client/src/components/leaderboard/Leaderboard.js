import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
    const [dives, setDives] = useState(null)

    useEffect(() => {
        fetch(`/dives`)
        .then(resp => resp.json())
        .then(data => setDives(data))
    }, [])

    if (!dives) {
        return "Loading Dives"
    }

  return (
    <div style={{paddingLeft: "10px"}}>
      <table className="table caption-top table-striped table-hover">
        <caption>Top 10 Dives</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Player</th>
            <th scope="col">Character</th>
            <th scope="col">Pet 1</th>
            <th scope="col">Pet 2</th>
            <th scope="col">Level Reached</th>
            <th scope="col">Enemies Killed</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {dives ? dives.map((dive, index) => {
            console.log(dive)
            return (
              <tr key={dive.updated_at}>
                <th scope="row">{index+1}</th>
                <td>{dive.character.user.username}</td>
                <td>{dive.character.name}</td>
                <td>{dive.pet_id_1 ? dive.character.pets.filter(pet => pet.id === dive.pet_id_1)[0].name + " - " + dive.character.pets.filter(pet => pet.id === dive.pet_id_1)[0].pet_archetype.name : "none"}</td>
                <td>{dive.pet_id_1 ? dive.character.pets.filter(pet => pet.id === dive.pet_id_2)[0].name + " - " + dive.character.pets.filter(pet => pet.id === dive.pet_id_2)[0].pet_archetype.name : "none"}</td>
                <td>{dive.level_reached}</td>
                <td>{dive.enemies_slain}</td>
                <td>{dive.updated_at.split("T")[0]}</td>
              </tr>
            )
          }): null}
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard