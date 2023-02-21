class PetArchetypeSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :attack, :speed, :defense
end
