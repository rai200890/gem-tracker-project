class ProjectsController < ApplicationController

  respond_to :json

  def create
    @project = GemTracker::Project.create params[:project]
    respond_with(@project)
  end

end