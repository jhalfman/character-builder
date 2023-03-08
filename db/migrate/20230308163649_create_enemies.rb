class CreateEnemies < ActiveRecord::Migration[6.1]
  def change
    create_table :enemies do |t|
      t.belongs_to :dive, null: false, foreign_key: true
      t.belongs_to :enemy_archetype, null: false, foreign_key: true
      t.integer :hp
      t.integer :attack
      t.integer :defense
      t.integer :speed
      t.integer :level, default: 1
      t.boolean :boss, default: false

      t.timestamps
    end
  end
end
