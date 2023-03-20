class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :name, :hp, :attack, :defense, :speed, :money, :luck, :experience, :avatar_url, :current_hp
  has_one :user
  has_many :pets
end
