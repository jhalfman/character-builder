class AddPetIdToDives < ActiveRecord::Migration[6.1]
  def change
    add_column :dives, :pet_id_1, :integer
    add_column :dives, :pet_id_2, :integer
  end
end
