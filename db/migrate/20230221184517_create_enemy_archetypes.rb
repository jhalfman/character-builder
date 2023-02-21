class CreateEnemyArchetypes < ActiveRecord::Migration[6.1]
  def change
    create_table :enemy_archetypes do |t|
      t.string :name
      t.string :image_url
      t.float :hp_modifier
      t.float :attack_modifer
      t.float :defense_modifier
      t.float :speed_modifier

      t.timestamps
    end
  end
end
