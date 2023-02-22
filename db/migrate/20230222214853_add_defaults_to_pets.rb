class AddDefaultsToPets < ActiveRecord::Migration[6.1]
  def change
    change_column_default :pets, :loyalty, 10
    change_column_default :pets, :energy, 5
    change_column_default :pets, :level, 1
  end
end
