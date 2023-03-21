class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authenticate_user

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

  def current_user
    @current_user ||= User.find_by_id(session[:user_id])
  end

  private

  def authenticate_user
    error = ["User Unauthorized"]
    render json: error, status: :unauthorized unless current_user
  end

  def render_unprocessable_entity invalid
    render json: invalid.record.errors.full_messages, status: :unprocessable_entity
  end

  def render_not_found error
    message = [error.message]
    render json: message, status: :not_found
  end

end
