class GemTracker::Diff
  include ActiveModel::Model

  attr_accessor :included, :updated, :removed, :unchanged

  def initialize params
    old = GemTracker::GemfileVersion.find params[:old_gemfile_version_id]
    new = GemTracker::GemfileVersion.find params[:new_gemfile_version_id]
    self.included = new.gem_versions.where gem_id: (new.gem_versions.pluck(:gem_id) - old.gem_versions.pluck(:gem_id))
    self.removed = old.gem_versions.where gem_id: (old.gem_versions.pluck(:gem_id) - new.gem_versions.pluck(:gem_id))
    self.unchanged = old.gem_versions & new.gem_versions
    self.updated = new.gem_versions - included - unchanged
  end

end