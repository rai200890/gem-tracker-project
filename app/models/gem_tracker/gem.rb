class GemTracker::Gem < ActiveRecord::Base
  include GemTracker
  has_many :gem_versions, class_name: "GemTracker::GemVersion"

end
