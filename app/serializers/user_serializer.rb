class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :admin, :email
  has_many :characters
end
