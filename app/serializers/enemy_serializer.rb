class EnemySerializer < ActiveModel::Serializer
  attributes :id, :hp, :attack, :defense, :speed, :level, :boss
  has_one :dive
  has_one :enemy_archetype
end
