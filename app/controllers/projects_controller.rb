class ProjectsController < ApplicationController
  include Roar::Rails::ControllerAdditions
  respond_to :json

  def create
    @project = GemTracker::Project.create safe_params
    respond_with @project, represent_with: ProjectRepresenter
  end

  def show
    @project = GemTracker::Project.find params[:id]
    respond_with @project, represent_with: ProjectRepresenter
  end


  private

  def safe_params
    params.require(:project).permit(:name, :url)
  end


end