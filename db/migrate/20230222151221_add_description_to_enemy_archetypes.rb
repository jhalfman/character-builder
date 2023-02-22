class AddDescriptionToEnemyArchetypes < ActiveRecord::Migration[6.1]
  def change
    add_column :enemy_archetypes, :description, :string
  end
end
