class GemfileVersionsController < ApplicationController

  respond_to :json

  has_scope :by_branch_id

  def index
    respond_with(apply_scopes(GemTracker::GemfileVersion).all)
  end

  def show
    respond_with(GemTracker::GemfileVersion.find(params[:id]), methods: [:branch_name])
  end

  def update
    @gemfile_version = GemTracker::GemfileVersion.find(params[:id])
    @gemfile_version.save
    respond_with(@gemfile_version, methods: [:branch_name])
  end

end