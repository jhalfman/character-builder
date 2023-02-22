class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :name, :hp, :attack, :defense, :speed, :money, :luck, :experience, :avatar_url
  has_one :user
  has_many :pets
end
