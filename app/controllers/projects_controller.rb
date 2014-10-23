class ProjectsController < ApplicationController

  respond_to :json

  def create
    @project = GemTracker::Project.create safe_params
    respond_with(@project) do |format|
      format.json {render json: @project}
    end
  end

  def show
    @project = GemTracker::Project.find params[:id]
    respond_with(@project) do |format|
      format.json {render json: @project}
    end
  end


  private

  def safe_params
    params.require(:project).permit(:name, :url)
  end


end