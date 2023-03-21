class PetArchetypesController < ApplicationController
    skip_before_action :authenticate_user
    
    def index
        pets = PetArchetype.all
        render json: pets, status: :ok
    end

end
