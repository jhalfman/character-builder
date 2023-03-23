# Controller logic: fallback requests for React Router.
# Leave this here to help deploy your app later!
class FallbackController < ActionController::Base

  def index
    # React app index page
    render file: '/home/jhalfman/code/phase-5/pet_diver/client/public/index.html'
  end
end
