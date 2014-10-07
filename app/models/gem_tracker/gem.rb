class GemTracker::Gem < ActiveRecord::Base

  has_many :gem_versions

end
