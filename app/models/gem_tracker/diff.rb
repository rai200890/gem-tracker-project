class GemTracker::Diff

  attr_accessor :created, :updated, :removed, :unchanged

  def initialize old, new
    self.created = new.gem_versions.pluck("id") - old.gem_versions.pluck("id")
    self.removed = old.gem_versions.pluck("id") - new.gem_versions.pluck("id")
  end

end