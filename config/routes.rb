Rails.application.routes.draw do

  root 'application#index'

  get '/projects', controller: :application, action: :index
  get '/diff/new', controller: :application, action: :index


  scope :api, defaults: { format: :json }, constraints: { format: 'json' } do
    resources :projects, only: [:create]
    resource :diff, only: [:new]
    resources :repositories, only: [:index]
    resources :branches, only: [:index]
    resources :gemfile_versions, only:[:index]
    resources :gem_versions, only: [:index]
  end
end
