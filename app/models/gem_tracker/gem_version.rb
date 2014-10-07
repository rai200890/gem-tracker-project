class GemTracker::GemVersion < ActiveRecord::Base

  belongs_to :gem, class_name: "GemTracker::Gem"
  has_and_belongs_to_many :gemfile_versions, class_name: "GemTracker::GemfileVersions"

end