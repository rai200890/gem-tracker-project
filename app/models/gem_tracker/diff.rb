class GemTracker::Diff

  def initialize old_gemfile, new_gemfile
    new_gemfile.gem_versions - old_gemfile.gem_verision
  end

end