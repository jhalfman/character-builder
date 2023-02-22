import React, { useEffect, useState } from 'react'

const EnemyTypes = () => {
    const [enemies, setEnemies] = useState(null)

    useEffect(() => {
        fetch(`/enemy_archetypes`)
        .then(resp => resp.json())
        .then(data => setEnemies(data))
    }, [])

  return (
    <div className="container">
        <div className="row">
            <div className="col-sm-12"><h1 style={{textAlign: "center", marginTop: "10px"}}>Enemy Types</h1></div>
            {enemies ? enemies.map(enemy => {
                return (
                    <div className="col-sm-4 border border-primary" key={enemy.name} style={{marginTop: "20px", paddingRight: "20px", paddingLeft: "20px"}}> 
                        <div className="row justify-content-center">
                            <h3 style={{textAlign: "center"}}>{enemy.name}</h3>
                        </div>
                        <div className="row justify-content-center"> 
                            <img src={`${enemy.image_url}`} style={{width: "200px"}}></img>
                        </div>
                        <div className="row">
                            <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                            <ul style={{marginLeft: "10px", marginTop: "-10px"}}>
                                <li>Attack: {Math.trunc(enemy.attack_modifier * 100)}%</li>
                                <li>Defense: {Math.trunc(enemy.defense_modifier * 100)}%</li>
                                <li>Speed: {Math.trunc(enemy.speed_modifier * 100)}%</li>
                                <li>HP: {Math.trunc(enemy.hp_modifier * 100)}%</li>
                            </ul>
                        </div>
                    </div>
                )
            }) : null}
        </div>
    </div>
    )
}

export default EnemyTypes