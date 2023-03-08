class EnemiesController < ApplicationController

    def create
        numberOfEnemies = params[:numberOfEnemies]
        enemies = []
        numberOfEnemies.times {
            enemy_archetype = EnemyArchetype.find(rand(1..6))
            enemies << Enemy.create!(dive_id: params[:dive_id], enemy_archetype_id: enemy_archetype.id, hp: enemy_archetype.hp_modifier * 10, attack: enemy_archetype.attack_modifier * 10, defense: enemy_archetype.defense_modifier * 10, speed: enemy_archetype.speed_modifier * 10)
        }
        render json: enemies, status: :created
    end

    private

    def enemy_params
        params.permit(:level, :dive_id)
    end
end
