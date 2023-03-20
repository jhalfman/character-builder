class Dive < ApplicationRecord
  belongs_to :character
  has_many :enemies, dependent: :destroy
  has_many :enemy_archetypes, through: :enemies
end
