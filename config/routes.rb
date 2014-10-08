Rails.application.routes.draw do

  root 'application#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  #get 'repositories', controller: :application, action :index
  #get 'gems', controller: :application, action :index
  get '/projects', controller: :application, action: :index
  get '/diff/new', controller: :application, action: :index


  scope :api, defaults: { format: :json }, constraints: { format: 'json' } do
    resources :projects
    resource :diff, only: [:new]
    resources :repositories, only: [:index]
    resources :branches, only: [:index]
    resources :gemfile_versions, only:[:index]
    resources :gem_versions, only: [:index]
  end

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
