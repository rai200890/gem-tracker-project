class GemTracker::Gem < ActiveRecord::Base

  has_many :gem_versions
  accepts_nested_attributes_for :gem_versions

  validate :name, uniqueness: true, presence: true

end
