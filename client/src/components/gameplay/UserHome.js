import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.js';

const UserHome = ( {characters, setCharacters} ) => {
    const {user} = useContext(UserContext);
    let navigate = useNavigate();
    console.log("base userhome load", user)

    useEffect(() => {
      console.log("inside userhome useeffect checking for user", user)
        if (!user) {
            navigate(`/login`)
        }
        else if (!characters) {
            setCharacters(user.characters.sort(function(x, y) {return x.id - y.id}))
        }
        else {
          return null
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
              <tr key={character.name} onClick={() => navigate(`/characters/${character.name}`)}>
                <th scope="row">{index+1}</th>
                <td>{character.name}</td>
                <td>{character.money}</td>
                <td>{character.experience/500 + 1}</td>
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