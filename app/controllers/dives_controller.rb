class DivesController < ApplicationController
    skip_before_action :authenticate_user, only: [:index]

    def create
        dive = Dive.create!(dive_params)
        render json: dive, status: :ok
    end

    def show
        dive = Dive.where(character_id: params[:character_id], current: true).first
        if dive
            render json: dive, include: ["enemies", "enemies.enemy_archetype"], status: :ok
        else
            render json: {error: "Not found"}, status: :not_found
        end
    end
    
    def update
        dive = Dive.find(params[:id])
        if params[:money_reward]
            character = dive.character
            character.update!(money: params[:money_reward] + character.money, experience: params[:experience_reward] + character.experience, current_hp: character.hp)
        end
        dive.update!(dive_params)
        render json: dive, status: :ok
    end

    def index 
        dives = Dive.all.order(level_reached: :desc).first(10)
        render json: dives, include: ["character", "character.user", "character.pets", "character.pets.pet_archetype"], status: :ok
    end

    private

    def dive_params
        params.permit(:character_id, :pet_id_1, :pet_id_2, :level_reached, :money_reward, :experience_reward, :current)
    end
end
