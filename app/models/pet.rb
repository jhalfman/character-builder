class Pet < ApplicationRecord
  belongs_to :character
  belongs_to :pet_archetype

  validates :name, uniqueness: {scope: :character}
end
