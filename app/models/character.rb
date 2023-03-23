class Character < ApplicationRecord
  belongs_to :user
  has_many :pets, dependent: :destroy
  has_many :pet_archetypes, through: :pets
  has_many :dives, dependent: :destroy

  validates :name, uniqueness: {scope: :user}, length: { in: 3..20 }, presence: true
  validates :avatar_url, format: {with: /\.(png|jpg)\Z/i}
  validates :hp, numericality: {greater_than_or_equal_to: 1}
  validates :attack, numericality: {greater_than_or_equal_to: 1}
  validates :defense, numericality: {greater_than_or_equal_to: 1}
  validates :speed, numericality: {greater_than_or_equal_to: 1}
  validates :luck, numericality: {greater_than_or_equal_to: 1}
  
end
