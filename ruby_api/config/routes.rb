Rails.application.routes.draw do
  # /api/v1
  namespace :api, defaults: {format: 'json'} do
    namespace :v1 do
      resources :users
      resources :products

      get '/productsbyprice', to: 'products#byprice'

      post '/auth/login', to: 'authentication#login'
    end
  end

end
