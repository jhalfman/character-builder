class Character < ApplicationRecord
  belongs_to :user

  validates :name, uniqueness: {scope: :user}
end
