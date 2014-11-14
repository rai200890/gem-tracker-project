class GemVersionsController < ApplicationController

  respond_to :json

  has_scope :by_gemfile_version_id

  def index
    respond_with(apply_scopes(GemTracker::GemVersion).all)
  end

end