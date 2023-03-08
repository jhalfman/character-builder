class DivesController < ApplicationController

    def create
        dive = Dive.create!(dive_params)
        render json: dive, status: :ok
    end

    def index
        dive = Dive.where(character_id: params[:character_id], current: true).first
        if dive
            render json: dive, status: :ok
        else
            render json: {error: "Not found"}, status: :not_found
        end
    end

    private

    def dive_params
        params.permit(:character_id)
    end
end
