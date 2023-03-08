class AddCurrentToDives < ActiveRecord::Migration[6.1]
  def change
    add_column :dives, :current, :boolean, default: true
  end
end
