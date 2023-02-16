class User < ApplicationRecord
    validates :username, uniqueness: {case_sensitive: false}, length: {minimum: 3}
    validates :password, length: {in: 7..15}, allow_blank: true

    has_secure_password
end
