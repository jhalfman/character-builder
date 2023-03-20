class UserMailer < ApplicationMailer
    default from: 'jordanhalfman@gmail.com'

    def welcome_email
        @email = params[:email]
        mail(to: @email, subject: 'Mailer Example')
    end
end
