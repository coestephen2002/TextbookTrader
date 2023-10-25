Rails.application.routes.draw do
  patch 'user/:id(.:format)', to: 'user#update'
  devise_for :users, 
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
    }
  get '/member-data', to: 'members#show'
  resources :textbooks do
    collection do
      get 'explore'
    end
  end
  get '/universities', to: 'universities#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

end
