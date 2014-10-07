class GemTracker::Diff

  attr_accessor :created, :updated, :removed, :unchanged

  def initialize old, new
    byebug
    self.created = new.gem_versions - old.gem_versions
    self.removed = old.gem_versions - new.gem_versions
  end

end