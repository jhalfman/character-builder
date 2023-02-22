class AddAvatarToCharacter < ActiveRecord::Migration[6.1]
  def change
    add_column :characters, :avatar_url, :string, :default => "https://i.imgur.com/Y5Efdki.png"
  end
end
