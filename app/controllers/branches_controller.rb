class BranchesController < ApplicationController

  respond_to :json

  has_scope :by_repository_id

  def index
    respond_with(apply_scopes(GemTracker::Branch).all)
  end

  def show
    respond_with(GemTracker::Branch.find params[:id])
  end

end