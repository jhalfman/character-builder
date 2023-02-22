class AddDescriptionToPetArchetypes < ActiveRecord::Migration[6.1]
  def change
    add_column :pet_archetypes, :description, :string
  end
end
