class CreateDives < ActiveRecord::Migration[6.1]
  def change
    create_table :dives do |t|
      t.belongs_to :character, null: false, foreign_key: true
      t.integer :level_reached, default: 1
      t.integer :experience_reward, default: 0
      t.integer :enemies_slain, default: 0

      t.timestamps
    end
  end
end
