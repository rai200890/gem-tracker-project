class ProjectsController < ApplicationController

  respond_to :json

  def create
    @project = GemTracker::Project.create safe_params
    respond_with(@project)
  end

  private

  def safe_params
    params.require(:project).permit(:name, :url)
  end


end