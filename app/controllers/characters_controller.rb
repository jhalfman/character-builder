class CharactersController < ApplicationController

    def create
        character = current_user.characters.create!(character_params)
        render json: character, status: :ok
    end

    private

    def character_params
        params.permit(:name, :hp, :attack, :defense, :speed, :luck)
    end
end
