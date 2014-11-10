class DiffsController < ApplicationController
  include Roar::Rails::ControllerAdditions
  respond_to :json

  def new
    @diff = GemTracker::Diff.new params
    respond_with @diff, represent_with: DiffRepresenter
  end

end