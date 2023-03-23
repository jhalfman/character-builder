class UsersController < ApplicationController
    skip_before_action :authenticate_user, only: [:create, :show]

    def create
        UserMailer.with(email: params[:email], username: params[:username]).welcome_email.deliver_later
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
