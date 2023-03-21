class EnemyArchetypesController < ApplicationController
    skip_before_action :authenticate_user
    
    def index
        enemies = EnemyArchetype.all
        render json: enemies, status: :ok
    end

end
