class User < ApplicationRecord
    has_many :characters
    
    validates :username, uniqueness: {case_sensitive: false}, length: {minimum: 3}
    validates :password, length: {in: 7..15}, allow_blank: true, confirmation: true
    validates :email, presence: true, format: {with: URI::MailTo::EMAIL_REGEXP}

    has_secure_password
end
