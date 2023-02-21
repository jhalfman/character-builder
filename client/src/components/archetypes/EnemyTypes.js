import React, { useEffect, useState } from 'react'

const EnemyTypes = () => {
    const [enemies, setEnemies] = useState(null)

    useEffect(() => {
        fetch(`/enemy_archetypes`)
        .then(resp => resp.json())
        .then(data => setEnemies(data))
    }, [])
    
  return (
    <div>{enemies ? enemies.map(enemy => <img src={`${enemy.image_url}`} style={{width: "50px"}}/>) : null}</div>
  )
}

export default EnemyTypes