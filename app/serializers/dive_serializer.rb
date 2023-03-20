class DiveSerializer < ActiveModel::Serializer
  attributes :id, :level_reached, :experience_reward, :enemies_slain, :pet_id_1, :pet_id_2
  has_one :character
end
