class Enemy < ApplicationRecord
  belongs_to :dive
  belongs_to :enemy_archetype
end
