class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

  def current_user
    @current_user ||= User.find_by_id(session[:user_id])
  end

  private

  def render_unprocessable_entity invalid
    render json: invalid.record.errors.full_messages, status: :unprocessable_entity
  end

  def render_not_found error
    render json: {errors: {error.model => "Not Found"}}, status: :not_found
  end

end
