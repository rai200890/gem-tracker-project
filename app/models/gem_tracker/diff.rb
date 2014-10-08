class GemTracker::Diff
  include ActiveModel::Model

  attr_accessor :included, :updated, :removed, :unchanged

  def initialize params
    old = GemTracker::GemfileVersion.find params[:old_gemfile_version_id]
    new = GemTracker::GemfileVersion.find params[:new_gemfile_version_id]
    self.included = (new.gem_versions - old.gem_versions)
    self.removed = (old.gem_versions - new.gem_versions)
    self.unchanged = (old.gem_versions & new.gem_versions)
    self.updated = (included - unchanged)
  end

end