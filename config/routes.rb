Rails.application.routes.draw do
  
  resources :enemies, only: [:create]
  resources :dives, only: [:create]
  resources :pets, only: [:create, :destroy, :update]
  resources :enemy_archetypes, only: [:index]
  resources :pet_archetypes, only: [:index]
  resources :characters, only: [:create, :destroy, :index, :update]
  resources :users, only: [:create, :destroy, :show]

  get "/characters/:name", to: "characters#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
