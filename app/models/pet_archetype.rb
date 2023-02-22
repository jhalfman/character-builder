class PetArchetype < ApplicationRecord
    has_many :pets
    has_many :characters, through: :pets
end
