Rails.application.routes.draw do
  get 'elements/create'
  get 'elements/update'
  get 'elements/destroy'
  get 'elements/show'
  resources :blog_posts do
    resources :elements
  end
  
  resources :albums
  resources :musics do
    resource :music_file
  end
  get 'home_page/index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "home_page#index"
end
