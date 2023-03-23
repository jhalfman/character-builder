class CharactersController < ApplicationController

    def create
        character = current_user.characters.create!(character_params)
        UserMailer.with(name: character.name, email: current_user.email).character_creation_email.deliver_later
        render json: character, status: :ok
    end

    def show
        character = current_user.characters.find_by_name!(params[:name])
        render json: character, include: ["pets", "pets.pet_archetype"], status: :ok
    end

    def update
        character = Character.find(params[:id])
        character.update!(character_params)
        if character_params[:luck]
            character.update!(character_params)
            character.update!(money: character.money - 500)
        else
            character.update!(character_params) 
        end
        render json: character, include: ["pets", "pets.pet_archetype"], status: :ok
    end

    def destroy
        character = Character.find(params[:id])
        character.destroy
        head :no_content
    end

    private

    def character_params
        params.permit(:name, :hp, :attack, :defense, :speed, :luck, :avatar_url, :current_hp)
    end
end
