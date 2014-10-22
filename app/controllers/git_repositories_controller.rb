class GitRepositoriesController < ApplicationController
  include Roar::Rails::ControllerAdditions

  respond_to :json

  def create
    @git_repository = GemTracker::GitRepository.new params[:git_repository]
    respond_with @git_repository, represent_with: GitRepositoryRepresenter
  end

  private

  def safe_params
    params.require(:@git_repository).permit(:name, :url)
  end


end