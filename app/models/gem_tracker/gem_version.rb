class GemTracker::GemVersion < ActiveRecord::Base
  include GemTracker
  belongs_to :gem, class_name: "GemTracker::Gem"

end