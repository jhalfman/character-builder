class CharactersController < ApplicationController

    def create
        character = current_user.characters.create!(character_params)
        render json: character, status: :ok
    end

    def show
        character = current_user.characters.find_by_name(params[:name])
        render json: character, include: ["pets", "pets.pet_archetype"], status: :ok
    end

    def destroy
        character = Character.find(params[:id])
        character.destroy
        head :no_content
    end

    private

    def character_params
        params.permit(:name, :hp, :attack, :defense, :speed, :luck, :avatar_url)
    end
end
