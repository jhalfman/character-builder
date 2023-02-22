class EnemyArchetypeSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :hp_modifier, :attack_modifier, :defense_modifier, :speed_modifier
end
