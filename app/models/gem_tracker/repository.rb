class GemTracker::Repository < ActiveRecord::Base
  include GemTracker
  has_many :branches, class_name: "GemTracker::Branch"

end
