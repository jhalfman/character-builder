class CreatePetArchetypes < ActiveRecord::Migration[6.1]
  def change
    create_table :pet_archetypes do |t|
      t.string :name
      t.string :image_url
      t.float :attack
      t.float :speed
      t.float :defense

      t.timestamps
    end
  end
end
