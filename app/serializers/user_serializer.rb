class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :password_confirmation
end
