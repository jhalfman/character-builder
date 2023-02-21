class EnemyArchetypesController < ApplicationController

    def index
        enemies = EnemyArchetype.all
        render json: enemies, status: :ok
    end

end
