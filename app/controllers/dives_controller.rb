class DivesController < ApplicationController

    def create
        dive = Dive.create!(dive_params)
        render json: dive, status: :ok
    end

    def index
        dive = Dive.where(character_id: params[:character_id], current: true).first
        if dive
            render json: dive, include: ["enemies", "enemies.enemy_archetype"], status: :ok
        else
            render json: {error: "Not found"}, status: :not_found
        end
    end
    
    def update
        dive = Dive.find(params[:id])
        dive.update!(dive_params)
        render json: dive, status: :ok
    end

    private

    def dive_params
        params.permit(:character_id, :pet_id_1, :pet_id_2, :level_reached, :money_reward, :experience_reward, :current)
    end
end
