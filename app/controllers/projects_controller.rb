class RepositoriesController < ApplicationController
  respond_to :json

  def index
    @projects = GemTracker::Repository.all
    respond_with(@projects)
  end

  def create
    @projects = GemTracker::create params[:repository]
    respond_with(@projects)
  end


end