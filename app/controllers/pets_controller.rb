class PetsController < ApplicationController

    def create
        pet = Pet.create!(pet_params)
        character = Character.find(params[:character_id])
        character.update(money: character.money - 500)
        render json: pet, status: :created
    end

    def destroy
        pet = Pet.find(params[:id])
        character = Character.find(pet.character_id)
        character.update(money: character.money + 250)
        pet.destroy
        head :no_content
    end

    private

    def pet_params
        params.permit(:name, :pet_archetype_id, :character_id, :modifier)
    end
end
