Rails.application.routes.draw do
  # /api/v1
  namespace :api, defaults: {format: 'json'} do
    namespace :v1 do
      resources :users

      post '/auth/login', to: 'authentication#login'
    end
  end

end
