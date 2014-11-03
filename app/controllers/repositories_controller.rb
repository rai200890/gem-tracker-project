class RepositoriesController < ApplicationController

  respond_to :json

  def index
    respond_with(GemTracker::Repository.all)
  end

  def show
    repository = GemTracker::Repository.find params[:id]
    respond_with(repository)
  end

end