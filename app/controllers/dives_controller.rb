class DivesController < ApplicationController

    def create
        dive = Dive.create!(dive_params)
        render json: dive, status: :ok
    end

    private

    def dive_params
        params.permit(:character_id)
    end
end
