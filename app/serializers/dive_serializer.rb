class DiveSerializer < ActiveModel::Serializer
  attributes :id, :level_reached, :experience_reward, :enemies_slain
  has_one :character
end
