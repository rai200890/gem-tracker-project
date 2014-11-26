Rails.application.routes.draw do

  root 'application#index'

  get '/projects', controller: :application, action: :index
  get '/projects/:id', controller: :application, action: :index
  get '/projects/:id/branches', controller: :application, action: :index
  get '/projects/:id/branches/:branch_id', controller: :application, action: :index
  get '/projects/:id/branches/:branch_id/gemfile_version/:gemfile_version_id', controller: :application, action: :index
  get '/projects/:id/diff', controller: :application, action: :index

  scope :api, defaults: { format: :json }, constraints: { format: 'json' } do
    resources :projects, only: [:create, :show, :update]
    resource :diff, only: [:new]
    resources :repositories, only: [:index, :show]
    resources :branches, only: [:index, :show]
    resources :gemfile_versions, only:[:index, :show]
    resources :gem_versions, only: [:index]
  end
end
