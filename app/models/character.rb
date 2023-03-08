class Character < ApplicationRecord
  belongs_to :user
  has_many :pets, dependent: :destroy
  has_many :pet_archetypes, through: :pets
  has_many :dives

  validates :name, uniqueness: {scope: :user}
end
