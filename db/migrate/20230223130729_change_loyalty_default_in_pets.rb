class ChangeLoyaltyDefaultInPets < ActiveRecord::Migration[6.1]
  def change
    change_column_default :pets, :loyalty, 5
  end
end
