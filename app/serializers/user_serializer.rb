class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :admin, :email
end
