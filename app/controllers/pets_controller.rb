class PetsController < ApplicationController

    def create
        pet = Pet.create!(pet_params)
        UserMailer.with(name: params[:name], type: pet.pet_archetype.name, description: pet.pet_archetype.description, email: pet.character.user.email).pet_welcome_email.deliver_now
        character = Character.find(params[:character_id])
        character.update(money: character.money - 500)
        render json: pet, status: :created
    end

    def update
        pet = Pet.find(params[:id])
        if pet_params.has_key?(:energy)
            if pet.energy < pet_params[:energy]
                pet.character.update!(money: pet.character.money - 50)
            end
        end
        pet.update!(pet_params)
        render json: pet, status: :ok
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
        params.permit(:name, :pet_archetype_id, :character_id, :modifier, :energy, :loyalty)
    end
end
