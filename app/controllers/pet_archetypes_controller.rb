class PetArchetypesController < ApplicationController

    def index
        pets = PetArchetype.all
        render json: pets, status: :ok
    end

end
