class UsersController < ApplicationController

    def create
        UserMailer.with(email: params[:email]).welcome_email.deliver_now
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        currentUser = User.find(session[:user_id])
        render json: currentUser, status: :ok
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :admin, :email)
    end
end
