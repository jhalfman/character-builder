class CreatePets < ActiveRecord::Migration[6.1]
  def change
    create_table :pets do |t|
      t.belongs_to :character, null: false, foreign_key: true
      t.belongs_to :pet_archetype, null: false, foreign_key: true
      t.string :name
      t.integer :loyalty
      t.integer :energy
      t.string :modifier
      t.integer :level

      t.timestamps
    end
  end
end
