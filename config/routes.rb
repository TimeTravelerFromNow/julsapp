Rails.application.routes.draw do
  get 'dashboard/index'

  get 'elements/create'
  get 'elements/update'
  get 'elements/destroy'
  get 'elements/show'

  get 'musics/create'
  get 'musics/update'
  get 'musics/show'


  scope module: "admin" do
    resources :albums do
      resources :musics
    end

    resources :blog_posts do
      resources :elements
    end

    resources :categories do
      resources :blog_posts
    end
  end # admin



  get 'musics/index' => 'musics#index', as: :musics_index
  patch "musics/:id" => "musics#update", as: "music"

  get 'albums/:id/edit' => 'albums#edit', as: :album_edit

  get 'home_page/index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "home_page#index"
end
