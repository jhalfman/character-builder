class AddMoneyRewardToDives < ActiveRecord::Migration[6.1]
  def change
    add_column :dives, :money_reward, :integer, default: 0
  end
end
