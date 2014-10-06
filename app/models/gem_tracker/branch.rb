class GemTracker::Branch < ActiveRecord::Base
include GemTracker
belongs_to :repository, class_name: "GemTracker::Repository"
has_many :gemfile_versions, class_name: "GemTracker::GemFileVersion"

end
