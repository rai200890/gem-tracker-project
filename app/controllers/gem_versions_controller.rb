class GemVersionsController < ApplicationController
  respond_to :json

  has_scope :by_gemfile_version_id

  def index
    @gem_versions = apply_scopes(GemTracker::GemVersion).all
    respond_with(@gem_versions, methods: :gem_name)
  end
end