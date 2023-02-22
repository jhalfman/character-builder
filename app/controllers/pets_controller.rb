class PetsController < ApplicationController

    def create
        pet = Pet.create(pet_params)
        render json: pet, status: :created
    end

    def destroy
        pet = Pet.find(params[:id])
        pet.destroy
        head :no_content
    end

    private

    def pet_params
        params.permit(:name, :pet_archetype_id, :character_id, :modifier)
    end
end
