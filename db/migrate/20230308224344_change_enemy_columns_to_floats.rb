class ChangeEnemyColumnsToFloats < ActiveRecord::Migration[6.1]
  def change
    change_column :enemies, :hp, :float
    change_column :enemies, :attack, :float
    change_column :enemies, :defense, :float
    change_column :enemies, :speed, :float
  end
end
