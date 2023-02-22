class PetSerializer < ActiveModel::Serializer
  attributes :id, :name, :loyalty, :energy, :modifier, :level
  has_one :character
  has_one :pet_archetype
end
