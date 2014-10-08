class RepositoriesController < ApplicationController

  respond_to :json

  def index
    respond_with(GemTracker::Repository.all)
  end

end