class DiffsController < ApplicationController

  respond_to :json

  def new
    @diff = GemTracker::Diff.new params
    respond_with @diff
  end

end