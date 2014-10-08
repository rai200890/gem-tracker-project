class GemTracker::Repository < ActiveRecord::Base

  has_many :branches

  validate :name, uniqueness: true, presence: true
  validate :url, uniqueness: true, presence: true

end
