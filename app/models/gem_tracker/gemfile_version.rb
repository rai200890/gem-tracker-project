class GemTracker::GemfileVersion < ActiveRecord::Base
  include GemTracker
  belongs_to :branch, class_name: "GemTracker::Branch"
  has_many :gem_versions, class_name: "GemTracker::GemVersion"

end
