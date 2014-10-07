class GemTracker::Diff

  attr_accessor :included, :updated, :removed, :unchanged

  def initialize old, new
    self.included = GemTracker::GemVersion.where(gem_id: gem_ids(new.gem_versions - old.gem_versions))
    self.removed = GemTracker::GemVersion.where(gem_id: gem_ids(old.gem_versions - new.gem_versions))
    self.unchanged = old.gem_versions & new.gem_versions
    self.updated = included - unchanged
  end

  private

  def gem_ids gem_versions
    gem_versions.map(&:gem_id)
  end

end