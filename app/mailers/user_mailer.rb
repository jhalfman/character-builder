class UserMailer < ApplicationMailer
    default from: 'jordanhalfman@gmail.com'

    def welcome_email
        @email = params[:email]
        @username = params[:username]
        mail(to: @email, subject: 'Welcome to Pet Diver!')
    end

    def pet_welcome_email
        @email = params[:email]
        @name = params[:name]
        @type = params[:type]
        @description = params[:description]
        mail(to: @email, subject: 'New Pet!')
    end
end
