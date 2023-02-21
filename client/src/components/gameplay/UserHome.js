import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.js';

const UserHome = () => {
    const {user} = useContext(UserContext);
    let navigate = useNavigate();
    const [characters, setCharacters] = useState(null)

    useEffect(() => {
        if (!user) {
            navigate(`/login`)
        }
        else {
            console.log(user)
            setCharacters(user.characters)
            // fetch user data
        }
        //eslint-disable-next-line
    }, [user])

  return (
    <div style={{paddingLeft: "10px"}}>
      <table className="table caption-top table-striped table-hover">
        {user ? <caption>{user.username}'s Characters</caption> : null}
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Money</th>
            <th scope="col">Level</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {characters ? characters.map((character, index) => {
            return (
              <tr key={character.name}>
                <th scope="row">{index+1}</th>
                <td>{character.name}</td>
                <td>{character.money}</td>
                <td>{character.experience/500}</td>
              </tr>
            )
          }): null}
        </tbody>
      </table>
        <button type="button" className="btn btn-primary" style={{marginTop: "-20px"}} onClick={() => navigate(`/characters/create`)}>Create New Character</button>
    </div>
  )
}

export default UserHome