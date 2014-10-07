class GemTracker::GemfileVersion < ActiveRecord::Base

  belongs_to :branch
  has_and_belongs_to_many :gem_versions

end
