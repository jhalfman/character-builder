class PetsController < ApplicationController

    def create
    end

    def destroy
        pet = Pet.find(params[:id])
        pet.destroy
        head :no_content
    end

    private

    

end
