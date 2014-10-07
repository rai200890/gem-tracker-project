class GemTracker::Repository < ActiveRecord::Base

  has_many :branches

end
