class GemfileVersionsController < ApplicationController

  respond_to :json

  def index
    @gemfile_versions = GemTracker::GemfileVersion.all
    respond_with(@gemfile_versions)
  end

end