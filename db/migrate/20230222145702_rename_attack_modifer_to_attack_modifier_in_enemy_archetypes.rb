class RenameAttackModiferToAttackModifierInEnemyArchetypes < ActiveRecord::Migration[6.1]
  def change
    rename_column :enemy_archetypes, :attack_modifer, :attack_modifier
  end
end
