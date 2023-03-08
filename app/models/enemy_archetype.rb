class EnemyArchetype < ApplicationRecord
    has_many :enemies
    has_many :dives, through: :enemies
end
